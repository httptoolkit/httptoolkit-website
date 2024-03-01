export const isSSR = typeof window === 'undefined';

const hasPrefix = (url = '', pattern = ['']) => {
  if (typeof url !== 'string') {
    return;
  }

  return pattern.some(prefix => url.includes(prefix));
};

export const isExternalUrl = (url: string) => {
  const regex = /^(https?:\/\/)/i;
  return regex.test(url);
};

export const isAnchor = (href: string) => {
  return hasPrefix(href, ['#']);
};

export const isUtilityLink = (href: string) =>
  hasPrefix(href, ['mailto:', 'tel:', 'callto:', 'skype:', 'sms:', 'fax:']);
