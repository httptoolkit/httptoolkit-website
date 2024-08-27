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
    text: 'Android integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: ANDROID.href,
    },
  },
  {
    icon: PythonLogo,
    title: 'Python',
    text: 'Python integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: PYTHON.href,
    },
  },
  {
    icon: SquareJSLogo,
    title: 'JavaScript',
    text: 'JavaScript integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: JAVASCRIPT.href,
    },
  },
  {
    icon: RubyLogo,
    title: 'Ruby',
    text: 'Ruby integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: RUBY.href,
    },
  },
  {
    icon: JavaLogo,
    title: 'Java',
    text: 'Java integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: JAVA.href,
    },
  },
  {
    icon: DockerLogo,
    title: 'Docker',
    text: 'Docker integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: DOCKER.href,
    },
  },
  {
    icon: ElectronLogo,
    title: 'Electron',
    text: 'Electron integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
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
