// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as _ from 'lodash';
import { makeAutoObservable } from 'mobx';

import { getHeaderValue, getHeaderValues, getOrigin } from '../utils';

const SAFE_HEADERS = ['accept', 'accept-language', 'content-language', 'content-type'];

const SAFE_CONTENT_TYPES = ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'];

function isSafeContentType(contentType: string) {
  return (
    !UNSAFE_HEADER_BYTES.some(b => contentType.includes(b)) &&
    SAFE_CONTENT_TYPES.includes(contentType.split(';')[0].toLowerCase())
  );
}

const UNSAFE_HEADER_BYTES = '"():<>?@[\\]{}'.split('');

export class WillItCorsStore {
  // The various props. They each start as undefined, become empty values (""/{}/[])
  // when the question is ready, and then get updated with input.
  sourceUrl = 'https://';
  targetUrl = 'https://';
  method = '';

  sendCredentials = false;
  useStreaming = false;
  requestHeaders = []; // List of key value pairs

  preflightResponseHeaders = []; // List of key value pairs
  serverResponseHeaders = []; // List of key value pairs

  constructor() {
    makeAutoObservable(this);
  }

  setSourceUrl(url) {
    this.sourceUrl = url;
  }

  setTargetUrl(url) {
    this.targetUrl = url;
  }

  setMethod(method) {
    this.method = method;
  }

  setCredentials(credentials) {
    this.sendCredentials = credentials;
  }

  setUseStreaming(useStreaming) {
    this.useStreaming = useStreaming;
  }

  setRequestHeaders(requestHeaders) {
    this.requestHeaders = requestHeaders;
  }

  setServerResponseHeaders(serverResponseHeaders) {
    this.serverResponseHeaders = serverResponseHeaders;
  }

  setPreflightResponseHeaders(preflightResponseHeaders) {
    this.preflightResponseHeaders = preflightResponseHeaders;
  }

  get sourceOrigin() {
    try {
      return getOrigin(this.sourceUrl);
    } catch (e) {
      return undefined;
    }
  }

  get targetOrigin() {
    try {
      return getOrigin(this.targetUrl);
    } catch (e) {
      return undefined;
    }
  }

  get contentType() {
    return getHeaderValue(this.requestHeaders, 'Content-Type');
  }

  get isCorsRequest() {
    if (!this.sourceOrigin || !this.targetOrigin) return undefined;
    return this.sourceOrigin !== this.targetOrigin;
  }

  get isMixedContentRequest() {
    if (!this.sourceOrigin || !this.targetOrigin) return undefined;

    return (
      this.sourceOrigin.startsWith('https://') &&
      this.targetOrigin.startsWith('http://') &&
      // Most browsers (though admittedly, not all) treat localhost as secure
      !this.targetOrigin.match(/http:\/\/localhost(:|$)/) &&
      !this.targetOrigin.match(/http:\/\/127\.0\.0\.1(:|$)/)
    );
  }

  get unsafeHeaders() {
    return this.requestHeaders
      .filter(([headerName, headerValue]) => {
        const name = headerName.toLowerCase();

        if (!SAFE_HEADERS.includes(name)) return true;

        if (name === 'accept') return UNSAFE_HEADER_BYTES.some((b: string) => headerValue.includes(b));
        if (name === 'accept-language' || name === 'content-language') {
          return !/^[0-9A-Za-z *,.;=\-]+$/.test(headerValue);
        }

        if (name === 'content-type') {
          // Can't include unsafe bytes, must be a safe content type (ignoring params)
          return !isSafeContentType(headerValue);
        }
      })
      .map(([headerName]) => headerName);
  }

  get isSendingUnsafeHeaders() {
    return this.unsafeHeaders.length > 0;
  }

  get isSimpleCorsRequest() {
    if (this.isCorsRequest === undefined || !this.method) return undefined;

    return (
      this.isCorsRequest &&
      !this.isSendingUnsafeHeaders &&
      !this.useStreaming &&
      ['HEAD', 'GET', 'POST'].includes(this.method)
    );
  }

  get doesPreflightResponseAllowOrigin() {
    if (this.sourceOrigin === undefined) return undefined;
    const allowedOrigin = getHeaderValue(this.preflightResponseHeaders, 'access-control-allow-origin');

    return this.sendCredentials
      ? allowedOrigin === this.sourceOrigin
      : allowedOrigin === '*' || allowedOrigin === this.sourceOrigin;
  }

  get doesPreflightResponseAllowMethod() {
    if (!this.method) return undefined;
    const allowedMethods = getHeaderValues(this.preflightResponseHeaders, 'access-control-allow-methods');

    return this.sendCredentials
      ? allowedMethods.includes(this.method)
      : allowedMethods === '*' || allowedMethods.includes(this.method);
  }

  get doesPreflightResponseAllowHeaders() {
    const allowedHeaders = getHeaderValues(this.preflightResponseHeaders, 'access-control-allow-headers').map(h =>
      h.toLowerCase(),
    );

    const includesAllUnsafeHeaders = !this.unsafeHeaders.some((h: string) => !allowedHeaders.includes(h.toLowerCase()));

    // Authorization must be included explicitly - * isn't sufficient.
    const unsafeAuthorization =
      !allowedHeaders.includes('authorization') &&
      this.unsafeHeaders.map((h: string) => h.toLowerCase()).includes('authorization');

    return (
      !unsafeAuthorization &&
      (this.sendCredentials ? includesAllUnsafeHeaders : allowedHeaders.includes('*') || includesAllUnsafeHeaders)
    );
  }

  // Slight misnomer: really does it allow the credentials *we wanted to send* (i.e. always true if we send nothing)
  get doesPreflightResponseAllowCredentials() {
    return (
      !this.sendCredentials ||
      getHeaderValue(this.preflightResponseHeaders, 'access-control-allow-credentials') === 'true'
    );
  }

  get isPreflightSuccessful() {
    return (
      this.doesPreflightResponseAllowOrigin &&
      this.doesPreflightResponseAllowMethod &&
      this.doesPreflightResponseAllowHeaders &&
      this.doesPreflightResponseAllowCredentials
    );
  }

  get isServerResponseReadable() {
    if (this.sourceOrigin === undefined) return undefined;
    const allowedOrigin = getHeaderValue(this.serverResponseHeaders, 'access-control-allow-origin');
    const credentialsAllowed =
      getHeaderValue(this.serverResponseHeaders, 'access-control-allow-credentials') === 'true';

    return this.sendCredentials
      ? credentialsAllowed && allowedOrigin === this.sourceOrigin
      : allowedOrigin === '*' || allowedOrigin === this.sourceOrigin;
  }

  get exampleCode() {
    return `\
// In your script on ${this.sourceUrl}
fetch("${this.targetUrl}", ${JSON.stringify(
      Object.assign(
        { method: this.method },
        this.sendCredentials ? { credentials: 'include' } : {},
        !_.isEmpty(this.requestHeaders)
          ? {
              headers: _.mapValues(
                _.keyBy(this.requestHeaders, ([headerName]) => headerName),
                ([, headerValue]) => headerValue,
              ),
            }
          : {},
      ),
      null,
      4,
    )});

/*${
      !this.isSimpleCorsRequest
        ? `
The server will receive an OPTIONS request to ${this.targetUrl}, including headers:

Origin: ${this.sourceOrigin}
Access-Control-Request-Method: ${this.method}${
            this.unsafeHeaders.length
              ? `
Access-Control-Request-Headers: ${this.unsafeHeaders.join(', ')}`
              : ''
          }

The server's response headers should include:

${this.preflightResponseHeaders.map(([headerName, headerValue]) => `${headerName}: ${headerValue}`).join('\n')}

Next, the `
        : `
The `
    }server will receive your ${this.method} request to ${this.targetUrl}, with an 'Origin: ${this.sourceOrigin}' header set by the browser.

The server's response headers should include:

${this.serverResponseHeaders.map(([headerName, headerValue]) => `${headerName}: ${headerValue}`).join('\n')}
*/
`;
  }
}
