import { useEffect } from 'react';

import { screens } from '@/styles';

const getHeadings = () =>
  document.querySelectorAll<HTMLElement>('article :is(h2,h3,h4), div#intro');

function useActiveToc() {
  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = entries => {
      const scrollContainer = document
        .querySelector('#table-of-content-headings')
        ?.parentElement;
      if (!scrollContainer) return;

      for (const entry of entries) {
        const { id } = entry.target as HTMLElement;
        const isMobile = matchMedia(`(max-width: ${screens.lg})`);

        const tocHeadingEl = scrollContainer.querySelector<HTMLElement>(`a[href="#${id}"]`);
        if (!tocHeadingEl) return;

        if (entry.isIntersecting) {
          // Remove active class from all toc items
          scrollContainer.querySelectorAll('a')
            .forEach(e => e.classList.remove('active'));

          // Add active to the correct toc
          tocHeadingEl.classList.add('active');

          if (!isMobile.matches) {
            const elementTop = tocHeadingEl.offsetTop;
            const containerHeight = scrollContainer.clientHeight;
            const scrollOffset = elementTop - (containerHeight / 2);

            scrollContainer.scroll({
              top: scrollOffset,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: '0px 0px -66%',
      threshold: 1,
    };

    const headingObserver = new IntersectionObserver(setCurrent, observerOptions);

    getHeadings().forEach(heading => headingObserver.observe(heading));

    return () => {
      getHeadings().forEach(heading => headingObserver.unobserve(heading));
    };
  }, []);
}

export default useActiveToc;
