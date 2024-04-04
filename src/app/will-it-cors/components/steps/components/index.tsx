import * as _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useState, type FormEventHandler } from 'react';

import { EditableHeaders } from './editable-headers';

import {
  deleteHeader,
  getHeaderValue,
  getHeaderValues,
  joinAnd,
  setHeader,
  someHeaderValues,
} from '@/app/will-it-cors/utils';
import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { CheckCircle, PaperPlaneTilt, XCircle } from '@/components/elements/icon';
import { ShippingFast } from '@/components/elements/icon/custom';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { BlockCode, InlineCode } from '@/components/modules/block-code';
import { Checkbox } from '@/components/modules/checkbox';
import { Input } from '@/components/modules/input';

interface QuestionProps {
  onNext: () => void;
  onChange: (e: string) => void;
  value: string | any;
}

export const Question = ({ children, onNext }: Component<Pick<QuestionProps, 'onNext'>>) => {
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    // @ts-expect-errorts-ignore
    if (e.target.checkValidity()) {
      onNext();
    }
  };

  return <form onSubmit={handleFormSubmit}>{children}</form>;
};

export const SourceUrlQuestion = observer(({ onNext, value, onChange }: QuestionProps) => {
  return (
    <Question onNext={onNext}>
      <Stack>
        <Heading fontSize="l"> What is the URL of the page that wants to send requests?</Heading>
        <Input
          id="source_url"
          type="url"
          required
          placeholder="http://example.com"
          value={value}
          onChange={e => {
            e.preventDefault();
            onChange(e.target.value);
          }}
        />
        <Button $isFluid type="submit">
          Next
        </Button>
      </Stack>
    </Question>
  );
});

export const TargetUrlQuestion = observer(({ onNext, value, onChange }: QuestionProps) => {
  return (
    <Question onNext={onNext}>
      <Stack>
        <Heading fontSize="l"> What is the URL you want to send a request to?</Heading>
        <Input
          id="target_url"
          type="url"
          required
          placeholder="http://example.com"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <Button $isFluid type="submit">
          Next
        </Button>
      </Stack>
    </Question>
  );
});

export const NotCorsResult = observer(({ origin }: { origin: string }) => (
  <Stack>
    <Heading>
      <CheckCircle aria-label="Yes" weight="fill" size={90} color="#6284FA" />
    </Heading>
    <Text fontSize="l">
      <strong>You can send your request without worrying about CORS.</strong>
    </Text>
    <Text fontSize="l">
      The origin of your source and target URLs is the same ({origin}), so CORS restrictions don&apos;t apply.
    </Text>
    <Text fontSize="l">
      There may be other (less restrictive) limits on the requests you can send though. Check the list of{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name">forbidden headers</Link> for
      more info, and try out <Link href="/">HTTP Toolkit</Link> if you want to see exactly what&apos;s being sent &
      received in reality.
    </Text>
  </Stack>
));

export const MixedContentResult = observer(
  ({ sourceOrigin, targetOrigin }: { sourceOrigin: string; targetOrigin: string }) => (
    <Stack>
      <Heading>
        <XCircle aria-label="No" weight="fill" size={90} color="#D93E1C" />
      </Heading>
      <Text fontSize="l">
        This request will fail, because secure origins like <InlineCode>{sourceOrigin}</InlineCode> cannot make requests
        to insecure HTTP origins like <InlineCode>{targetOrigin}</InlineCode>.
      </Text>
      <Text fontSize="l">
        This is due to{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content">
          mixed content restrictions
        </Link>{' '}
        that ensure HTTPS pages can only use secure content, and isn&apos;t related to CORS.
      </Text>
      <Text fontSize="l">
        To fix this, you should connect to <InlineCode>{targetOrigin}</InlineCode> over HTTPS instead of using plain
        HTTP.
      </Text>
    </Stack>
  ),
);

interface MethodQuestionProps extends QuestionProps {
  sourceOrigin: string;
  targetOrigin: string;
}

export const MethodQuestion = observer(
  ({ onNext, value, onChange, targetOrigin, sourceOrigin }: MethodQuestionProps) => {
    return (
      <Question onNext={onNext}>
        <Stack>
          <Text fontStyle="italic" fontSize="m">
            Your source and target URLs have different origins ({sourceOrigin} and {targetOrigin} respectively) so{' '}
            <strong>this is indeed a cross-origin request</strong>.
          </Text>
          <Heading fontSize="l">
            What <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP method</Link> will your
            request use?
          </Heading>
          <Input
            id="method_url"
            type="text"
            required
            placeholder="GET"
            value={value}
            onChange={e => {
              const method = e.target.value.toUpperCase().trim();
              onChange(method);

              if (['CONNECT', 'TRACE', 'TRACK'].includes(method)) {
                e.target.setCustomValidity(`Browsers will not let you manually send a ${method} request`);
              } else {
                e.target.setCustomValidity('');
              }
              e.target.reportValidity();
            }}
          />
          <Button $isFluid type="submit">
            Next
          </Button>
        </Stack>
      </Question>
    );
  },
);

interface RequestExtrasQuestionProps extends Pick<QuestionProps, 'onNext'> {
  sendCredentials: boolean;
  onSendCredentials: (e: any) => void;
  onUseStreaming: (e: any) => void;
  headers: never[];
  useStreaming: boolean;
  onChangeHeaders: (e: any) => void;
}
export const RequestExtrasQuestion = observer(
  ({
    onNext,
    sendCredentials,
    onSendCredentials,
    headers,
    useStreaming,
    onUseStreaming,
    onChangeHeaders,
  }: RequestExtrasQuestionProps) => {
    const [showHeaders, setShowHeaders] = useState(!_.isEmpty(headers));
    return (
      <Question onNext={onNext}>
        <Stack>
          <Heading fontSize="l">Do you want send or read any other data?</Heading>

          <Checkbox
            id="send-credentials"
            label="Send built-in browser credentials, like cookies or client certificates, with this request?"
            checked={sendCredentials}
            onChange={e => onSendCredentials(e.target.checked)}
          />

          <Checkbox
            id="send-useStreaming"
            label="Incrementally stream the request or response, or monitor their progress?"
            checked={useStreaming}
            onChange={e => onUseStreaming(e.target.checked)}
          />

          <Checkbox
            id="show-headers"
            checked={showHeaders}
            onChange={e => {
              const shouldShowHeaders = e.target.checked;
              setShowHeaders(shouldShowHeaders);
              if (!shouldShowHeaders) {
                onChangeHeaders([]);
              }
            }}
            label="Send custom request headers?"
          />

          {showHeaders && (
            <EditableHeaders autoFocus headers={headers} onChange={onChangeHeaders} onlyClientHeaders={true} />
          )}

          <Button $isFluid type="submit">
            {headers.length === 0 && !sendCredentials && !useStreaming ? 'No, skip this' : 'Next'}
          </Button>
        </Stack>
      </Question>
    );
  },
);

export const ContentTypeQuestion = ({ onNext, value, onChange }: QuestionProps) => {
  return (
    <Question onNext={onNext}>
      <Stack>
        <Heading fontSize="l">
          What <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type">content type</Link>{' '}
          will your POST request use?
        </Heading>
        <Input id="" placeholder="text/plain" value={value || ''} onChange={e => onChange(e.target.value)} />
        <Button $isFluid type="submit">
          Next
        </Button>
        <Text fontSize="m" fontStyle="italic">
          Only POSTs sent with application/x-www-form-urlencoded, text/plain or multipart/form-data content-type headers
          are considered{' '}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests">simple requests</Link>.
        </Text>
      </Stack>
    </Question>
  );
};

export const SimpleCorsRequest = ({ onNext }: Pick<QuestionProps, 'onNext'>) => (
  <Stack>
    <Heading fontWeight="bold">Simple cross-origin request</Heading>
    <Text textAlign="center">
      <ShippingFast width={100} color="#6284FA" />
    </Text>
    <Text fontSize="l">
      This is a{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests">
        simple cross-origin request
      </Link>
      . For requests like this, the browser doesn&apos;t need to send a preflight OPTIONS request to the server first,
      so <strong>your request will be sent to the server immediately</strong>.
    </Text>
    <Text fontSize="l">
      Simple requests are a GET or HEAD requests, or POST requests with specific safe content types, that don&apos;t use
      any unsafe cross-origin headers or streaming.
    </Text>
    <Text fontSize="l">
      <strong>However, this doesn&apos;t mean you&apos;re always allowed to read the response</strong>. That depends on
      the headers the server returns...
    </Text>
    <Button $isFluid onClick={onNext}>
      Next
    </Button>
  </Stack>
);

interface ServerResponseQuestionProps extends QuestionProps {
  sourceOrigin?: string;
  isServerResponseReadable?: boolean;
  sendCredentials: boolean;
  targetUrl?: string;
  method?: string;
  unsafeHeaders: any;
}

export const ServerResponseQuestion = observer(
  ({
    onNext,
    value,
    sourceOrigin,
    onChange,
    isServerResponseReadable,
    sendCredentials,
  }: ServerResponseQuestionProps) => (
    <Question onNext={onNext}>
      <Stack>
        <Text fontStyle="italic" fontSize="m">
          The browser will include an Origin header set to {sourceOrigin} with your request, so the server knows that
          this is a CORS request, and knows the specific page origin.
        </Text>
        <Heading fontSize="l">What headers will the server return in its response?</Heading>
        <Checkbox
          id="server-response-readable"
          checked={isServerResponseReadable}
          label="Allow the page to read this response"
          onChange={e => {
            if (e.target.checked) {
              setHeader(value, 'Access-Control-Allow-Origin', sourceOrigin);
              if (sendCredentials) {
                setHeader(value, 'Access-Control-Allow-Credentials', 'true');
              }
              setHeader(value, 'Vary', 'origin');
            } else {
              deleteHeader(value, 'Access-Control-Allow-Origin');
              deleteHeader(value, 'Access-Control-Allow-Credentials');

              // If there's now no headers that depend on the origin, drop the Vary
              if (
                getHeaderValue(value, 'vary') === 'origin' &&
                !someHeaderValues(value, (value: string | undefined) => value === sourceOrigin)
              ) {
                deleteHeader(value, 'Vary');
              }
            }
            onChange(value);
          }}
        />
        <Checkbox
          id="header-Value"
          checked={getHeaderValue(value, 'Access-Control-Expose-Headers') !== undefined}
          label="Allow the page to read custom headers from the response"
          onChange={e => {
            if (e.target.checked) {
              setHeader(value, 'Access-Control-Expose-Headers', 'MyCustomHeader');
              setHeader(value, 'MyCustomHeader', '');
            } else {
              deleteHeader(value, 'Access-Control-Expose-Headers');
              deleteHeader(value, 'MyCustomHeader');
            }
            onChange(value);
          }}
        />
        <Checkbox
          id="timing"
          value={
            getHeaderValue(value, 'timing-allow-origin') === '*' ||
            getHeaderValues(value, 'timing-allow-origin').includes(sourceOrigin)
          }
          label="Allow the page to read the timing data for this response"
          onChange={e => {
            if (e.target.checked) {
              setHeader(value, 'Timing-Allow-Origin', sourceOrigin);
              setHeader(value, 'Vary', 'origin');
            } else {
              deleteHeader(value, 'Timing-Allow-Origin');

              // If there's now no headers that depend on the origin, drop the Vary
              if (
                getHeaderValue(value, 'vary') === 'origin' &&
                !someHeaderValues(value, (value: string | undefined) => value === sourceOrigin)
              ) {
                deleteHeader(value, 'Vary');
              }
            }
            onChange(value);
          }}
        />
        <EditableHeaders headers={value} onChange={onChange} />
        <Button $isFluid type="submit">
          Next
        </Button>
      </Stack>
    </Question>
  ),
);

interface ServerRejectsCorsRequestProps {
  serverResponseHeaders: any;
  sendCredentials: boolean;
  sourceOrigin: string;
}

export const ServerRejectsCorsRequest = ({
  serverResponseHeaders,
  sendCredentials,
  sourceOrigin,
}: ServerRejectsCorsRequestProps) => {
  const allowedOrigin = getHeaderValue(serverResponseHeaders, 'access-control-allow-origin');
  const allowCredentials = getHeaderValue(serverResponseHeaders, 'access-control-allow-credentials');

  const missingHeaders = [
    allowedOrigin === undefined && 'Access-Control-Allow-Origin',
    sendCredentials && allowCredentials === undefined && 'Access-Control-Allow-Credentials',
  ].filter(h => !!h);

  const failureReasons = [
    missingHeaders.length > 0 &&
      `
          the ${joinAnd(missingHeaders)} ${
            missingHeaders.length > 1 ? 'headers were' : 'header was'
          } required but missing`,
    sendCredentials &&
      allowCredentials &&
      allowCredentials !== 'true' &&
      `
          credentials were sent, but the Access-Control-Allow-Credentials header was
          '${allowCredentials}' instead of 'true'`,
    allowedOrigin &&
      allowedOrigin !== sourceOrigin &&
      (allowedOrigin !== '*' || sendCredentials) &&
      `
          the Access-Control-Allow-Origin header was '${allowedOrigin}' instead of
          '${sourceOrigin}'${
            sendCredentials && allowedOrigin === '*' ? " (* doesn't match all origins when you send credentials)" : ''
          }`,
  ].filter(r => !!r);

  return (
    <Stack>
      <Heading>
        <XCircle aria-label="No" weight="fill" size={100} color="#D93E1C" />
      </Heading>
      <Text>
        <strong>
          The request was sent, but the headers returned by the server don&apos;t allow you to read the response.
        </strong>
      </Text>
      <Text fontSize="l">
        In practice, your request will fail with an error, and the browser will print an explanation to the console
        explaining why the server&apos;s headers weren&apos;t OK. You won&apos;t be able to examine the response&apos;s
        status code, headers or body.
      </Text>
      <Text fontSize="l">This failed because {joinAnd(failureReasons)}.</Text>
      <Text fontSize="l">
        To avoid this and ready the response, you&apos;ll need to make the server send the correct CORS headers, or use
        a CORS proxy.
      </Text>
      <Text fontSize="l">
        If you&apos;re actually not interested in the response, you can set <InlineCode>mode: no-cors</InlineCode> on
        your request, to intentionally receive an opaque response. This is useful for{' '}
        <Link href="https://stackoverflow.com/a/39109790/68051">a few niche use cases</Link> in caching & cross-origin
        resource loading.
      </Text>
    </Stack>
  );
};

interface ServerAllowsCorsRequestProps extends Pick<QuestionProps, 'onNext'> {
  sourceOrigin?: string;
  responseHeaders: any;
  sendCredentials: boolean;
}

export const ServerAllowsCorsRequest = ({
  sourceOrigin,
  responseHeaders,
  sendCredentials,
  onNext,
}: ServerAllowsCorsRequestProps) => {
  const exposedHeadersHeader = getHeaderValues(responseHeaders, 'access-control-expose-headers');
  const timingInfo = getHeaderValue(responseHeaders, 'timing-allow-origin');

  const corsSafelistedHeaders = (
    <>
      and all{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header">
        CORS-safelisted headers
      </Link>
    </>
  );

  const hasHeaderWildcard = exposedHeadersHeader.includes('*');
  const explicitlyAllowedHeaders = exposedHeadersHeader.filter((h: string) => h !== '*');

  const credsWithWildcardWarning =
    hasHeaderWildcard && sendCredentials ? " (* doesn't match all headers if you send credentials)" : '';
  const exposedHeaders =
    hasHeaderWildcard && !sendCredentials ? (
      'and all received headers'
    ) : explicitlyAllowedHeaders.length ? (
      <>
        the explicitly exposed headers ({joinAnd(explicitlyAllowedHeaders)}) {corsSafelistedHeaders}
      </>
    ) : (
      corsSafelistedHeaders
    );

  const varyOnOrigin =
    getHeaderValues(responseHeaders, 'vary').some((v: string) => v.toLowerCase() === 'origin') ||
    getHeaderValue(responseHeaders, 'vary') === '*';

  const uselessSetCookie = getHeaderValue(responseHeaders, 'set-cookie') !== undefined && !sendCredentials;

  return (
    <Stack>
      <Heading>
        <CheckCircle aria-label="Yes" weight="fill" size={90} color="#6284FA" />
      </Heading>
      <Text fontSize="l">
        <strong>The request was sent, and the server&apos;s CORS headers let you read the response</strong>.
      </Text>
      <Text fontSize="l">
        You&apos;ll be able to examine the response&apos;s status code, its body, {exposedHeaders}
        {credsWithWildcardWarning}.
      </Text>
      <Text fontSize="l">
        {timingInfo === '*' || timingInfo === sourceOrigin ? (
          <>
            You&apos;ll also be able to use the{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API">resource timing API</Link>{' '}
            to examine the detailed performance of this request.
          </>
        ) : (
          <>
            You won&apos;t however be able to use the{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API">resource timing API</Link>{' '}
            to examine the detailed performance of this request, as it doesn&apos;t include a matching
            Timing-Allow-Origin header.
          </>
        )}
      </Text>
      {uselessSetCookie && (
        <Text fontSize="l">
          <Text fontSize="l" color="cinnarbarRed" as="span" fontStyle="italic">
            This response sets a cookie that won&apos;t be used
          </Text>
          . Set-Cookie headers in responses are ignored, unless the initial request includes browser credentials.
        </Text>
      )}
      {!varyOnOrigin && someHeaderValues(responseHeaders, (v: string) => v.toLowerCase() === sourceOrigin) && (
        <Text fontSize="l">
          <Text fontSize="l" color="cinnarbarRed" as="span" fontStyle="italic">
            This result may be cached incorrectly
          </Text>
          . Your response headers reference the page origin from the request, but they don&apos;t include `Origin` in a{' '}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary">Vary header</Link>. This response
          might be cached and then used by a CORS request from a different origin, where it will unexpectedly fail.
        </Text>
      )}
      <Button type="submit" $isFluid onClick={onNext}>
        Show me the code
      </Button>
      <TryHttpToolkit />
    </Stack>
  );
};

export const ShowCode = ({ code }: { code: any }) => {
  return (
    <Stack>
      <BlockCode language="language-bash" title="Example code" content={code.trim()} />
      <TryHttpToolkit />
    </Stack>
  );
};

export const PreflightRequest = ({ onNext }: Pick<QuestionProps, 'onNext'>) => (
  <Stack>
    <Heading fontSize="l">Preflight required</Heading>
    <Text textAlign="center">
      <PaperPlaneTilt weight="fill" size={100} color="#D93E1C" />
    </Text>
    <Text fontSize="l">
      This is not a{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests">
        simple cross-origin request
      </Link>
      , so <strong>the browser will send a preflight request</strong> to the server automatically, to check its CORS
      configuration before it sends the real request.
    </Text>
    <Text fontSize="l">
      Preflight requests use the HTTP OPTIONS method and include Access-Control-Request headers to ask the server what
      kind of CORS requests are allowed. The server&apos;s response tells the browser whether your main request can be
      sent.
    </Text>
    <Button type="submit" $isFluid onClick={onNext}>
      Next
    </Button>
  </Stack>
);

// start

interface PreflightResponseQuestionProps extends QuestionProps {
  targetUrl: string;
  sourceOrigin?: string;
  unsafeHeaders: any;
  method: string;
  isPreflightSuccessful: boolean;
  sendCredentials: boolean;
}

export const PreflightResponseQuestion = observer(
  ({
    value,
    onNext,
    targetUrl,
    sourceOrigin,
    unsafeHeaders,
    method,
    onChange,
    isPreflightSuccessful,
    sendCredentials,
  }: PreflightResponseQuestionProps) => {
    const preflightHeaders = value;
    const cacheDuration = parseInt(getHeaderValue(preflightHeaders, 'access-control-max-age'), 10);

    return (
      <Question onNext={onNext}>
        <Stack>
          <Text fontSize="l" fontStyle="italic">
            The browser will send an OPTIONS request to {targetUrl}, with{' '}
            {joinAnd(
              [`an Origin header (${sourceOrigin})`, `an Access-Control-Request-Method header (${method})`].concat(
                unsafeHeaders.length ? [`an Access-Control-Request-Headers header (${unsafeHeaders.join(', ')})`] : [],
              ),
            )}
            .
          </Text>
          <Heading fontSize="l">What headers will the server return in its response?</Heading>
          <Checkbox
            id="allow-request"
            checked={isPreflightSuccessful}
            onChange={e => {
              if (e.target.checked) {
                setHeader(preflightHeaders, 'Access-Control-Allow-Origin', sourceOrigin);
                setHeader(preflightHeaders, 'Access-Control-Allow-Methods', method);
                if (unsafeHeaders.length) {
                  setHeader(preflightHeaders, 'Access-Control-Allow-Headers', unsafeHeaders.join(', '));
                }
                if (sendCredentials) {
                  setHeader(preflightHeaders, 'Access-Control-Allow-Credentials', 'true');
                }
              } else {
                deleteHeader(preflightHeaders, 'Access-Control-Allow-Origin');
                deleteHeader(preflightHeaders, 'Access-Control-Allow-Methods');
                deleteHeader(preflightHeaders, 'Access-Control-Allow-Headers');
                deleteHeader(preflightHeaders, 'Access-Control-Allow-Credentials');
              }
              onChange(preflightHeaders);
            }}
            label="Allow this request"
          />
          <Checkbox
            id="cache-result"
            checked={cacheDuration > 0}
            onChange={e => {
              if (e.target.checked) {
                setHeader(preflightHeaders, 'Access-Control-Max-Age', '86400');
              } else {
                deleteHeader(preflightHeaders, 'Access-Control-Max-Age');
              }
              onChange(preflightHeaders);
            }}
            label="Cache this result, to speed up future preflight checks"
          />
          <EditableHeaders headers={value} onChange={onChange} />
          <Button $isFluid type="submit">
            Next
          </Button>
        </Stack>
      </Question>
    );
  },
);

interface ServerRejectsPreflightRequestProps {
  sourceOrigin?: string;
  preflightResponseHeaders: any;
  originAllowed?: boolean;
  methodAllowed: boolean;
  headersAllowed: boolean;
  credentialsAllowed: boolean;
  sendCredentials: boolean;
  unsafeHeaders: any;
  method: string;
}

export const ServerRejectsPreflightRequest = ({
  preflightResponseHeaders,
  sourceOrigin,
  originAllowed,
  methodAllowed,
  headersAllowed,
  credentialsAllowed,
  sendCredentials,
  unsafeHeaders,
  method,
}: ServerRejectsPreflightRequestProps) => {
  const preflightHeaders = preflightResponseHeaders;

  const incorrectHeaders = [
    !originAllowed && 'Origin',
    !methodAllowed && 'Methods',
    !headersAllowed && 'Headers',
    !credentialsAllowed && 'Credentials',
  ].filter(v => !!v);

  const [missingHeaders, incompleteHeaders] = _.partition(
    incorrectHeaders,
    h => !getHeaderValue(preflightHeaders, `Access-Control-Allow-${h}`),
  );

  const invalidWildcards = sendCredentials
    ? [
        !originAllowed && getHeaderValue(preflightHeaders, 'Access-Control-Allow-Origin') === '*' && 'Origin',
        !methodAllowed && getHeaderValues(preflightHeaders, 'Access-Control-Allow-Methods').includes('*') && 'Methods',
        !headersAllowed && getHeaderValues(preflightHeaders, 'Access-Control-Allow-Headers').includes('*') && 'Headers',
      ].filter(h => !!h)
    : [];

  // Authorization must be included explicitly - * is never sufficient.
  const allowedHeaders = getHeaderValues(preflightHeaders, 'access-control-allow-headers').map((h: string) =>
    h.toLowerCase(),
  );
  const wildcardWithAuthorization =
    !sendCredentials && // Irrelevant if * is invalid anyway
    unsafeHeaders.map((h: string) => h.toLowerCase()).includes('authorization') &&
    !allowedHeaders.includes('authorization') &&
    allowedHeaders.includes('*');

  return (
    <Stack>
      <Heading>
        <XCircle aria-label="No" weight="fill" size={90} color="#D93E1C" />
      </Heading>
      <Text fontSize="l">
        The server&apos;s response to the preflight request doesn&apos;t allow the CORS request you want to send, so the
        browser won&apos;t send it.
      </Text>
      <Text fontSize="l">
        In practice, <strong>your request will fail with a generic error</strong>, and the browser will print an
        explanation to the console explaining why the preflight response wasn&apos;t OK.
      </Text>
      <Text fontSize="l">
        This failed because{' '}
        {joinAnd(
          [
            missingHeaders.length &&
              `the ${joinAnd(missingHeaders.map(h => `Access-Control-Allow-${h}`))} header${
                missingHeaders.length > 1 ? 's are' : ' is'
              } required but missing`,
            ...incompleteHeaders.map(
              incompleteHeader =>
                `the Access-Control-Allow-${incompleteHeader} header (${getHeaderValue(
                  preflightHeaders,
                  `Access-Control-Allow-${incompleteHeader}`,
                )}) ${
                  incompleteHeader === 'Origin'
                    ? `does not match the request origin (${sourceOrigin})`
                    : incompleteHeader === 'Methods'
                      ? `does not include the request method (${method})`
                      : incompleteHeader === 'Headers'
                        ? `does not match all unsafe headers (${joinAnd(unsafeHeaders)})`
                        : // Credentials
                          `is not 'true' and the request would include credentials`
                }`,
            ),
          ].filter(v => !!v),
        )}
        .
      </Text>
      {wildcardWithAuthorization && (
        <Text fontSize="l">
          <strong>Note that the * wildcard for Access-Control-Allow-Headers never matches Authorization headers</strong>
          . The Authorization header needs to be listed explicitly.
        </Text>
      )}
      {invalidWildcards.length > 0 && (
        <Text fontSize="l">
          <strong>
            Remember that the {joinAnd(invalidWildcards.map(h => `Access-Control-Allow-${h}`))}{' '}
            {invalidWildcards.length > 1 ? 'headers ignore' : 'header ignores'} * wildcards when credentials are
            enabled.
          </strong>
        </Text>
      )}
      <Text fontSize="l">
        To avoid this, you&apos;ll need to either make the server send the correct preflight headers, or make your
        request a{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests">simple request</Link> that
        doesn&apos;t require an initial preflight.
      </Text>
    </Stack>
  );
};

export const ServerAllowsPreflightRequest = ({ onNext }: Pick<QuestionProps, 'onNext'>) => (
  <Stack>
    <Heading>Preflight request successful</Heading>
    <Text fontSize="l">
      The server&apos;s response to the preflight request says the browser is allowed to send CORS requests like this,
      so <strong>the browser now sends your request</strong>.
    </Text>
    <Text fontSize="l">
      <strong>However, this doesn&apos;t mean you can definitely read the response</strong>. That depends on the headers
      the server returns with the final response...
    </Text>
    <Button $isFluid type="submit" onClick={onNext}>
      Next
    </Button>
  </Stack>
);

const TryHttpToolkit = () => {
  return (
    <Text fontSize="m">
      Want to see & test this for real? <Link href="/">Try out HTTP Toolkit</Link>.
    </Text>
  );
};
