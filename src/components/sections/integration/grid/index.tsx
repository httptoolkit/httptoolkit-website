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

const integrationCards = [
  {
    $isPopular: true,
    icon: AndroidLogo,
    title: 'Android',
    text: 'Android integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/android',
    },
  },
  {
    icon: PythonLogo,
    title: 'Python',
    text: 'Python integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/python',
    },
  },
  {
    icon: SquareJSLogo,
    title: 'Javascript',
    text: 'Javascript integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/javascript',
    },
  },
  {
    icon: RubyLogo,
    title: 'Ruby',
    text: 'Ruby integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/ruby',
    },
  },
  {
    icon: JavaLogo,
    title: 'Java',
    text: 'Java integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/java',
    },
  },
  {
    icon: DockerLogo,
    title: 'Docker',
    text: 'Docker integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/docker',
    },
  },
  {
    icon: ElectronLogo,
    title: 'Electron',
    text: 'Electron integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices.',
    link: {
      href: '/integrations/electron',
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
