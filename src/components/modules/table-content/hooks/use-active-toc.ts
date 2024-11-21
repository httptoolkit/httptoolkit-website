import { useEffect } from 'react';

import { screens } from '@/styles';

const getHeadings = () =>
  document.querySelectorAll<HTMLElement>('article :is(h2,h3,h4), div#intro');

function useActiveToc() {
  useEffect(() => {
    const isBigScreen = matchMedia(`(min-width: ${screens.xl})`);

    const updateActiveHeading = (
      container: HTMLElement,
      headingElem: HTMLElement
    ) => {
      // Remove active class from all toc items
      container.querySelectorAll('a')
        .forEach(e => e.classList.remove('active'));

      // Add active to the correct toc
      headingElem.classList.add('active');

      if (isBigScreen.matches) {
        const elementTop = headingElem.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollOffset = elementTop - (containerHeight / 2);

        container.scroll({
          top: scrollOffset,
          behavior: 'smooth'
        });
      }
    }

    const updateFromIntersection: IntersectionObserverCallback = entries => {
      const scrollContainer = document
        .querySelector('#table-of-content-headings')
        ?.parentElement;
      if (!scrollContainer) return;

      for (const entry of entries) {
        const { id } = entry.target as HTMLElement;
        const tocHeadingEl = scrollContainer.querySelector<HTMLElement>(`a[href="#${id}"]`);

        if (tocHeadingEl && entry.isIntersecting) {
          updateActiveHeading(scrollContainer, tocHeadingEl);
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: '0px 0px -50%',
      threshold: 1,
    };

    const headingObserver = new IntersectionObserver(updateFromIntersection, observerOptions);

    getHeadings().forEach(heading => headingObserver.observe(heading));

    return () => {
      getHeadings().forEach(heading => headingObserver.unobserve(heading));
    };
  }, []);
}

export default useActiveToc;
