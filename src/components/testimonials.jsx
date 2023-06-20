import * as _ from 'lodash';
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import * as interleaving from 'interleaving';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import REDDIT_TESTIMONIALS from '../data/reddit-testimonials.json';
import ARTICLE_QUOTES from '../data/article-testimonials.json';
import TWEETS from '../data/tweet-testimonials.json';

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
        }
    `));

    const downloadTotal = Math.floor(data.allGhDownloadStat.edges[0].node.value / 1000) * 1000;

    const tweets = TWEETS.map((tweet) => ({
        type: "tweet",
        image: <FontAwesomeIcon color="#1DA1F2" size='2x' icon={['fab', 'twitter']} />,
        sourceName: formatContent(tweet.name),
        sourceLink: `https://twitter.com/i/web/status/${tweet.id}`,
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

const buildTweetText = (tweet) => {
    let content = [tweet.text];

    // Remove lines of only hashtags
    content = replaceInJsxArray(content, /^(?:#\S+\s*)+$/m, '');

    return content;
}

const HIGHLIGHT_STRINGS = [
    "you should definitely be adding HTTP Toolkit to your developer toolbox!",
    "I switched from AdvancedRestCient and mitmproxy to HTTP Toolkit and my life has just changed",
    "Less than 5 minutes to make my Ubuntu intercept https traffic from my smartphone.",
    "a must-have for every single developer tool box",
    "Works like a charm!",
    "nice looking and intuitive",
    "the tool working best out of the box",
    "#@!%*€& amazing",
    "Great code in HTTP toolkit",
    "You made my day with httptoolkit.tech",
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
    "confirmed by HTTP Toolkit (which is ace BTW!)",
    "Super simple to setup, and just works",
    "Excellent open-source HTTP debugging!",
    "Very impressed with it, good UI and the automatic certificate setup with emulator is great",
    "Editing requests on the go without doing any extra work is just amazing.",
    "super helpful",
    "Saved me a lot of time, a very neat tool",
    "I love @pimterry's HTTP Toolkit so damn much",
    "I'm just stunned, fantastic work",
    "today I found an awesome tool #HttpToolkit",
    "I like HTTP Toolkit's integration with @OpenApiSpec",
    "Acabo de descubrir HTTP Toolkit y me flipa",
    "Y además es de código abierto",
    "I use HTTP Toolkit, it's really nice",
    "love how you can intercept an individual browser window",
    "Recently I came across this amazing tool named HTTPtoolkit",
    "one of the best development tools I've seen in a while",
    "No need to mess with proxy settings or self-signed certificates",
    "Works like a charm",
    "HTTP Toolkit's Github is so delightful",
    "Must have tool",
    "I highly recommend HTTP Toolkit",
    "really good experience with Http Toolkit",
    "QA loves it for Android",
    "You made my day with httptoolkit.com",
    "I have no idea how I built web apps before HTTP Toolkit",
    "amazing tool named HTTP Toolkit for reverse engineering one of my Android App"
];

const formatContent = (...content) => {
    // Strip emoji
    content = replaceInJsxArray(content, /\p{Extended_Pictographic}|\p{Emoji_Presentation}/ug, '');

    // Flatten leading indentation
    content = replaceInJsxArray(content, /^ +/gm, ' ');

    // Create line breaks
    content = replaceInJsxArray(content, '\n', (i) => <br key={i} />);

    // Update URL references
    content = replaceInJsxArray(content, /https:\/\/httptoolkit\.tech/gi, 'httptoolkit.com');

    // Update product direct references
    content = replaceInJsxArray(content, /@httptoolkit/gi, 'HTTP Toolkit');
    content = replaceInJsxArray(content, /#?Httptoolkit /gi, 'HTTP Toolkit ');

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