import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import RotatingText from '../components/rotating-text';
import MailchimpSignupForm from '../components/mailchimp-signup-form';

import { siteMetadata } from '../../gatsby-config.js';

const PAGE_WIDTH = '1024px';

const HeroBlock = styled.section`
  width: 100vw;
  padding: 120px calc((100vw - ${PAGE_WIDTH}) / 2) 120px;
  margin: 0 calc(-1 * (100vw - ${PAGE_WIDTH}) / 2);

  font-size: 24pt;
  color: #333;

  box-sizing: border-box;
  text-align: center;

  > h2 {
    line-height: 1.3;
  }
`;

const RotatingTextHeading = styled(RotatingText)`
  text-decoration: underline;
  text-decoration-color: rgba(255, 66, 31, 0.2);
  color: #e1421f;
`;

const SignupForm = styled(MailchimpSignupForm)`
  display: flex;
  justify-content: center;

  margin-top: 80px;
`;

export default () => (<div>
  <HeroBlock>
    <h2>
      HTTP proxy, analyzer & client,<br/>
      to debug, test & change how<br/>
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
    </h2>
        
    <SignupForm
      action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b"
      emailTitle={"Enter your email to get early access"}
      hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
      submitText={"Get early access"}
    />
  </HeroBlock>


</div>);
