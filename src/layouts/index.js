import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { siteMetadata } from '../../gatsby-config.js';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = styled.main`
  padding: 0 1rem;
`;

const TemplateWrapper = ({ children }) => (
  <Main>
    <Helmet
      title={siteMetadata.title}
      link={[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Lato|Poppins:700i'
        }
      ]}
    />
    <Header>
      <h1><Link to='/'>HTTP Toolkit</Link></h1>
      <h2>{ siteMetadata.description }</h2>
    </Header>

    {children()}

    <Footer>
      <p>Made by <a href='https://twitter.com/pimterry' target='_blank'>@pimterry</a></p>
    </Footer>
  </Main>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;