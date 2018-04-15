import React from 'react';
import styled from 'styled-components';

export const FeaturesBlock = styled.div`
  display: flex;
  justify-content: space-between;

  margin: -180px 0 60px;

  > :first-child {
    margin-left: 0;
  }

  > :last-child {
    margin-right: 0;
  }
`;

export const Feature = styled.section`
  flex: 1;
  margin: 0 8px;
  height: 360px;

  padding: 0;
  background-color: ${p => p.theme.popBackground};
  
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

  position: relative;

  > h3 {
    padding: 33px 30px 0;
    font-size: ${p => p.theme.subheadingSize};
    color: ${p => p.theme.popColor};

    border-radius: 4px 4px 0 0;
    
    font-weight: bolder;
    text-transform: uppercase;
  }

  > svg {
    position: absolute;
    top: 21px;
    right: 21px;
    color: ${p => p.theme.containerBackground};
  }

  > p {
    font-size: ${p => p.theme.textSize};
    line-height: 1.45;

    margin: 30px 30px;

    color: ${p => p.theme.mainColor};
  }
`;