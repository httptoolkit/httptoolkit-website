import React from 'react';
import { styled, media, css } from '../styles';

export const TextInput = styled.input`
    padding: 15px;

    ${media.desktopOrTablet`
        width: 435px;
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid #1f83e0;
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
`;

export const TextArea = styled.textarea`
    padding: 15px;

    ${media.desktopOrTablet`
        width: 435px;
        min-height: 200px;
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid #1f83e0;
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
`;

export const SubmitInput = styled.input`
    cursor: pointer;
    padding: 15px 36px;

    border-radius: 4px;

    border: none;

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};

    color: #fff;
    background-color: #1f83e0;

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }
`;