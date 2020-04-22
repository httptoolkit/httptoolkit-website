import React from 'react';

import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PrismJS from 'prismjs';

import { styled, media } from '../../styles';
import { EditableHeaders } from '../editable-headers';
import {
    ExternalLink,
    InternalLink,
    Checkmark,
    Cross,
    getHeaderValue,
    getHeaderValues,
    setHeader,
    deleteHeader,
    someHeaderValues,
    joinAnd
} from './common';

export const Intro = (props) =>
    <IntroContainer>
        <IntroHeading>Will it CORS?</IntroHeading>
        <Explanation>
            Cross-Origin Resource Sharing (CORS) is how browsers decide
            how web applications can communicate with other services.
        </Explanation>
        <Explanation>
            Restricting this is important for security, but it's hard to
            understand how CORS works, which means sending HTTP requests
            to APIs can be difficult & confusing.
        </Explanation>
        <Explanation>
            Tell this magic CORS machine what you want, and it'll tell you
            exactly what to do:
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Get Started
        </ActionButton>
    </IntroContainer>;

export const SourceUrlQuestion = (props) =>
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

export const TargetUrlQuestion = (props) =>
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

export const NotCorsResult = (props) =>
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
            >forbidden headers</ExternalLink> for more info, and try out <InternalLink to="/">
                HTTP Toolkit
            </InternalLink> if
            you want to see exactly what's being sent & received in reality.
        </Explanation>
    </Exposition>;

export const MixedContentResult = (props) =>
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
            >mixed content restrictions</ExternalLink> that ensure HTTPS pages can only
            use secure content, and isn't related to CORS.
        </Explanation>
        <Explanation>
            To fix this, you should connect to { props.targetOrigin } over
            HTTPS instead of using plain HTTP.
        </Explanation>
    </Exposition>

export const MethodQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <Sidenote>
            Your source and target URLs have different origins ({ props.sourceOrigin } and{' '}
            { props.targetOrigin } respectively) so <strong>this is indeed a cross-origin request</strong>.
        </Sidenote>
        <QuestionText>
            What <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods"
            >HTTP method</ExternalLink> will your request use?
        </QuestionText>
        <TextInput
            required
            placeholder="GET"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value.toUpperCase().trim())}
        />
        <SubmitButton>Next</SubmitButton>
    </Question>;

export const RequestExtrasQuestion = (props) => {
    const [showHeaders, setShowHeaders] = React.useState(!_.isEmpty(props.headers));

    return <Question
        $onNext={props.onNext}
    >
        <QuestionText>
            Do you want send or read any other data?
        </QuestionText>
        <Checkbox
            value={props.sendCredentials}
            onChange={(e) => props.onSendCredentials(e.target.checked)}
        >
            Send built-in browser credentials, like cookies or client certificates, with this request?
        </Checkbox>
        <Checkbox
            value={props.useStreaming}
            onChange={(e) => props.onUseStreaming(e.target.checked)}
        >
            Incrementally stream the request or response, or monitor their progress?
        </Checkbox>
        <Checkbox
            value={showHeaders}
            onChange={(e) => {
                const shouldShowHeaders = e.target.checked;
                setShowHeaders(shouldShowHeaders);
                if (!shouldShowHeaders) {
                    props.onChangeHeaders([]);
                }
            }}
        >
            Send custom request headers?
        </Checkbox>
        { showHeaders && <EditableHeaders
            autoFocus
            headers={props.headers}
            onChange={props.onChangeHeaders}
            onlyClientHeaders={true}
        /> }
        <SubmitButton>
            { props.headers.length === 0 && !props.sendCredentials && !props.useStreaming
                ? "No, skip this"
                : "Next"
            }
        </SubmitButton>
    </Question>
};

export const ContentTypeQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionText>
            What <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"
            >content type</ExternalLink> will your POST request use?
        </QuestionText>
        <TextInput
            placeholder="text/plain"
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
        />
        <SubmitButton>Next</SubmitButton>
        <Sidenote>
            Only POSTs sent with application/x-www-form-urlencoded, text/plain or multipart/form-data
            content-type headers are considered <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple requests</ExternalLink>.
        </Sidenote>
    </Question>;

export const SimpleCorsRequest = (props) =>
    <Exposition>
        <Heading>
            Simple cross-origin request
            <GoodHeadingIcon icon={['far', 'shipping-fast']} />
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
            specific safe content types, that don't use any unsafe cross-origin headers or
            streaming.
        </Explanation>
        <Explanation>
            <strong>However, this doesn't mean you're always allowed to read the response</strong>.
            That depends on the headers the server returns...
        </Explanation>
        <ActionButton onClick={props.onNext}>
            Next
        </ActionButton>
    </Exposition>;

export const ServerResponseQuestion = observer((props) =>
    <Question $onNext={props.onNext}>
        <Sidenote>
            The browser will include an Origin header set to { props.sourceOrigin } with your request,
            so the server knows that this is a CORS request, and knows the specific page origin.
        </Sidenote>
        <QuestionText>
            What headers will the server return in its response?
        </QuestionText>
        <Checkbox
            value={props.isServerResponseReadable}
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(props.value, 'Access-Control-Allow-Origin', props.sourceOrigin);
                    if (props.sendCredentials) {
                        setHeader(props.value, 'Access-Control-Allow-Credentials', 'true');
                    }
                    setHeader(props.value, 'Vary', 'origin');
                } else {
                    deleteHeader(props.value, 'Access-Control-Allow-Origin');
                    deleteHeader(props.value, 'Access-Control-Allow-Credentials');

                    // If there's now no headers that depend on the origin, drop the Vary
                    if (
                        getHeaderValue(props.value, 'vary') === 'origin' &&
                        !someHeaderValues(props.value, (value) => value === props.sourceOrigin)
                    ) {
                        deleteHeader(props.value, 'Vary');
                    }
                }
                props.onChange(props.value);
            }}
        >
            Allow the page to read this response
        </Checkbox>
        <Checkbox
            value={getHeaderValue(props.value, 'Access-Control-Expose-Headers') !== undefined}
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(props.value, 'Access-Control-Expose-Headers', 'MyCustomHeader');
                    setHeader(props.value, 'MyCustomHeader', '');
                } else {
                    deleteHeader(props.value, 'Access-Control-Expose-Headers');
                    deleteHeader(props.value, 'MyCustomHeader');
                }
                props.onChange(props.value);
            }}
        >
            Allow the page to read custom headers from the response
        </Checkbox>
        <Checkbox
            value={
                getHeaderValue(props.value, 'timing-allow-origin') === '*' ||
                getHeaderValues(props.value, 'timing-allow-origin').includes(props.sourceOrigin)
            }
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(props.value, 'Timing-Allow-Origin', props.sourceOrigin);
                    setHeader(props.value, 'Vary', 'origin');
                } else {
                    deleteHeader(props.value, 'Timing-Allow-Origin');

                    // If there's now no headers that depend on the origin, drop the Vary
                    if (
                        getHeaderValue(props.value, 'vary') === 'origin' &&
                        !someHeaderValues(props.value, (value) => value === props.sourceOrigin)
                    ) {
                        deleteHeader(props.value, 'Vary');
                    }
                }
                props.onChange(props.value);
            }}
        >
            Allow the page to read the timing data for this response
        </Checkbox>
        <EditableHeaders
            headers={props.value}
            onChange={props.onChange}
        />
        <SubmitButton>
            Next
        </SubmitButton>
    </Question>
);

export const ServerRejectsCorsRequest = (props) => {
    const allowedOrigin = getHeaderValue(props.serverResponseHeaders, 'access-control-allow-origin');
    const allowCredentials = getHeaderValue(props.serverResponseHeaders, 'access-control-allow-credentials');

    const missingHeaders = [
        allowedOrigin === undefined && 'Access-Control-Allow-Origin',
        props.sendCredentials && allowCredentials === undefined && 'Access-Control-Allow-Credentials',
    ].filter(h => !!h);

    const failureReasons = [
        missingHeaders.length > 0 && `
            the ${
                joinAnd(missingHeaders)
            } ${
                missingHeaders.length > 1 ? 'headers were' : 'header was'
            } required but missing`,
        props.sendCredentials && allowCredentials && allowCredentials !== 'true' && `
            credentials were sent, but the Access-Control-Allow-Credentials header was
            '${ allowCredentials }' instead of 'true'`,
        allowedOrigin && allowedOrigin !== props.sourceOrigin && (
            allowedOrigin !== '*' || props.sendCredentials
        ) && `
            the Access-Control-Allow-Origin header was '${ allowedOrigin }' instead of
            '${ props.sourceOrigin }'${
                props.sendCredentials && allowedOrigin === '*'
                    ? " (* doesn't match all origins when you send credentials)"
                    : ""
            }`
    ].filter(r => !!r);

    return <Exposition>
        <Heading>
            <Cross />
        </Heading>
        <Explanation>
            <strong>The request was sent, but the headers returned by the server don't allow you
            to read the response.</strong>
        </Explanation>
        <Explanation>
            In practice, your request will fail with an error, and the browser will print
            an explanation to the console explaining why the server's headers weren't OK.
            You won't be able to examine the response's status code, headers or body.
        </Explanation>
        <Explanation>
            This failed because { joinAnd(failureReasons) }.
        </Explanation>
        <Explanation>
            To avoid this and ready the response, you'll need to make the server send the
            correct CORS headers, or use a CORS proxy.
        </Explanation>
        <Explanation>
            If you're actually not interested in the response,
            you can set "mode: no-cors" on your request, to intentionally receive
            an opaque response. This is useful for <ExternalLink
                href="https://stackoverflow.com/a/39109790/68051"
            >a few niche use cases</ExternalLink> in caching & cross-origin resource loading.
        </Explanation>
    </Exposition>
};

export const ServerAllowsCorsRequest = (props) => {
    const exposedHeadersHeader = getHeaderValues(props.responseHeaders, 'access-control-expose-headers');
    const timingInfo = getHeaderValue(props.responseHeaders, 'timing-allow-origin');

    const corsSafelistedHeaders = <>
        and all <ExternalLink
            href="https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header"
        >CORS-safelisted headers</ExternalLink>
    </>;

    const hasHeaderWildcard = exposedHeadersHeader.includes("*");
    const explicitlyAllowedHeaders = exposedHeadersHeader.filter(h => h !== '*');

    const credsWithWildcardWarning = hasHeaderWildcard && props.sendCredentials
        ? " (* doesn't match all headers if you send credentials)"
        : "";
    const exposedHeaders = hasHeaderWildcard && !props.sendCredentials
        ? "and all received headers"
            : explicitlyAllowedHeaders.length
        ? <>the explicitly exposed headers ({ joinAnd(explicitlyAllowedHeaders) }) {corsSafelistedHeaders}</>
        : corsSafelistedHeaders;

    const varyOnOrigin = getHeaderValues(props.responseHeaders, 'vary').some(v => v.toLowerCase() === 'origin') ||
        getHeaderValue(props.responseHeaders, 'vary') === '*';

    const uselessSetCookie = getHeaderValue(props.responseHeaders, 'set-cookie') !== undefined &&
        !props.sendCredentials;

    return <Exposition>
        <Heading>
            <Checkmark />
        </Heading>
        <Explanation>
            <strong>The request was sent, and the server's CORS headers let you read the response</strong>.
        </Explanation>
        <Explanation>
            You'll be able to examine the response's status code, its body, { exposedHeaders }{ credsWithWildcardWarning }.
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
        {
            uselessSetCookie &&
                <Explanation>
                    <Warning>This response sets a cookie that won't be used</Warning>. Set-Cookie headers in
                    responses are ignored, unless the initial request includes browser credentials.
                </Explanation>
        }
        {
            !varyOnOrigin &&
            someHeaderValues(props.responseHeaders, (v) => v.toLowerCase() === props.sourceOrigin) &&
                <Explanation>
                    <Warning>This result may be cached incorrectly</Warning>. Your response headers reference the page
                    origin from the request, but they don't include 'Origin' in a <ExternalLink
                        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary"
                    >Vary header</ExternalLink>. This response might be cached and then used by a CORS request from
                    a different origin, where it will unexpectedly fail.
                </Explanation>
        }
        <ActionButton onClick={props.onNext}>
            Show me the code
        </ActionButton>
        <Sidenote>
            Want to see & test this for real? Give <ExternalLink href="/">
                HTTP Toolkit
            </ExternalLink> a whirl.
        </Sidenote>
    </Exposition>;
};

export const ShowCode = (props) => {
    React.useEffect(() => {
        PrismJS.highlightAll()
     });

    return <Exposition>
        <CodeBlock>{ props.code.trim() }</CodeBlock>
    </Exposition>;
};

export const PreflightRequest = (props) =>
    <Exposition>
        <Heading>
            Preflight required
            <WarningHeadingIcon icon={['far', 'paper-plane']} />
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

export const PreflightResponseQuestion = observer((props) => {
    const preflightHeaders = props.value;
    const cacheDuration = parseInt(getHeaderValue(preflightHeaders, 'access-control-max-age'), 10);

    return <Question $onNext={props.onNext}>
        <Sidenote>
            The browser will send an OPTIONS request to { props.targetUrl }, with { joinAnd([
                `an Origin header (${ props.sourceOrigin })`,
                `an Access-Control-Request-Method header (${ props.method })`
            ].concat(
                props.unsafeHeaders.length ? [`an Access-Control-Request-Headers header (${ props.unsafeHeaders.join(', ') })`] : []
            )) }.

        </Sidenote>
        <QuestionText>
            What headers will the server return in its response?
        </QuestionText>
        <Checkbox
            value={props.isPreflightSuccessful}
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(preflightHeaders, 'Access-Control-Allow-Origin', props.sourceOrigin);
                    setHeader(preflightHeaders, 'Access-Control-Allow-Methods', props.method);
                    if (props.unsafeHeaders.length) {
                        setHeader(preflightHeaders, 'Access-Control-Allow-Headers', props.unsafeHeaders.join(', '));
                    }
                    if (props.sendCredentials) {
                        setHeader(preflightHeaders, 'Access-Control-Allow-Credentials', 'true');
                    }
                } else {
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Origin');
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Methods');
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Headers');
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Credentials');
                }
                props.onChange(preflightHeaders);
            }}
        >
            Allow this request
        </Checkbox>
        <Checkbox
            value={cacheDuration > 0}
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(preflightHeaders, 'Access-Control-Max-Age', '86400');
                } else {
                    deleteHeader(preflightHeaders, 'Access-Control-Max-Age');
                }
                props.onChange(preflightHeaders);
            }}
        >
            Cache this result, to speed up future preflight checks
        </Checkbox>
        <EditableHeaders
            headers={props.value}
            onChange={props.onChange}
        />
        <SubmitButton>
            Next
        </SubmitButton>
    </Question>
});

export const ServerRejectsPreflightRequest = (props) => {
    const preflightHeaders = props.preflightResponseHeaders;

    const incorrectHeaders = [
        !props.originAllowed && 'Origin',
        !props.methodAllowed && 'Methods',
        !props.headersAllowed && 'Headers',
        !props.credentialsAllowed && 'Credentials'
    ].filter(v => !!v);

    const [missingHeaders, incompleteHeaders] = _.partition(incorrectHeaders, h =>
        !getHeaderValue(preflightHeaders, `Access-Control-Allow-${h}`)
    );

    const invalidWildcards = props.sendCredentials ? [
        !props.originAllowed &&
            getHeaderValue(preflightHeaders, 'Access-Control-Allow-Origin') === '*' &&
            'Origin',
        !props.methodAllowed &&
            getHeaderValues(preflightHeaders, 'Access-Control-Allow-Methods').includes('*') &&
            'Methods',
        !props.headersAllowed &&
            getHeaderValues(preflightHeaders, 'Access-Control-Allow-Headers').includes('*') &&
            'Headers',
    ].filter(h => !!h) : [];

    // Authorization must be included explicitly - * is never sufficient.
    const allowedHeaders = getHeaderValues(preflightHeaders, 'access-control-allow-headers')
        .map(h => h.toLowerCase());
    const wildcardWithAuthorization = !props.sendCredentials && // Irrelevant if * is invalid anyway
        props.unsafeHeaders.map(h => h.toLowerCase()).includes('authorization') &&
        !allowedHeaders.includes('authorization') &&
        allowedHeaders.includes('*');

    return <Exposition>
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
            This failed because {joinAnd([
                missingHeaders.length &&
                    `the ${
                        joinAnd(missingHeaders.map(h => `Access-Control-Allow-${h}`))
                    } header${
                        missingHeaders.length > 1 ? 's are' : ' is'
                    } required but missing`,
                ...incompleteHeaders.map((incompleteHeader) =>
                    `the Access-Control-Allow-${incompleteHeader} header (${
                        getHeaderValue(preflightHeaders, `Access-Control-Allow-${incompleteHeader}`)
                    }) ${
                        incompleteHeader === 'Origin'
                            ? `does not match the request origin (${props.sourceOrigin})`
                        : incompleteHeader === 'Methods'
                            ? `does not include the request method (${props.method})`
                        : incompleteHeader === 'Headers'
                            ? `does not match all unsafe headers (${joinAnd(props.unsafeHeaders)})`
                        : // Credentials
                            `is not 'true' and the request would include credentials`
                    }`
                )
            ].filter(v => !!v))}.
        </Explanation>
        {
            wildcardWithAuthorization &&
                <Explanation>
                    <strong>
                        Note that the * wildcard for Access-Control-Allow-Headers never
                        matches Authorization headers
                    </strong>. The Authorization header needs to be listed explicitly.
                </Explanation>
        }
        {
            invalidWildcards.length > 0 &&
                <Explanation>
                    <strong>
                        Remember that the {
                            joinAnd(invalidWildcards.map(h => `Access-Control-Allow-${h}`))
                        } {
                            invalidWildcards.length > 1 ? 'headers ignore' : 'header ignores'
                        } * wildcards when credentials are enabled.
                    </strong>
                </Explanation>
        }
        <Explanation>
            To avoid this, you'll need to either make the server send the correct
            preflight headers, or make your request a <ExternalLink
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests"
            >simple request</ExternalLink> that doesn't require an initial preflight.
        </Explanation>
    </Exposition>
};

export const ServerAllowsPreflightRequest = (props) =>
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

const Exposition = styled.div``;

const IntroContainer = styled(Exposition)`
    ${media.desktop`
        margin-top: 4vh;
    `}
`;

const Heading = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bold;
    text-align: center;

    ${media.desktopOrTablet`
        margin-bottom: 40px;
    `}

    ${media.mobile`
        margin-bottom: 20px;
    `}

    svg {
        display: block;
        margin: 0 auto;
    }
`;

const IntroHeading = styled(Heading)`
    ${media.desktop`font-size: 160px;`}
    ${media.tablet`font-size: 100px;`}
    ${media.mobile`font-size: calc(70px + 5vw);`}
`;

const HeadingIcon = styled(FontAwesomeIcon)`
    && {
        display: block;
        margin-top: 20px;
    }
`;

const WarningHeadingIcon = styled(HeadingIcon)`
    color: ${p => p.theme.popColor};
`;

const GoodHeadingIcon = styled(HeadingIcon)`
    color: #27bc17;
`;

const Explanation = styled.p`
    ${p => p.theme.fontSizeSubheading};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 1em;
    }
`;

const Button = styled.button`
    display: block;

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
    margin-bottom: 10px;
`;

const Sidenote = styled.p`
    margin-top: 1em;
    ${p => p.theme.fontSizeText};
    font-style: italic;
    opacity: 0.8;

    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 1em;
    }
`;

const Warning = styled.strong`
    color: ${p => p.theme.popColor};
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

    padding: 10px;

    width: 100%;

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryInputBackground};
    &:not(:placeholder-shown):not(:focus):invalid {
        border-color: #a22;
    }

    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeText};

    margin-bottom: 10px;
`

const Checkbox = styled((props) =>
    <label className={props.className}>
        <input type='checkbox' checked={props.value} onChange={props.onChange} />
        { props.children }
    </label>
)`
    display: flex;
    align-items: center;

    cursor: pointer;

    ${p => p.theme.fontSizeSubheading};
    line-height: 1.3;

    user-select: none;

    input {
        zoom: 2;
        margin-right: 10px;
    }

    margin: 10px 0;
`;

const CodeBlock = styled((props) =>
    <pre className={props.className}>
        <code className="language-js">{props.children}</code>
    </pre>
)`
    && {
        margin: 0 -20px;
    }

    > code {
        display: block;
    }

    .comment {
        white-space: pre-wrap;
    }
`;