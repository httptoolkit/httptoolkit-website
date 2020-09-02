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
      alt={`Discuss & review ${props.name} now on Product Hunt`}
    />
  </a>
)`
  text-align: center;
`;