// This mirrors Posthog's own client, but in a vastly simpler & smaller way

type PropertyValue = string | number | boolean | null | undefined;
export type EventProperties = Record<string, PropertyValue>;

const API_HOST = 'https://events.httptoolkit.tech';
const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Matches PostHog's own session rules, which web analytics depends on:
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const SESSION_MAX_DURATION_MS = 24 * 60 * 60 * 1000;

const CAMPAIGN_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gad_source',
  'mc_cid',
  'gclid',
  'gclsrc',
  'dclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'twclid',
  'li_fat_id',
  'igshid',
  'ttclid',
  'rdt_cid',
  'epik',
  'qclid',
  'sccid',
  'irclid',
  '_kx',
];

const SEARCH_ENGINES: Array<[RegExp, string]> = [
  [/^https?:\/\/(.*)google\.([^/?]*)/, 'google'],
  [/^https?:\/\/(.*)bing\.com/, 'bing'],
  [/^https?:\/\/(.*)yahoo\.com/, 'yahoo'],
  [/^https?:\/\/(.*)duckduckgo\.com/, 'duckduckgo'],
];

// Mirrors posthog-js's bot detection (DEFAULT_BLOCKED_UA_STRS & isLikelyBot), minus the
// 'chatgpt-user' and 'crawler' entries, which match user-initiated AI agent fetches.
const BLOCKED_UA_STRS = [
  'amazonbot', 'amazonproductbot', 'app.hypefactors.com', 'applebot', 'archive.org_bot',
  'awariobot', 'backlinksextendedbot', 'baiduspider', 'bingbot', 'bingpreview',
  'chrome-lighthouse', 'dataforseobot', 'deepscan', 'duckduckbot', 'facebookexternal',
  'facebookcatalog', 'http://yandex.com/bots', 'hubspot', 'ia_archiver', 'leikibot', 'linkedinbot',
  'meta-externalagent', 'mj12bot', 'msnbot', 'nessus', 'petalbot', 'pinterestbot', 'prerender',
  'rogerbot', 'screaming frog', 'sebot-wa', 'sitebulb', 'slackbot', 'slurp', 'trendictionbot',
  'turnitin', 'twitterbot', 'vercel-screenshot', 'vercelbot', 'yahoo! slurp', 'yandexbot',
  'zoombot', 'bot.htm', 'bot.php', '(bot;', 'bot/', 'ahrefsbot', 'ahrefssiteaudit', 'semrushbot',
  'siteauditbot', 'splitsignalbot', 'gptbot', 'oai-searchbot', 'perplexitybot',
  'better uptime bot', 'sentryuptimebot', 'uptimerobot', 'headlesschrome', 'cypress',
  'google-hoteladsverifier', 'adsbot-google', 'apis-google', 'duplexweb-google',
  'feedfetcher-google', 'google favicon', 'google web preview', 'google-read-aloud', 'googlebot',
  'googleother', 'google-cloudvertexbot', 'googleweblight', 'mediapartners-google',
  'storebot-google', 'google-inspectiontool', 'bytespider',
];

type UserAgentDataNavigator = Navigator & { userAgentData?: { brands?: Array<{ brand?: string }> } };

function isLikelyBot(): boolean {
  const isBlocked = (ua: string | undefined) =>
    !!ua && BLOCKED_UA_STRS.some(blocked => ua.toLowerCase().includes(blocked));

  if (isBlocked(navigator.userAgent)) return true;
  try {
    const brands = (navigator as UserAgentDataNavigator).userAgentData?.brands;
    if (brands?.some(({ brand }) => isBlocked(brand))) return true;
  } catch {}
  if (navigator.webdriver) return true;

  return isFakeUserAgent(navigator.userAgent);
}

// Crawlers spoofing browser UAs, in ways no real browser produces
function isFakeUserAgent(ua: string): boolean {
  if (/^[\s"']|[\s"']$/.test(ua)) return true;
  return /Chrome\/1\d\d.*Edge\/1[2-8]\./.test(ua); // Legacy Edge never shipped with Chrome 100+
}

// PostHog requires session ids to be UUIDv7, and uses the embedded timestamp.
function uuidv7(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const timestamp = Date.now();
  for (let i = 0; i < 6; i++) {
    bytes[i] = Math.floor(timestamp / 2 ** (8 * (5 - i))) & 0xff;
  }
  bytes[6] = 0x70 | (bytes[6] & 0x0f);
  bytes[8] = 0x80 | (bytes[8] & 0x3f);

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

let enabled: boolean | undefined;
const isEnabled = () => (enabled ??= typeof window !== 'undefined' && !!TOKEN && !isLikelyBot());

let distinctId: string | undefined;
let session: { id: string; startedAt: number; lastActivityAt: number } | undefined;
let currentPageview: { id: string; pathname: string; timestamp: number } | undefined;

function getSessionId(now: number): string {
  if (
    !session ||
    now - session.lastActivityAt > SESSION_IDLE_TIMEOUT_MS ||
    now - session.startedAt > SESSION_MAX_DURATION_MS
  ) {
    session = { id: uuidv7(), startedAt: now, lastActivityAt: now };
  } else {
    session.lastActivityAt = now;
  }
  return session.id;
}

function getReferrerProperties(): EventProperties {
  const referrer = document.referrer;
  if (!referrer) return { $referrer: '$direct', $referring_domain: '$direct' };

  let referringDomain = '$direct';
  try {
    referringDomain = new URL(referrer).host || '$direct';
  } catch {}

  const searchEngine = SEARCH_ENGINES.find(([pattern]) => pattern.test(referrer))?.[1];

  return {
    $referrer: referrer,
    $referring_domain: referringDomain,
    ...(searchEngine ? { $search_engine: searchEngine } : {}),
  };
}

function getCampaignProperties(url: URL): EventProperties {
  const properties: EventProperties = {};
  for (const param of CAMPAIGN_PARAMS) {
    const value = url.searchParams.get(param);
    if (value) properties[param] = value;
  }
  return properties;
}

function getPreviousPageviewProperties(now: number): EventProperties {
  if (!currentPageview) return {};
  return {
    $prev_pageview_id: currentPageview.id,
    $prev_pageview_pathname: currentPageview.pathname,
    $prev_pageview_duration: (now - currentPageview.timestamp) / 1000,
  };
}

function send(event: string, properties: EventProperties, now: number, url = new URL(window.location.href)) {
  distinctId ??= uuidv7();
  const language = navigator.language;

  const body = JSON.stringify({
    api_key: TOKEN,
    event,
    distinct_id: distinctId,
    uuid: uuidv7(),
    timestamp: new Date(now).toISOString(),
    properties: {
      // Matches the browser SDK, so existing $lib filters & breakdowns still apply:
      $lib: 'web',
      $current_url: url.href,
      $host: url.host,
      $pathname: url.pathname,
      $raw_user_agent: navigator.userAgent,
      $browser_language: language,
      $browser_language_prefix: language?.split('-')[0],
      $screen_width: window.screen.width,
      $screen_height: window.screen.height,
      $viewport_width: window.innerWidth,
      $viewport_height: window.innerHeight,
      $timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      $timezone_offset: new Date().getTimezoneOffset(),
      ...getReferrerProperties(),
      ...getCampaignProperties(url),
      $session_id: getSessionId(now),
      $pageview_id: currentPageview?.id,
      ...properties,
      $process_person_profile: false,
    },
  });

  // Text/plain avoids a CORS preflight (PostHog parses the JSON regardless), and keepalive
  // ensures events sent just before navigating away (e.g. to checkout) still arrive.
  fetch(`${API_HOST}/i/v0/e/`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function capture(event: string, properties: EventProperties = {}) {
  if (!isEnabled()) return;
  send(event, properties, Date.now());
}

// The URL is passed explicitly, as during client-side navigation window.location may not
// have been updated yet when this is called.
export function capturePageview(url: URL, properties: EventProperties = {}) {
  if (!isEnabled()) return;

  const now = Date.now();
  const previousPageviewProperties = getPreviousPageviewProperties(now);
  currentPageview = { id: uuidv7(), pathname: url.pathname, timestamp: now };

  send('$pageview', { title: document.title, ...previousPageviewProperties, ...properties }, now, url);
}

if (isEnabled()) {
  window.addEventListener('pagehide', () => {
    if (!currentPageview) return;
    const now = Date.now();
    send('$pageleave', getPreviousPageviewProperties(now), now);
  });
}
