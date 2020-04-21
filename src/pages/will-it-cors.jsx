
import React from 'react';
import Helmet from 'react-helmet';
import { Router } from "@reach/router"

import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

import "prismjs/themes/prism-tomorrow.css";
import logo from '../images/logo.svg';

import { styled, ThemeProvider, media, getGlobalStyles, theme } from '../styles';
import {
    ExternalLink,
    getHeaderValue,
    getHeaderValues,
    setHeader,
    getOrigin
} from '../components/will-it-cors/common';
import { Breadcrumbs } from '../components/will-it-cors/breadcrumbs';
import {
    Intro,
    SourceUrlQuestion,
    TargetUrlQuestion,
    NotCorsResult,
    MixedContentResult,
    MethodQuestion,
    RequestHeadersQuestion,
    ContentTypeQuestion,
    SimpleCorsRequest,
    ServerResponseQuestion,
    ServerRejectsCorsRequest,
    ServerAllowsCorsRequest,
    PreflightRequest,
    PreflightResponseQuestion,
    ServerRejectsPreflightRequest,
    ServerAllowsPreflightRequest,
} from '../components/will-it-cors/cors-steps';

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
        margin: 40px 0 0 0;
        max-width: 60%;
    `}

    ${media.mobile`
        margin: 10px;
    `}
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
        return getHeaderValue(this.requestHeaders, 'Content-Type');
    }

    @computed get isCorsRequest() {
        if (!this.sourceOrigin || !this.targetOrigin) return undefined;
        return this.sourceOrigin !== this.targetOrigin;
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
                    <Router basepath="/will-it-cors"><Breadcrumbs path="/*" /></Router>

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
                            onChange={(newValue) => setHeader(this.requestHeaders, 'Content-Type', newValue)}
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
                                    navigate("./request-success");
                                } else {
                                    navigate("./request-failure");
                                }
                            }}
                        />

                        { this.isServerResponseReadable &&
                            <ServerAllowsCorsRequest
                                path="/request-success"
                                sourceOrigin={this.sourceOrigin}
                                responseHeaders={this.serverResponseHeaders}
                            />
                        }

                        { this.isServerResponseReadable === false &&
                            <ServerRejectsCorsRequest
                                path="/request-failure"
                            />
                        }

                        { !this.isSimpleCorsRequest &&
                            <PreflightRequest
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

