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
  
  background-color: #222;
  color: #fff;
  font-size: 24pt;

  box-sizing: border-box;
  text-align: center;
`;

const RotatingTextHeading = styled(RotatingText)`
  text-decoration: underline;
  text-decoration-color: rgba(255, 66, 31, 0.3);
  color: #e1421f;
`;

const SignupForm = styled(MailchimpSignupForm)`
  margin-top: 80px;
`;

const HighlightsBlock = styled.section`
  margin: -40px -20px 40px;
  padding: 40px 20px;

  display: flex;
  flex-direction: row;

  background-color: #fff;
  color: #000;

  border: 1px solid #444;
  border-radius: 3px;
  box-shadow: 0 0 40px -15px #222;
`;

const Highlight = styled.div`
  flex: 1;
  margin: 0 20px;

  > h3 {
    margin-bottom: 20px;
  }
`;

const DetailsBlock = styled.div`
  margin: 40px 20px;
`;
const Detail = styled.div``;

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

  <HighlightsBlock>
    <Highlight>
      <h3>Intercept & understand HTTP</h3>
      <p>
        <strong>Transparently proxy HTTP(S)</strong> to see
        what your code is sending, examine the details
        up close with powerful interpreters for <strong>JSON, GraphQL
        and more</strong>, and audit <strong>security & performance</strong> concerns.
      </p>
    </Highlight>
    <Highlight>
      <h3>Send & edit requests</h3>
      <p>
        <strong>Create requests</strong> from scratch, rerun intercepted
        requests with your own changes, quickly prototype and <strong>edit HTTP
        inflight</strong> to change requests, responses and simulate
        errors live.
      </p>
    </Highlight>
    <Highlight>
      <h3>Free, open-source & cross-platform</h3>
      <p>
        HTTP Toolkit works on <strong>Windows, Linux and OSX</strong>,
        it's <a href="https://github.com/pimterry/http-toolkit">
        completely open-source</a>, and it's built on{' '}
        <a href="github.com/pimterry/mockttp">standalone libraries</a> you
        can <strong>integrate in your own JS code</strong>.
      </p>
    </Highlight>
  </HighlightsBlock>

  <DetailsBlock>
    <Detail>
      <h3>Intercept HTTP(S)</h3>
      <p>
        HTTP Toolkit lets you transparently intecept connections, either
        unencrypted or with automatic certificate generation,
      </p>
      <p>
        Once you've intercepted some requests, examine them in depth with
        support for formats including JSON & XML, and protocols including REST,
        GraphQL and OData. Pause requests in place, change the request or response
        content (or fake your own response entirely), or export them elsewhere as
        HAR files or CURL scripts for further analysis and experimentation.
      </p>
      <p>
        Support for intercepting anything that supports HTTP proxies (plus many things
        that don't, with forced traffic redirection). Built in tools to automatically
        intercept Chrome, Firefox, Docker container traffic, and more.
      </p>
      <h5>Answer important questions quickly:</h5>
      <ul>
        <li>Why is my request failing?</li>
        <li>What data is this app sharing, and to who?</li>
        <li>If this API returns different data, what does the client do?</li>
        <li>If this request times out completely, can my code cope?</li>
      </ul>
    </Detail>
  </DetailsBlock>

  <DetailsBlock>
    <Detail>
      <h3>Debug HTTP Requests</h3>
      <p>
        Sometimes failures can be difficult to analyze. HTTP Toolkit lets you examine
        your traffic to see exactly what's truly happening, explore why requests are
        failing, and quickly test your fixes.
      </p>
      <p>
        Not sure why a request succeeds in one place but not another? Intercept both,
        and directly diff the traffic to compare HTTP requests and see where things are
        going wrong.
      </p>
      <p>
        Think you know why your request fails? Intercept it, tweak what's being sent,
        and see if it works instantly, without having to update and redeploy your code.
      </p>
    </Detail>
  </DetailsBlock>

  <DetailsBlock>
    <Detail>
      <h3>Build with HTTP</h3>
      <p>
        Quickly prototype HTTP client code with fake responses that can perfectly
        simulate real API servers, edit them live, and export to ExpressJS routes
        as soon as you're done (more formats to come).
      </p>
      <p>
        Quickly prototype or explore APIs by making requests directly, checking the
        responses and iterating fast, and exporting to CURL, Fetch and more when you're
        done.
      </p>
    </Detail>
  </DetailsBlock>
</div>);
