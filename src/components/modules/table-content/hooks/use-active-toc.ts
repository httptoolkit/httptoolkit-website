import { useEffect } from 'react';

function useActiveToc() {
  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = entries => {
      for (const entry of entries) {
        const { id } = entry.target as HTMLElement;
        const tocHeadingEl = document.querySelector(`#table-of-content-headings a[href="#${id}"]`);
        if (!tocHeadingEl) return;

        if (entry.isIntersecting) {
          // Remove active class from all toc items
          document.querySelectorAll('#table-of-content-headings a').forEach(e => e.classList.remove('active'));
          tocHeadingEl.classList.add('active');
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: '0px 0px -66%',
      threshold: 1,
    };

    const headingObserver = new IntersectionObserver(setCurrent, observerOptions);

    document
      .querySelectorAll<HTMLElement>('article :is(h2,h3,h4), div#intro')
      .forEach(heading => headingObserver.observe(heading));

    const scrollMatchingElement = document.querySelector('[data-match-scroll]');
    const htmlElement = document.querySelector('html');

    function scrollMatch() {
      if (!scrollMatchingElement || !htmlElement) return;

      const scrollPercentage = ((window.scrollY || window.pageYOffset) + window.innerHeight) / htmlElement.scrollHeight;

      const containerFactor = scrollMatchingElement.scrollHeight - scrollMatchingElement.clientHeight;
      console.log(scrollPercentage);
      if (scrollPercentage < 0.15) {
        return (scrollMatchingElement.scrollTop = 0);
      }
      scrollMatchingElement.scrollTop = scrollPercentage * containerFactor;
    }

    window.addEventListener('scroll', scrollMatch);

    return () => {
      document
        .querySelectorAll<HTMLElement>('article :is(h2,h3,h4), div#intro')
        .forEach(heading => headingObserver.unobserve(heading));
      window.removeEventListener('scroll', scrollMatch);
    };
  }, []);
}

export default useActiveToc;
