import * as React from 'react';
import { styled, media } from '../styles';

export const ProductHuntWidget = styled((props) =>
  <a
    href={props.postUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={props.className}
  >
    <img
      src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${props.postId}&theme=dark`}
      alt="Discuss & review HTTP Toolkit now on Product Hunt"
      style={{ height: '46px' }}
    />
  </a>
)`
  text-align: center;

  ${media.mobile`
    order: 100; // Push to the end of the list
    width: 100%;
    margin: 0;
    padding: 20px 10px;
    background-color: ${p => p.theme.popBackground};
    border-bottom: 1px solid ${p => p.theme.containerBackground};
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
  `}
`;