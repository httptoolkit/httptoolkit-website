import { PageRoute, pageRoutes } from '@/lib/constants/routes';

const {
  ALL_INTEGRATIONS,
  ALTERNATIVES,
  ANDROID,
  BLOG,
  CHARLES,
  CHROME_DEV_TOOLS,
  DOCKER,
  DOCS,
  ELECTRON,
  FIDDLER,
  JAVA,
  JAVASCRIPT,
  PYTHON,
  PRICING,
  RUBY,
  WILL_IT_CORS,
  FRIDA,
  PROD_FOR_LINUX,
  PROD_FOR_MAC_OS,
  PROD_FOR_WINDOW,
} = pageRoutes;

export interface FooterColumn {
  title: string;
  links: PageRoute[];
  displayOn?: Array<'desktop' | 'mobile'>;
  subHeading?: Array<{
    title: string;
    links: PageRoute[];
    displayOn?: Array<'desktop' | 'mobile'>;
  }>;
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [PROD_FOR_MAC_OS, PROD_FOR_WINDOW, PROD_FOR_LINUX, PRICING],
    subHeading: [
      {
        title: 'Projects',
        links: [WILL_IT_CORS, FRIDA],
        displayOn: ['mobile'],
      },
      {
        title: 'Resources',
        links: [BLOG, DOCS],
        displayOn: ['mobile'],
      },
    ],
    displayOn: ['desktop', 'mobile'],
  },
  {
    title: 'Resources',
    links: [BLOG, DOCS],
    subHeading: [
      {
        title: 'Projects',
        links: [WILL_IT_CORS, FRIDA],
        displayOn: ['desktop'],
      },
    ],
    displayOn: ['desktop'],
  },
  {
    title: 'Alternatives',
    links: [ALTERNATIVES, FIDDLER, CHROME_DEV_TOOLS, CHARLES],
    displayOn: ['desktop'],
  },
  {
    title: 'Integrations',
    links: [ANDROID, DOCKER, PYTHON, RUBY, JAVA, ELECTRON, JAVASCRIPT, ALL_INTEGRATIONS],
    subHeading: [
      {
        title: 'Alternatives',
        links: [ALTERNATIVES, FIDDLER, CHROME_DEV_TOOLS, CHARLES],
        displayOn: ['mobile'],
      },
    ],
    displayOn: ['desktop', 'mobile'],
  },
];