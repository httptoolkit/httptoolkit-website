import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import RotatingText from '../components/rotating-text';
import MailchimpSignupForm from '../components/mailchimp-signup-form';
import { FeaturesBlock, Feature } from '../components/features-block';
import DetailsBlock from '../components/details-block';
import RequestStream from '../components/request-stream';

import { siteMetadata } from '../../gatsby-config.js';

const FullWidth = styled.section`
  padding: 0 calc((100vw - ${p => p.theme.pageWidth}) / 2);
  margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth}) / 2);
`;

const HeroBlock = FullWidth.extend`
  padding-top: 120px;
  padding-bottom: 120px;

  color: ${p => p.theme.mainColor};
  background-color: ${p => p.theme.mainBackground};

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  text-align: left;
`;

const TopHeroBlock = HeroBlock.extend`
  padding-bottom: 299px;
`;

const IntroTextContainer = styled.div`
  margin-bottom: 54px;
`;

const PitchHeading = styled.h2`
  margin-top: -12px;
  font-size: 36pt;
  line-height: 1.3;
  font-weight: bold;
  margin-bottom: 18px;
`;

const Subheading = styled.h3`
  line-height: 1.25;
  margin-top: 25px;

  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: ${p => p.theme.subheadingSize};
  color: ${p => p.theme.mainSubtleColor};
`;

const RotatingTextHeading = styled(RotatingText)`
  text-decoration: underline;
  text-decoration-color: rgba(255, 66, 31, 0.2);
  color: #e1421f;
`;

const SignupForm = styled(MailchimpSignupForm)`
  display: flex;
  justify-content: start;
`;

const SignupText = styled.p`
  font-size: ${p => p.theme.textSize};
  color: ${p => p.theme.mainSubtleColor};
`;

const StreamWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: 4px;

  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;

    background: linear-gradient(to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.8) 25%,
      rgba(255, 255, 255, 0.90) 60%
    ), linear-gradient(to top,
      rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 1) 100%
    );
  }

  > div {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
`;

export default () => (<div>
  <TopHeroBlock>
    <IntroTextContainer>
      <PitchHeading>
        Debug, test & change how<br/>
        {' '}
        <RotatingTextHeading>
          <span>your code</span>
          <span>your web app</span>
          <span>your mobile app</span>
          <span>your IoT device</span>
          <span>your backend</span>
        </RotatingTextHeading>
        {' '}
        communicates.
      </PitchHeading>

      <Subheading>
        Open-source & cross-platform<br/>
        HTTP proxy, analyzer and client.
      </Subheading>
    </IntroTextContainer>

    <SignupForm
      autoFocus
      action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b"
      emailTitle={"Enter your email to get early access"}
      hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
      submitText={"Get early access"}
    />
  </TopHeroBlock>

  <FeaturesBlock>
    <Feature>
      <h3>Debug</h3>
      <FontAwesomeIcon icon={['fal', 'search']} size='3x' />
      <p>
        Transparently proxy & intercept HTTP(S) traffic
      </p>
      <p>
        Visualize, diff & inspect HTTP requests & responses
      </p>
      <p>
        Built-in support for Chrome, Android, Docker and more
      </p>
    </Feature>
    <Feature>
      <h3>Test</h3>
      <FontAwesomeIcon icon={['fal', 'stopwatch']} size='3x' />
      <p>
        Edit requests live to mock API or client behaviour
      </p>
      <p>
        Simulate slow connections and HTTP errors
      </p>
      <p>
        Analyze live request performance & security
      </p>
    </Feature>
    <Feature>
      <h3>Change</h3>
      <FontAwesomeIcon icon={['fal', 'wrench']} size='3x' />
      <p>
        Create, edit & save requests for rapid prototyping
      </p>
      <p>
        Export & share ready-to-use requests for curl, fetch
        &amp; more
      </p>
      <p>
        Automate with HTTP Toolkit's{' '}
        <a href="https://github.com/pimterry/mockttp">
          open-source internals
        </a>
      </p>
    </Feature>
  </FeaturesBlock>

  <DetailsBlock direction='right'>
    <StreamWrapper>
      <RequestStream />
    </StreamWrapper>
    <h3>
      Intercept HTTP
    </h3>
    <p>
      See everything that's sent & received at a glance. Understand, remote debug, or reverse engineer any web traffic on your network.
    </p>
    <p>
      Intercept & proxy HTTP traffic from almost anywhere, including HTTPS. Built-in support for debugging Chrome, Android & Docker.
    </p>
    <p>
      Inspect HTTP requests & responses up close, with formatters included for JSON, GraphQL, XML and more.
    </p>
  </DetailsBlock>

  <HeroBlock>
    <PitchHeading>
      Sign up now<br/>to find out more
    </PitchHeading>
    <SignupForm
      action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b"
      emailTitle={"Enter your email to get early access"}
      hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
      submitText={"Get early access"}
    />
  </HeroBlock>
</div>);
