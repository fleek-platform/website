import { useEffect } from 'react';

type ScrollAndAnchorLinksProps = {
  containerSelector: string;
  headerTags?: string[];
  sectionOffset?: number;
};

export default function ScrollAndAnchorLinks({
  containerSelector,
  headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  sectionOffset = 140,
}: ScrollAndAnchorLinksProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    console.log('AnchorLinks running');
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.warn(`Container "${containerSelector}" not found.`);
      return;
    }

    const headers = container.querySelectorAll(headerTags.join(','));
    headers.forEach((header) => {
      const htmlHeader = header as HTMLElement;

      if (htmlHeader.querySelector('a')) return;

      const slug = htmlHeader.innerText
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');

      if (!htmlHeader.id) htmlHeader.id = slug;

      const anchor = document.createElement('a');
      anchor.href = `#${slug}`;
      anchor.innerText = '#';
      anchor.className =
        'ml-2 text-gray-500 opacity-0 transition-opacity hover:text-gray-700 focus:text-gray-700 pl-4';

      htmlHeader.classList.add('relative', 'hover:cursor-pointer');
      htmlHeader.appendChild(anchor);

      htmlHeader.addEventListener('mouseover', () =>
        anchor.classList.add('opacity-100'),
      );
      htmlHeader.addEventListener('mouseout', () =>
        anchor.classList.remove('opacity-100'),
      );

      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const fullUrl = `${window.location.origin}${window.location.pathname}#${slug}`;
        navigator.clipboard.writeText(fullUrl);
        window.history.pushState({}, '', `#${slug}`);

        const topPosition =
          htmlHeader.getBoundingClientRect().top +
          window.scrollY -
          sectionOffset;
        window.scrollTo({ top: topPosition });
      });
    });

    const fragment = window.location.hash.slice(1);
    if (fragment) {
      const targetElement = document.getElementById(fragment);
      if (targetElement) {
        const topPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          sectionOffset;

        window.scrollTo({
          top: topPosition,
        });
      }
    }

    const handleResize = () => {
      const fragment = window.location.hash.slice(1);
      if (fragment) {
        const targetElement = document.getElementById(fragment);
        if (targetElement) {
          const topPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            sectionOffset;

          window.scrollTo({
            top: topPosition,
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerSelector, headerTags, sectionOffset]);

  return null;
}
