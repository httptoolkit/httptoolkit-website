import 'server-only';

import ARTICLE_QUOTES from './article-testimonials.json';
import REDDIT_TESTIMONIALS from './reddit-testimonials.json';
import TWEETS from './tweet-testimonials.json';
import { sanitizeContent, sanitizeTweet } from './utils';

import type { TestimonialsCardProps } from '@/components/common-sections/testimonials/components/testimonials-card';
import { shuffleArray } from '@/lib/utils';

const formattedTweets = TWEETS.map(
  (tweet): TestimonialsCardProps => ({
    type: 'twitterX',
    sourceName: sanitizeContent(tweet.name),
    sourceLink: tweet.archiveUrl ?? `https://twitter.com/i/web/status/${tweet.id}`,
    sourceLinkText: 'on Twitter',
    quote: sanitizeContent(sanitizeTweet(tweet.quote)),
  }),
);

const formattedArticles = ARTICLE_QUOTES.map(
  (articleData): TestimonialsCardProps => ({
    type: 'article',
    sourceName: articleData.source,
    sourceLink: articleData.link,
    sourceLinkText: articleData.description,
    quote: sanitizeContent(articleData.quote),
  }),
);

const formattedRedditComments = REDDIT_TESTIMONIALS.map(
  (comment): TestimonialsCardProps => ({
    type: 'reddit',
    sourceName: comment.source[0].toUpperCase() + comment.source.slice(1),
    sourceLink: comment.link,
    sourceLinkText: 'on Reddit',
    quote: sanitizeContent(comment.quote),
  }),
);

const allTestimonialsMerged = [...formattedArticles, ...formattedRedditComments, ...formattedTweets];
export const allTestimonials = shuffleArray(allTestimonialsMerged);
export const testimonialsCount = allTestimonialsMerged.length;
