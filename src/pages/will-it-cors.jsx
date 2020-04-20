import * as _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Router } from "@reach/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

import { styled, ThemeProvider, media, getGlobalStyles, theme } from '../styles';
import { EditableHeaders } from '../components/editable-headers';

import "prismjs/themes/prism-tomorrow.css";
import logo from '../images/logo.svg';

const Main = styled.main`
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-display: fallback;

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${media.desktop`
    margin: 0 auto;
    width: 1024px;
  `}
`;

const PageContent = styled.section`
    ${media.desktopOrTablet`
        margin: auto 0 0 0;
        max-width: 60%;
    `}

    ${media.mobile`
        margin: auto 10px 10px 10px;
    `}
`;

const ExternalLink = styled.a.attrs(() => ({
    target: '_blank',
    rel: "noopener noreferrer"
}))`
    color: ${p => p.theme.primaryInputBackground};
`;

const Footer = styled.footer`
    margin-top: auto;
    padding: 10px 0;

    opacity: 0.6;

    a {
        text-decoration: none;
    }

    img {
        height: 1em;
        margin-left: 5px;
    }
`;

const PAGE_TITLE = "Will It CORS?";
const PAGE_DESCRIPTION = "Literally nobody understands CORS, except this web page";

const SAFE_CONTENT_TYPES = [
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'text/plain'
];

const SAFE_HEADERS = [
    'accept',
    'accept-language',
    'content-language',
    'content-type',
    'dpr',
    'downlink',
    'save-data',
    'viewport-width',
    'width'
];

function getOrigin(url) {
    return new URL(url).origin;
}

function getHeaderPair(headers, key) {
    return _.find(headers, ([headerKey]) => headerKey.toLowerCase() === key);
}

function getHeaderValue(headers, key) {
    return (getHeaderPair(headers, key) || [])[1];
}

function getHeaderValues(headers, key, separator = ', ') {
    return (getHeaderValue(headers, key) || '').split(separator).filter(v => !!v);
}

function setHeader(headers, key, value) {
    const headerPair = getHeaderPair(headers, key);
    if (headerPair) {
        headerPair[1] = value;
    } else {
        headers.unshift([key, value]);
    }
}

@observer
export default class WillItCors extends React.Component {

    // The various props. They each start as undefined, become empty values (""/{}/[])
    // when the question is ready, and then get updated with input.
    @observable sourceUrl = "";
    @observable targetUrl = "";
    @observable method = "";
    @observable requestHeaders = []; // List of key value pairs
    @observable preflightResponseHeaders = []; // List of key value pairs
    @observable serverResponseHeaders = []; // List of key value pairs

    @computed get sourceOrigin() {
        try {
            return getOrigin(this.sourceUrl);
        } catch (e) {
            return undefined;
        }
    }

    @computed get targetOrigin() {
        try {
            return getOrigin(this.targetUrl);
        } catch (e) {
            return undefined;
        }
    }

    @computed get contentType() {
        return getHeaderValue(this.requestHeaders, 'content-type');
    }

    @computed get isCorsRequest() {
        if (!this.sourceOrigin || !this.targetOrigin) return undefined;
        return this.sourceOrigin === this.targetOrigin;
    }

    @computed get isMixedContentRequest() {
        if (!this.sourceOrigin || !this.targetOrigin) return undefined;

        return this.sourceOrigin.startsWith('https://') &&
            this.targetOrigin.startsWith('http://') &&
            // Most browsers (though admittedly, not all) treat localhost as secure
            !this.targetOrigin.match(/http:\/\/localhost(:|$)/) &&
            !this.targetOrigin.match(/http:\/\/127\.0\.0\.1(:|$)/);
    }

    @computed get unsafeHeaders() {
        return this.requestHeaders
            .map(([headerName]) => headerName)
            .filter((headerName) => !SAFE_HEADERS.includes(headerName.toLowerCase()))
    }

    @computed get isSendingUnsafeHeaders() {
        return this.unsafeHeaders.length > 0;
    }

    @computed get isSimpleCorsRequest() {
        if (
            this.isCorsRequest === undefined ||
            !this.method ||
            (this.method === 'POST' && !this.contentType)
        ) return undefined;

        return this.isCorsRequest &&
            !this.isSendingUnsafeHeaders && (
                ['HEAD', 'GET'].includes(this.method) ||
                (this.method === 'POST' && SAFE_CONTENT_TYPES.includes(this.contentType.toLowerCase()))
            );
    }

    @computed get isPreflightSuccessful() {
        if (this.sourceOrigin === undefined) return undefined;

        const allowedOrigin = getHeaderValue(this.preflightResponseHeaders, 'access-control-allow-origin');
        const allowedMethods = getHeaderValues(this.preflightResponseHeaders, 'access-control-allow-methods');
        const allowedHeaders = getHeaderValues(this.preflightResponseHeaders, 'access-control-allow-headers')
            .map(h => h.toLowerCase());

        return (allowedOrigin === '*' || allowedOrigin === this.sourceOrigin) &&
            (allowedMethods === '*' || allowedMethods.includes(this.method)) &&
            (allowedHeaders === '*' || !this.unsafeHeaders.some(h => !allowedHeaders.includes(h.toLowerCase())));
    }

    @computed get isServerResponseReadable() {
        if (this.sourceOrigin === undefined) return undefined;
        const allowedOrigin = getHeaderValue(this.serverResponseHeaders, 'access-control-allow-origin');
        return (allowedOrigin === '*' || allowedOrigin === this.sourceOrigin);
    }

    render() {
        const { navigate } = this.props;

        const GlobalStyles = getGlobalStyles();

        return <ThemeProvider theme={theme}>
            <Main>
                <GlobalStyles />
                <Helmet>
                    {/* DNS prefetch in addition to preconnect, for non-supermodern browsers */}
                    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Lato|Courgette' />

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e1421f" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#fafafa" />

                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <title>{ PAGE_TITLE }</title>
                    <meta name="description" content={PAGE_DESCRIPTION} />

                    <meta property="og:url"         content="https://httptoolkit.tech" />
                    <meta property="og:type"        content="website" />
                    <meta property="og:title"       content={PAGE_TITLE} />
                    <meta property="og:description" content={PAGE_DESCRIPTION} />
                    <meta property="og:image"       content="https://httptoolkit.tech/logo-social.png" />

                    <meta name="twitter:card"        content="summary" />
                    <meta name="twitter:site"        content="@httptoolkit" />
                    <meta name="twitter:title"       content={PAGE_TITLE} />
                    <meta name="twitter:description" content={PAGE_DESCRIPTION} />
                    <meta name="twitter:image"       content="https://httptoolkit.tech/logo-square.png" />

                    <link rel="alternate" type="application/rss+xml" href="https://httptoolkit.tech/rss.xml" />
                </Helmet>

                <PageContent>
                    <Router basepath="/will-it-cors">
                        <Intro path="/" onNext={() => navigate("./source-url")} />
                        <SourceUrlQuestion
                            path="/source-url"
                            value={this.sourceUrl}
                            onChange={(newValue) => { this.sourceUrl = newValue }}
                            onNext={() => navigate("./target-url")}
                        />
                        <TargetUrlQuestion
                            path="/target-url"
                            value={this.targetUrl}
                            onChange={(newValue) => { this.targetUrl = newValue }}
                            onNext={() => {
                                if (!this.isCorsRequest) {
                                    navigate("./not-cors");
                                } else if (this.isMixedContentRequest) {
                                    navigate("./mixed-content");
                                } else {
                                    navigate("./method");
                                }
                            }}
                        />
                        {
                            this.isCorsRequest === false && <NotCorsResult
                                path="/not-cors"
                                origin={this.sourceOrigin}
                            />
                        }
                        { this.isMixedContentRequest && <MixedContentResult
                                path="/mixed-content"
                                sourceOrigin={this.sourceOrigin}
                                targetOrigin={this.targetOrigin}
                            />
                        }
                        <MethodQuestion
                            path="/method"
                            sourceOrigin={this.sourceOrigin}
                            targetOrigin={this.targetOrigin}
                            value={this.method}
                            onChange={(newValue) => { this.method = newValue }}
                            onNext={() => navigate("./request-headers")}
                        />
                        <RequestHeadersQuestion
                            path="/request-headers"
                            value={this.requestHeaders}
                            onChange={(newValue) => { this.requestHeaders = newValue }}
                            onNext={() => {
                                if (this.isSimpleCorsRequest) {
                                    navigate("./simple-cors");
                                } else if (this.method === 'POST' && !this.contentType) {
                                    navigate("./content-type");
                                } else {
                                    navigate("./preflight");
                                }
                            }}
                        />
                        <ContentTypeQuestion
                            path="/content-type"
                            value={this.contentType}
                            onChange={(newValue) => setHeader(this.requestHeaders, 'content-type', newValue)}
                            onNext={() => {
                                if (this.isSimpleCorsRequest) {
                                    navigate("./simple-cors");
                                } else {
                                    navigate("./preflight");
                                }
                            }}
                        />
                        { this.isSimpleCorsRequest &&
                            <SimpleCorsRequest
                                path="/simple-cors"
                                onNext={() => navigate("./server-response")}
                            />
                        }
                        <ServerResponseQuestion
                            path="/server-response"

                            sourceOrigin={this.sourceOrigin}
                            targetUrl={this.targetUrl}
                            method={this.method}
                            unsafeHeaders={this.unsafeHeaders}

                            value={this.serverResponseHeaders}
                            onChange={(newValue) => { this.serverResponseHeaders = newValue }}
                            onNext={() => {
                                if (this.isServerResponseReadable) {
                                    navigate("./simple-request-success");
                                } else {
                                    navigate("./simple-request-failure");
                                }
                            }}
                        />

                        { this.isServerResponseReadable &&
                            <ServerAllowsCorsRequest
                                path="/simple-request-success"
                                sourceOrigin={this.sourceOrigin}
                                responseHeaders={this.serverResponseHeaders}
                            />
                        }

                        { this.isServerResponseReadable === false &&
                            <ServerRejectsCorsRequest
                                path="/simple-request-failure"
                            />
                        }

                        { !this.isSimpleCorsRequest &&
                            <PrelightRequest
                                path="/preflight"
                                onNext={() => navigate("./preflight-response")}
                            />
                        }

                        <PreflightResponseQuestion
                            path="/preflight-response"

                            sourceOrigin={this.sourceOrigin}
                            targetUrl={this.targetUrl}
                            method={this.method}
                            unsafeHeaders={this.unsafeHeaders}

                            value={this.preflightResponseHeaders}
                            onChange={(newValue) => { this.preflightResponseHeaders = newValue }}
                            onNext={() => {
                                if (this.isPreflightSuccessful) {
                                    navigate("./preflight-success");
                                } else {
                                    navigate("./preflight-failure");
                                }
                            }}
                        />

                        { this.isPreflightSuccessful === false &&
                            <ServerRejectsPreflightRequest path="/preflight-failure" />
                        }

                        { this.isPreflightSuccessful &&
                            <ServerAllowsPreflightRequest
                                path="/preflight-success"
                                onNext={() => navigate("./server-response")}
                            />
                        }
                    </Router>
                </PageContent>

                <Footer>
                    <ExternalLink href="/">Built by <img src={logo} alt="HTTP Toolkit" /></ExternalLink>
                </Footer>
            </Main>
        </ThemeProvider>;
    }
}

const Exposition = styled.div``;

const Heading = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bold;

    ${media.desktopOrTablet`
        margin-bottom: 1em;
    `}

    ${media.mobile`
        margin-bottom: 0.6em;
    `}
`;

const Explanation = styled.p`
    ${p => p.theme.fontSizeSubheading};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 1em;
    }
`;

const Button = styled.button`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    cursor: pointer;
    padding: 15px 36px;

    border-radius: 4px;

    border: none;

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
    font-weight: bold;

    white-space: normal;
    line-height: normal;

    color: ${p => p.theme.primaryInputColor};
    background-color: ${p => p.theme.primaryInputBackground};

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }

    width: 100%;

    :not(:last-child) {
        margin-bottom: 10px;
    }
`;

const ActionButton = (props) => <Button {...props} type="button" />;

const SubmitButton = (props) => <Button {...props} type="submit" />;

const Question = styled.form.attrs((props) => ({
    onSubmit: (e) => {
        e.preventDefault();

        if (e.target.checkValidity()) {
            props.$onNext();
        }
    }
}))`
    ${p => p.theme.fontSizeHeading};

    &:invalid {
        button[type=submit] {
            cursor: default;
            background-color: ${p => p.theme.containerWatermark};

            &:hover {
                background-image: initial;
            }
        }
    }
`;

const QuestionText = styled.h2`
    width: 100%;
    ${p => p.theme.fontSizeHeading};
    line-height: 1.1;
    margin-bottom: 1em;
`;

const QuestionNotes = styled.p`
    margin-top: 1em;
    ${p => p.theme.fontSizeText};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 1em;
    }
`;

const focusRef = (elem) => {
    if (!elem) return;
    // Needs to be deferred, due to details of @reach/router behaviour
    requestAnimationFrame(() => elem.focus());
};

const TextInput = styled((props) =>
    <input
        type={props.type || 'text'}
        {...props}
        ref={focusRef}
    />
)`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    padding: 15px;

    width: 100%;

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryInputBackground};
    &:not(:placeholder-shown):not(:focus):invalid {
        border-color: #a22;
    }

    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};

    margin-bottom: 10px;
`

const Checkmark = styled(FontAwesomeIcon).attrs(() => ({
    icon: ['fas', 'check'],
    'aria-label': "All good"
}))`
    display: block;
    margin: 0 auto;
    color: #27bc17;
`;

const Cross = styled(FontAwesomeIcon).attrs(() => ({
    icon: ['far', 'times'],
    'aria-label': "Rejected"
}))`
    display: block;
    margin: 0 auto;
    color: ${p => p.theme.popColor};
`;

const Intro = (props) =>
    <Exposition>
        <Heading>Will it CORS?</Heading>
        <Explanation>
            Cross-Origin Resource Sharing (CORS) is the mechanism browsers use to decide
            how web applications can communicate with other services.
        </Explanation>
        <Explanation>
            Restricting this is important for security, but it can make sending requests
            to external services & APIs difficult and confusing.
        </Explanation>
        <Explanation>
            Tell the CORS-A-Matic what you want to happen, and it'll tell you what to do:
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Get Started
        </ActionButton>
    </Exposition>;

const SourceUrlQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionText>
            What is the URL of the page that wants to send requests?
        </QuestionText>
        <TextInput
            type="url"
            required
            placeholder="http://example.com"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
        <SubmitButton>Next</SubmitButton>
    </Question>;

const TargetUrlQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionText>
            What is the URL you want to send a request to?
        </QuestionText>
        <TextInput
            type="url"
            required
            placeholder="http://example.com"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
        <SubmitButton>Next</SubmitButton>
    </Question>;

const NotCorsResult = (props) =>
    <Exposition>
        <Heading><Checkmark /></Heading>
        <Explanation>
            <strong>You can send your request without worrying about CORS.</strong>
        </Explanation>
        <Explanation>
            The origin of your source and target URLs is the same ({ props.origin }),
            so CORS restrictions don't apply.
        </Explanation>
        <Explanation>
            There may be other (less restrictive) limits on the requests you can send though. Check
            the list of <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name"
            >forbidden headers</ExternalLink> for more info, and try out <Link to="/">HTTP Toolkit</Link> if
            you want to see exactly what's being sent & received in reality.
        </Explanation>
    </Exposition>;

const MixedContentResult = (props) =>
    <Exposition>
        <Heading>
            <Cross />
        </Heading>
        <Explanation>
            This request will fail, because secure origins like {
                props.sourceOrigin
            } cannot make requests to insecure HTTP origins like {
                props.targetOrigin
            }.
        </Explanation>
        <Explanation>
            This is due to <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content"
            >mixed content restrictions</ExternalLink>, and isn't related to CORS.
        </Explanation>
        <Explanation>
            To fix this, you need to connect to { props.targetOrigin } over
            HTTPS instead of HTTP.
        </Explanation>
    </Exposition>

const MethodQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionNotes>
            Your source and target URLs have different origins ({ props.sourceOrigin } and{' '}
            { props.targetOrigin } respectively) so <strong>this is indeed a cross-origin request</strong>.
        </QuestionNotes>
        <QuestionText>
            What <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods"
            >HTTP method</ExternalLink> will your request use?
        </QuestionText>
        <TextInput
            required
            placeholder="GET"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value.toUpperCase())}
        />
        <SubmitButton>Next</SubmitButton>
    </Question>;

const RequestHeadersQuestion = (props) => {
    const [focused, setFocused] = React.useState(false);

    return <Question
        $onNext={props.onNext}
        ref={(elem) => {
            if (!elem || focused) return;

            focusRef(elem.querySelector('input'));
            setFocused(true);
        }}
    >
        <QuestionText>
            Do you want to send any custom <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers"
            >request headers</ExternalLink>?
        </QuestionText>
        <EditableHeaders
            headers={props.value}
            onChange={props.onChange}
        />
        <SubmitButton>
            { props.value.length === 0
                ? "No, skip this"
                : "Next"
            }
        </SubmitButton>
    </Question>
};

const ContentTypeQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionText>
            What <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"
            >content type</ExternalLink> will your POST request use?
        </QuestionText>
        <TextInput
            required
            placeholder="text/plain"
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
        />
        <SubmitButton>Next</SubmitButton>
        <QuestionNotes>
            POSTs sent with application/x-www-form-urlencoded, text/plain or multipart/form-data
            content-type headers are considered <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple requests</ExternalLink>.
        </QuestionNotes>
    </Question>;

const SimpleCorsRequest = (props) =>
    <Exposition>
        <Heading>
            Simple cross-origin request
        </Heading>
        <Explanation>
            This is a <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple cross-origin request</ExternalLink>. For requests like this, the
            browser doesn't need to send a preflight OPTIONS request to the
            server first, so <strong>your request will be sent to the server immediately</strong>.
        </Explanation>
        <Explanation>
            Simple requests are a GET or HEAD requests, or POST requests with
            specific safe content types, that don't use any unsafe cross-origin headers.
        </Explanation>
        <Explanation>
            <strong>However, this doesn't mean you're always allowed to read the response</strong>.
            That depends on the headers the server returns...
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Next
        </ActionButton>
    </Exposition>;

const ServerResponseQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionNotes>
            The browser will send your { props.method } request to { props.targetUrl }, with extra headers
            including an 'Origin' header set to { props.sourceOrigin }, so the server knows that this
            is a CORS request.
        </QuestionNotes>
        <QuestionText>
            What headers will the server return in its response?
        </QuestionText>
        <ActionButton
            onClick={() => props.onChange([
                ['Access-Control-Allow-Origin', props.sourceOrigin]
            ])}
        >
            Give me some working CORS headers
        </ActionButton>
        <EditableHeaders
            headers={props.value}
            onChange={props.onChange}
        />
        <SubmitButton>
            Next
        </SubmitButton>
    </Question>;


const ServerRejectsCorsRequest = () =>
    <Exposition>
        <Heading>
            <Cross />
        </Heading>
        <Explanation>
            The request was sent, but the headers returned by the server don't allow you
            to read the response.
        </Explanation>
        <Explanation>
            In practice, your request will fail with an error, and the browser will print
            an explanation to the console explaining why the server's headers weren't OK.
            You won't be able to examine the response's status code, headers or body.
        </Explanation>
        <Explanation>
            To avoid this and ready the response, you'll need to make the server send the
            correct CORS headers, or use a CORS proxy. If you're actually not interested in
            the response, you can set "mode: no-cors" on your request, to intentionally receive
            an opaque response. This is useful for <ExternalLink
                href="https://stackoverflow.com/a/39109790/68051"
            >a few niche use cases</ExternalLink> in caching & cross-origin resource loading.
        </Explanation>
    </Exposition>;

const ServerAllowsCorsRequest = (props) => {
    const exposedHeaders = getHeaderValues(props.responseHeaders, 'access-control-expose-headers');
    const timingInfo = getHeaderValue(props.responseHeaders, 'timing-allow-origin');

    return <Exposition>
        <Heading>
            <Checkmark />
        </Heading>
        <Explanation>
            <strong>The request was sent, and the server's CORS headers let you read the response</strong>.
        </Explanation>
        <Explanation>
            You'll be able to examine the response's status code, its body, {
                exposedHeaders.length
                    ? <>the explicitly exposed headers ({exposedHeaders.join(', ')}),</>
                    : null
            } and any <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header"
            >CORS-safelisted headers</ExternalLink>.
        </Explanation>
        <Explanation>
            {
                timingInfo === '*' || timingInfo === props.sourceOrigin
                    ? <>
                        You'll also be able to use the <ExternalLink
                            href="https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API"
                        >resource timing API</ExternalLink> to examine the detailed performance of this request.
                    </> : <>
                        You won't however be able to use the <ExternalLink
                            href="https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API"
                        >resource timing API</ExternalLink> to examine the detailed performance of this request,
                        as it doesn't include a matching Timing-Allow-Origin header.
                    </>
            }
        </Explanation>
    </Exposition>;
};

const PrelightRequest = (props) =>
    <Exposition>
        <Heading>
            Preflight required
        </Heading>
        <Explanation>
            This is not a <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple cross-origin request</ExternalLink>, so <strong>the browser will send
            a preflight request</strong> to the server automatically, to check its CORS
            configuration before it sends the real request.
        </Explanation>
        <Explanation>
            Preflight requests use the HTTP OPTIONS method and include Access-Control-Request
            headers to ask the server what kind of CORS requests are allowed. The server's
            response tells the browser whether your main request can be sent.
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Next
        </ActionButton>
    </Exposition>;

const PreflightResponseQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionNotes>
            The browser will send a preflight OPTIONS request to { props.targetUrl } with headers including:
            <ul>
                <li>Origin: { props.sourceOrigin }</li>
                <li>Access-Control-Request-Method: { props.method }</li>
                { props.unsafeHeaders.length
                    ? <li>Access-Control-Request-Headers: { props.unsafeHeaders.join(', ') }</li>
                    : null
                }
            </ul>
        </QuestionNotes>
        <QuestionText>
            What headers will the server return in its response?
        </QuestionText>
        <ActionButton
            onClick={() => props.onChange([
                ['Access-Control-Allow-Origin', props.sourceOrigin],
                ['Access-Control-Allow-Methods', props.method],
                ...(props.unsafeHeaders.length ?
                    [['Access-Control-Allow-Headers', props.unsafeHeaders.join(', ')]]
                : []),
                ['Access-Control-Max-Age', '86400']
            ])}
        >
            Give me some working default headers
        </ActionButton>
        <EditableHeaders
            headers={props.value}
            onChange={props.onChange}
        />
        <SubmitButton>
            Next
        </SubmitButton>
    </Question>;

const ServerRejectsPreflightRequest = () =>
    <Exposition>
        <Heading>
            <Cross />
        </Heading>
        <Explanation>
            The server's response to the preflight request doesn't allow the CORS request
            you want to send, so the browser won't send it.
        </Explanation>
        <Explanation>
            In practice, <strong>your request will fail with a generic error</strong>, and
            the browser will print an explanation to the console explaining why the preflight
            response wasn't OK.
        </Explanation>
        <Explanation>
            To avoid this, you'll need to either make the server send the correct
            preflight headers, or make your request a <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple request</ExternalLink> that doesn't require an initial preflight.
        </Explanation>
    </Exposition>;

const ServerAllowsPreflightRequest = (props) =>
    <Exposition>
        <Heading>
            Preflight request successful
        </Heading>
        <Explanation>
            The server's response to the preflight request says the browser is allowed to
            send CORS requests like this, so <strong>the browser now sends your
            request</strong>.
        </Explanation>
        <Explanation>
            <strong>However, this doesn't mean you can definitely read the response</strong>.
            That depends on the headers the server returns with the final response...
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Next
        </ActionButton>
    </Exposition>;