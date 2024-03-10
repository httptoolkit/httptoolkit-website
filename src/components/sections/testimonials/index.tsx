import Marquee from 'react-fast-marquee';

import { TestimonialsCard } from './testimonials-card';
import { StyledTestimonialGrid, StyledTestimonialsWrapper } from './testimonials.styles';

import { Heart } from '@/components/elements/icon';
import { HeadingBlock } from '@/components/modules/heading-block';
import { allTestimonials } from '@/content/data/testimonials';
import { getGithubDownloadStats } from '@/lib/services/get-github-download-stats';

export const Testimonials = async () => {
  const userDownloads = await getGithubDownloadStats();
  const testimonalsData = allTestimonials.concat(allTestimonials);
  const testimonialsChunkedData = Array.from({ length: Math.ceil(testimonalsData.length / 3) }, (_, index) =>
    testimonalsData.slice(index * 3, index * 3 + 3),
  );

  return (
    <StyledTestimonialsWrapper>
      <HeadingBlock
        badgeVariant="primary"
        badgeTitle="TESTIMONIALS"
        badgeIcon={Heart}
        title={`Join ~*${userDownloads.toLocaleString()}*~ developers`}
        $align="center"
      />

      <Marquee>
        <StyledTestimonialGrid>
          {testimonialsChunkedData.map((testimonialChunk, rowIndex) => (
            <div key={rowIndex}>
              {testimonialChunk.map((testimonial, colIndex) => {
                return (
                  <TestimonialsCard
                    key={colIndex}
                    quote={testimonial?.quote}
                    type={testimonial?.type}
                    sourceLink={testimonial.sourceLink}
                    sourceLinkText={testimonial.sourceLinkText}
                    sourceName={testimonial.sourceName}
                  />
                );
              })}
            </div>
          ))}
        </StyledTestimonialGrid>
      </Marquee>
    </StyledTestimonialsWrapper>
  );
};
