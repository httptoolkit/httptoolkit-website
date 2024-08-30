import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TestimonialsGrid = dynamic(() => import('./components/testimonials').then(mod => mod.TestimonialsGrid));

export const Testimonials = () => {
  return (
    <Suspense fallback={null}>
      <TestimonialsGrid />
    </Suspense>
  );
};
