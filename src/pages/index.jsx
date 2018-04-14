import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import RotatingText from '../components/rotating-text';
import MailchimpSignupForm from '../components/mailchimp-signup-form';
import { FeaturesBlock, Feature } from '../components/features-block';
import DetailsBlock from '../components/details-block';

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

const DetailsImage = styled.div`
  height: 100%;
  width: 300px;
  background-color: #000;
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
        Inspect exactly what your code sends & receives
      </p>
      <p>
        Visualize, diff & explore HTTP requests & responses
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

  <DetailsBlock>
    <p>
      Intercept things
    </p>
  </DetailsBlock>

  <DetailsBlock>
    <p>
      Edit things
    </p>
  </DetailsBlock>

  <DetailsBlock>
    <p>
      Send things
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
