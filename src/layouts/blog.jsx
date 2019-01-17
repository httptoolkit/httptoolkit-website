import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const Main = styled.main`
  padding: 0 1rem;
`

const TemplateWrapper = ({children, location}) => (
  <Main>
    <Helmet
      title='Blog blog blog'
      link={[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Lato:700i'
        }
      ]}
    />
    {children()}
  </Main>
);

export default TemplateWrapper
