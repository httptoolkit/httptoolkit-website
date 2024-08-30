import { StyledIntegrationGrid } from './grid.styles';

import { Container } from '@/components/elements/container';
import {
  AndroidLogo,
  DockerLogo,
  ElectronLogo,
  JavaLogo,
  PythonLogo,
  RubyLogo,
  SquareJSLogo,
} from '@/components/elements/icon';
import { IntegrationCard } from '@/components/modules/integration-card';
import { pageRoutes } from '@/lib/constants/routes';

const { ANDROID, PYTHON, JAVASCRIPT, RUBY, JAVA, DOCKER, ELECTRON } = pageRoutes;

const integrationCards = [
  {
    $isPopular: true,
    icon: AndroidLogo,
    title: 'Android',
    text: 'In one click, capture Android traffic from apps and mobile browsers, with automated setup, per-app interception, and certificate injection & unpinning built-in.',
    link: {
      href: ANDROID.href,
    },
  },
  {
    icon: PythonLogo,
    title: 'Python',
    text: 'Open an intercepted terminal in one click, launch any Python server or script, and immediately see and edit all HTTP and HTTPS it sends.',
    link: {
      href: PYTHON.href,
    },
  },
  {
    icon: SquareJSLogo,
    title: 'JavaScript',
    text: 'Launch an intercepted web browser or terminal, open web pages or run servers & scripts with Node.js, and inspect and modify everything that\'s sent or received.',
    link: {
      href: JAVASCRIPT.href,
    },
  },
  {
    icon: RubyLogo,
    title: 'Ruby',
    text: 'Open an intercepted terminal in one click, launch any Ruby server or script, and immediately see and edit all HTTP and HTTPS it sends.',
    link: {
      href: RUBY.href,
    },
  },
  {
    icon: JavaLogo,
    title: 'Java',
    text: 'Attach to existing JVM processes, or open an intercepted terminal in one click to launch them, and instantly capture all HTTP from by Java, Kotlin, or Scala.',
    link: {
      href: JAVA.href,
    },
  },
  {
    icon: DockerLogo,
    title: 'Docker',
    text: 'In one click, attach to existing Docker containers, or open an intercepted terminal and launch some, and effortlessly debug & edit everything they send.',
    link: {
      href: DOCKER.href,
    },
  },
  {
    icon: ElectronLogo,
    title: 'Electron',
    text: 'Pick any Electron app on your computer, launch it, and instantly see and change everything it\'s sending & receiving.',
    link: {
      href: ELECTRON.href,
    },
  },
];

export const IntegrationsGrid = () => {
  return (
    <Container as="section">
      <StyledIntegrationGrid>
        {Array.isArray(integrationCards) &&
          integrationCards.length > 0 &&
          integrationCards.map(card => <IntegrationCard key={card.title} {...card} />)}
      </StyledIntegrationGrid>
    </Container>
  );
};
