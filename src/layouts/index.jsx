import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import wordMarkLogo from '../assets/logo-wordmark-dark.png';

import { siteMetadata } from '../../gatsby-config.js';

import Header from '../components/Header';

const Main = styled.main`
  margin: 0 auto;
  width: 1024px;
  font-family: Lato;
`;

const LogoLink = styled((props) => <Link className={props.className} to='/'>
  <img className={props.className} src={wordMarkLogo} alt="HTTP Toolkit" />
</Link>)`
  height: 100%;
  display: flex;
  align-items: center;

  text-decoration: none;
  outline: none;

  img {
    position: relative;
    top: -1px;

    height: 50%;
  }
`;

const TemplateWrapper = ({ children }) => (
  <Main>
    <Helmet>
      <title>{siteMetadata.title}</title>
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Lato|Rubik+Mono+One' />
      <style>{`
        * {
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #fafafa;
          overflow-x: hidden;
        }
      `}</style>
    </Helmet>
    <Header>
      <LogoLink/>
    </Header>

    {children()}
  </Main>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;