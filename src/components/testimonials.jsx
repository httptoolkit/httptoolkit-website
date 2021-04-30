import * as _ from 'lodash';
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import * as interleaving from 'interleaving';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, media } from '../styles';
import { FeatureTitle } from './feature';

const ScrollContainer = styled.div`
    ${media.desktop`
        margin-left: calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
    `}

    width: 100vw;

    overflow: hidden;

    padding: 60px 0;
    margin-top: -60px;
    margin-bottom: -30px;
`;

const TestimonialsBlock = styled.section`
    width: max-content;

    transform: translate3d(0, 0, 0);

    animation: scrollSlideshow 120s linear infinite;

    /* Little bit of transition to make the pause/resume sliiightly smoother */
    position: relative;
    left: 0;
    transition: left 0.2s ease-out;

    ${media.desktop`
        &:hover {
            animation-play-state: paused;
            left: -5px;
        }
    `}

    ${media.mobileOrTablet`
        &:active {
            animation-play-state: paused;
            left: -5px;
        }
    `}

    @keyframes scrollSlideshow {
        100% {
            -webkit-transform: translateX(-50%);
        }
    }
`;

const REDDIT_TESTIMONIALS = [
    {
        "link": "https://www.reddit.com/r/javascript/comments/fh0e38/intercept_debug_rewrite_all_https_from_any/fk9idvz/",
        "source": "ElijahLynn",
        "quote": `
            I've been using this for the past year and it is amazing!
            ...
            HTTP toolkit is a must-have for every single developer tool box.
        `.trim()
    },
    {
        "link": "https://www.reddit.com/r/androiddev/comments/himokx/http_toolkit_for_android_inspect_mock_debug_https/fwh452o/",
        "source": "mahmozilla",
        "quote": "Dude your tool is #@!%*€& amazing thank you so much!"
    },
    {
        "link": "https://www.reddit.com/r/androiddev/comments/himokx/http_toolkit_for_android_inspect_mock_debug_https/fynnlex/",
        "source": "catalinghita8",
        "quote": "Awesome tool! Really makes your life easier than having to intercept with Charles."
    },
    {
        "link": "https://www.reddit.com/r/androiddev/comments/himokx/http_toolkit_for_android_inspect_mock_debug_https/fwlp0ie/",
        "source": "aestran",
        "quote": "Amazing tool! Super simple to setup, and just works."
    },
    {
        "link": "https://www.reddit.com/r/androiddev/comments/himokx/http_toolkit_for_android_inspect_mock_debug_https/fwl4kzz/",
        "source": "postal_card",
        "quote": `
            Your tool is way better than Charles
            ...
            Editing requests on the go without doing any extra work is just amazing.
        `.trim()
    }
];

const ARTICLE_QUOTES = [
    {
        "link": "https://blog.logrocket.com/debug-encrypted-network-traffic-react-native/",
        "source": "Logrocket",
        "articleName": "How to debug encrypted network traffic in React Native",
        "quote": "HTTP Toolkit is a nice looking and intuitive tool to intercept, view, and debug "+
            "HTTP(S) endpoints..." +
            "\n\n"+
            "During the preparation of this article, HTTP Toolkit has been the tool working best out of "+
            "the box — no configuration was necessary."
    },
    {
        "link": "https://geekflare.com/http-client-tools/",
        "source": "Geekflare",
        "articleName": "HTTP Client and Web Debugging Proxy to Troubleshoot Applications",
        "quote": "HTTP Toolkit provides automatically targeted interception for specific clients, " +
            "including HTTPS setup, rather than intercepting everything from your entire computer, " +
            "and so avoids capturing irrelevant traffic or disrupting other applications."
    },
    {
        "link": "https://blog.bearer.sh/api-debugging-tools/",
        "source": "Bearer.sh",
        "articleName": "Top Tools to Make Debugging APIs Easier",
        "quote": "Where I had trouble getting Fiddler to recognize calls made from my terminal, " +
            "HTTP Toolkit just worked immediately.",
    },
    {
        "link": "https://nordicapis.com/top-25-api-testing-tools/",
        "source": "Nordic APIs",
        "articleName": "Top 25+ API Testing Tools",
        "quote": "...super helpful for debugging, testing, and quick API prototyping"
    }
];

export const Testimonials = () => {
    const data = (useStaticQuery(graphql`
        query {
            allGhDownloadStat {
                edges {
                    node {
                        value
                    }
                }
            }
            allTwitterStatusesLookupTestimonials {
                edges {
                    node {
                        id_str
                        full_text
                        created_at
                        entities {
                            user_mentions {
                                screen_name
                            }
                            urls {
                                url
                                expanded_url
                                display_url
                            }
                        }
                        user {
                            profile_image_url_https
                            name
                            screen_name
                        }
                        extended_entities {
                            media {
                                media_url_https
                                url
                            }
                        }
                    }
                }
            }
        }
    `))

    const downloadTotal = Math.floor(data.allGhDownloadStat.edges[0].node.value / 1000) * 1000;

    const tweets = data.allTwitterStatusesLookupTestimonials.edges.map(e => e.node).map((tweet) => ({
        type: "tweet",
        image: <img src={tweet.user.profile_image_url_https} />,
        sourceName: formatContent(tweet.user.name),
        sourceLink: `https://twitter.com/i/web/status/${tweet.id_str}`,
        sourceLinkText: "on Twitter",
        quote: formatContent(...buildTweetText(tweet))
    }));

    const articles = ARTICLE_QUOTES.map((articleData) => ({
        type: "article",
        image: <FontAwesomeIcon size='2x' icon={['far', 'newspaper']} />,
        sourceName: articleData.source,
        sourceLink: articleData.link,
        sourceLinkText: articleData.articleName,
        quote: formatContent(articleData.quote)
    }));

    const redditComments = REDDIT_TESTIMONIALS.map((comment) => ({
        type: "reddit",
        image: <FontAwesomeIcon color="#FF4301" size='3x' icon={['fab', 'reddit']} />,
        sourceName: comment.source[0].toUpperCase() + comment.source.slice(1),
        sourceLink: comment.link,
        sourceLinkText: "on Reddit",
        quote: formatContent(comment.quote)
    }));

    const content = interleaving.justify(tweets, redditComments, articles);

    return <>
        <TestimonialsHeadline>Join {downloadTotal.toLocaleString()} happy developers:</TestimonialsHeadline>
        <ScrollContainer>
            <TestimonialsBlock>
                {/* We double up content to get infinite scrolling */}
                { content.concat(content).map((testimonial, i) => {
                    // Duplicate content should be aria-hidden:
                    const ariaHidden = i >= content.length;

                    return <Testimonial
                        key={i}
                        aria-hidden={ariaHidden ? 'true' : 'false'}
                        cite={testimonial.sourceLink}
                    >
                        <ContentBlock>
                            { testimonial.quote }
                        </ContentBlock>
                        <SourceBlock>
                            <SourceImage>{ testimonial.image }</SourceImage>
                            <cite>
                                <SourceName>{ testimonial.sourceName }</SourceName>
                                <SourceLink href={testimonial.sourceLink} tabIndex={ariaHidden ? -1 : 0}>
                                    { testimonial.sourceLinkText }
                                </SourceLink>
                            </cite>
                        </SourceBlock>
                    </Testimonial>
}) }
            </TestimonialsBlock>
        </ScrollContainer>
    </>;
}

const replaceInJsxArray = (elemArray, match, replacement) => {
    let i = elemArray.length;
    const getReplacement  = typeof replacement === 'string'
        ? () => replacement
        : () => replacement(i++);

    const result = _.flatMap(elemArray, (elem) => {
        if (!elem) return [];
        if (!elem.split) return [elem];

        // Split, removing the matching string parts
        const splitElem = elem.split(match);

        // Alternate values: existing element/replacement/element/replacement/element
        let result = _.flatten(
            _.zip(splitElem, _.times(splitElem.length - 1, getReplacement))
        ).filter(v => !!v);

        // Flatten back to a single string, if possible
        if (result.every(p => typeof p === 'string')) result = result.join('');

        return result;
    });

    // Trim whitespace, while it's easy to do so.
    return (result.length === 1 && typeof result[0] === 'string')
        ? [result[0].trim()]
        : result;
};

const MANUAL_URL_OVERRIDES = { "buff.ly/2mGoIKR": "httptoolkit.tech" };

const buildTweetText = (tweet) => {
    let content = [tweet.full_text];

    // Replace t.co with real URLs throughout
    tweet.entities.urls.forEach((url) => {
        const realUrl = MANUAL_URL_OVERRIDES[url.display_url] || url.display_url;
        content = replaceInJsxArray(content, url.url, realUrl);
    });

    // Remove trailing Twitter URLs (i.e. retweeted content references)
    content = replaceInJsxArray(content, /\s+twitter.com\/\S+$/, '');

    // Remove lines of only hashtags
    content = replaceInJsxArray(content, /^(?:#\S+\s*)+$/m, '');

    // Drop image URL placeholders entirely - they're not contributing here.
    (tweet.extended_entities || { media: [] }).media.forEach((media) => {
        content = replaceInJsxArray(content, media.url, '');
    });


    return content;
}

const HIGHLIGHT_STRINGS = [
    "you should definitely be adding HTTP Toolkit to your developer toolbox!",
    "I switched from AdvancedRestCient and mitmproxy to @HttpToolkit and my life has just changed",
    "Less than 5 minutes to make my Ubuntu intercept https traffic from my smartphone.",
    "a must-have for every single developer tool box",
    "un proxy pour analyser les requêtes en temps réel open source au design trop beau",
    "Quite handy a tool, I have to say",
    "Works like a charm!",
    "nice looking and intuitive",
    "the tool working best out of the box",
    "#@!%*€& amazing",
    "Great code in HTTP toolkit",
    "You made my day with httptoolkit.tech",
    "HTTPToolkit is pretty sweet",
    "Very handy and neatly done",
    "one of the most useful debugging tools EVER!",
    "just submitted a software request to my company!",
    "always impressed at the thought that went into it",
    "Awesome tool!",
    "what an awesome tool!!",
    "amazed how it just worked to trace HTTP from any Terminal.app sub-process!",
    "automatically targeted interception",
    "HTTP Toolkit just worked immediately",
    "avoids capturing irrelevant traffic or disrupting other applications",
    "I really like your tool",
    "Great tool for debugging and mocking HTTP requests",
    "confirmed by @HttpToolkit (which is ace BTW!)",
    "Super simple to setup, and just works",
    "Excellent open-source HTTP debugging!",
    "Very impressed with it, good UI and the automatic certificate setup with emulator is great",
    "Editing requests on the go without doing any extra work is just amazing.",
    "super helpful"
];

const formatContent = (...content) => {
    // Strip emoji
    content = replaceInJsxArray(content, /\s*\p{Extended_Pictographic}/ug, '');

    // Flatten leading indentation
    content = replaceInJsxArray(content, /^ +/gm, ' ');

    // Create line breaks
    content = replaceInJsxArray(content, '\n', (i) => <br key={i} />);

    // Highlight all the best bits
    for (let highlightString of HIGHLIGHT_STRINGS) {
        content = replaceInJsxArray(content, highlightString, (i) => <strong key={i}>{ highlightString }</strong>);
    }

    return content;
}

const TestimonialsHeadline = styled(FeatureTitle)`
    text-align: center;
`;

const Testimonial = styled.blockquote`
    flex-shrink: 1;
    flex-grow: 0;

    position: relative;

    border-radius: 4px;
    border: 1px solid #ccd6dd;
    background-color: #f5f8fa;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

    padding: 20px;
    margin: 0 10px;
    flex: 1 0 calc(min(360px, 90vw));

    max-width: 320px;

    display: inline-flex;
    vertical-align: middle;
    flex-direction: column;

    cursor: default;

    ${media.desktop`
        &:hover {
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
            transform: scale(1.2);
            z-index: 1;
        }
    `}

    ${media.mobileOrTablet`
        &:active {
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
            transform: scale(1.2);
            z-index: 1;
        }
    `}

    &::before {
        content: '”';
        position: absolute;
        bottom: -230px;
        right: 1px;
        font-size: 300pt;
        font-family: Lato;
        z-index: 0;
        opacity: 0.05;
    }
`;

const SourceBlock = styled.footer`
    ${p => p.theme.fontSizeTinyText};
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-top: 20px;
`;

const SourceImage = styled.div`
    float: left;
    margin-right: 12px;

    height: 48px;
    width: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    > svg, > img {
        border-radius: 50%;
    }
`;

const SourceName = styled.div`
    ${p => p.theme.fontSizeText};
    font-weight: bold;
`;

const SourceLink = styled.a.attrs((p) => ({
    rel: 'author',
    target: '_blank',
    rel: 'noopener noreferrer'
}))`
    display: block;
    margin-top: 5px;
    opacity: 0.7;
`;

const ContentBlock = styled.p`
    ${p => p.theme.fontSizeText};
    line-height: 1.3;
    z-index: 1;

    > strong {
        font-weight: bold;
        color: ${p => p.theme.popColor};
    }

    > img {
        max-width: 100%;
        margin-top: 10px;
    }
`;