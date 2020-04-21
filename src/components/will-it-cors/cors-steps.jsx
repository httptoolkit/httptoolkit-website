import React from 'react';
import { Link } from 'gatsby';

import { styled, media } from '../../styles';
import { EditableHeaders } from '../editable-headers';
import {
    ExternalLink,
    Checkmark,
    Cross,
    getHeaderValue,
    getHeaderValues,
    setHeader,
    deleteHeader
} from './common';

export const Intro = (props) =>
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
            >forbidden headers</ExternalLink> for more info, and try out <Link to="/">HTTP Toolkit</Link> if
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
            >mixed content restrictions</ExternalLink>, and isn't related to CORS.
        </Explanation>
        <Explanation>
            To fix this, you need to connect to { props.targetOrigin } over
            HTTPS instead of HTTP.
        </Explanation>
    </Exposition>

export const MethodQuestion = (props) =>
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

export const RequestHeadersQuestion = (props) => {
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

export const ContentTypeQuestion = (props) =>
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

export const SimpleCorsRequest = (props) =>
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

export const ServerResponseQuestion = (props) =>
    <Question $onNext={props.onNext}>
        <QuestionNotes>
            The browser will send your { props.method } request to { props.targetUrl }, with extra headers
            including an 'Origin' header set to { props.sourceOrigin }, so the server knows that this
            is a CORS request.
        </QuestionNotes>
        <QuestionText>
            What headers will the server return in its response?
        </QuestionText>
        <Checkbox
            value={props.isServerResponseReadable}
            onChange={(e) => {
                if (e.target.checked) {
                    setHeader(props.value, 'Access-Control-Allow-Origin', props.sourceOrigin);
                } else {
                    deleteHeader(props.value, 'Access-Control-Allow-Origin');
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
                    setHeader(props.value, 'Access-Control-Expose-Headers', "HeaderA, HeaderB");
                } else {
                    deleteHeader(props.value, 'Access-Control-Expose-Headers');
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
                } else {
                    deleteHeader(props.value, 'Timing-Allow-Origin');
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
    </Question>;


export const ServerRejectsCorsRequest = () =>
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

export const ServerAllowsCorsRequest = (props) => {
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

export const PreflightRequest = (props) =>
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

export const PreflightResponseQuestion = (props) => {
    const preflightHeaders = props.value;
    const cacheDuration = parseInt(getHeaderValue(preflightHeaders, 'access-control-max-age'), 10);

    return <Question $onNext={props.onNext}>
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
                } else {
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Origin');
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Methods');
                    deleteHeader(preflightHeaders, 'Access-Control-Allow-Headers');
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
};

export const ServerRejectsPreflightRequest = () =>
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

const Heading = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bold;

    ${media.desktopOrTablet`
        margin-bottom: 1em;
    `}

    ${media.mobile`
        margin-bottom: 0.6em;
    `}

    svg {
        display: block;
        margin: 0 auto;
    }
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

    input {
        zoom: 2;
        margin-right: 10px;
    }
`;