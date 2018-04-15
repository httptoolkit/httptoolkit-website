import React from 'react';
import styled from 'styled-components';

export default styled.section`
    height: 360px;
    width: 100%;
    margin: 60px 0;

    background-color: ${p => p.theme.popBackground};
    color: ${p => p.theme.popColor};
    font-size: ${p => p.theme.textSize};
    
    border-radius: 4px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);

    text-align: ${p => p.direction};
    position: relative;

    > :not(:first-child) {
        z-index: 1;
        position: relative;
        float: ${p => p.direction};
        clear: both;
        width: 560px;
    }

    > h3 {
        margin: 33px 30px 26px;

        font-size: ${p => p.theme.subheadingSize};
        color: ${p => p.theme.popColor};

        font-weight: bolder;
        text-transform: uppercase;
    }

    p {
        text-align: left;
        margin: 0 30px 29px;
        font-size: ${p => p.theme.textSize};
        color: ${p => p.theme.mainColor};
        line-height: 1.45;
    }
`;