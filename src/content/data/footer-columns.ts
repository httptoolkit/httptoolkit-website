import { pageRoutes } from '@/lib/constants/routes';

const {
  ALL_INTEGRATIONS,
  ANDROID,
  BLOG,
  CHARLES,
  CHROME_DEV_TOOLS,
  DOCKER,
  DOCS,
  ELECTRON,
  FAQ,
  FIDDLER,
  JAVA,
  JAVASCRIPT,
  PYTHON,
  PRICING,
  RUBY,
  WILL_IT_CORS,
  PROD_FOR_LINUX,
  PROD_FOR_MAC_OS,
  PROD_FOR_WINDOW,
} = pageRoutes;

export const footerColumns = [
  {
    title: 'Product',
    links: [PROD_FOR_MAC_OS, PROD_FOR_WINDOW, PROD_FOR_LINUX, , PRICING],
    subHeading: [
      {
        title: 'Projects',
        links: [WILL_IT_CORS],
        displayOn: ['mobile'],
      },
      {
        title: 'Resources',
        links: [BLOG, DOCS, FAQ],
        displayOn: ['mobile'],
      },
    ],
    displayOn: ['desktop', 'mobile'],
  },
  {
    title: 'Resources',
    links: [BLOG, DOCS, FAQ],
    subHeading: [
      {
        title: 'Projects',
        links: [WILL_IT_CORS],
        displayOn: ['desktop'],
      },
    ],
    displayOn: ['desktop'],
  },
  {
    title: 'Alternatives',
    links: [FIDDLER, CHROME_DEV_TOOLS, CHARLES],
    displayOn: ['desktop'],
  },
  {
    title: 'Integrations',
    links: [ANDROID, DOCKER, PYTHON, RUBY, JAVA, ELECTRON, JAVASCRIPT, ALL_INTEGRATIONS],
    subHeading: [
      {
        title: 'Alternatives',
        links: [FIDDLER, CHROME_DEV_TOOLS, CHARLES],
        displayOn: ['mobile'],
      },
    ],
    displayOn: ['desktop', 'mobile'],
  },
];

export type FooterColumn = (typeof footerColumns)[number];
