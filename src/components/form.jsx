import React from 'react';
import { styled, media, css } from '../styles';

export const TextInput = styled.input`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    padding: 15px;

    ${media.desktop`
        width: 435px;
    `}

    ${media.tablet`
        width: calc(30vw + 100px);
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryColor};
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
`;

export const TextArea = styled.textarea`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    padding: 15px;

    ${media.desktop`
        width: 435px;
        min-height: 200px;
    `}

    ${media.tablet`
        width: calc(30vw + 100px);
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryColor};
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
`;

const ButtonStyles = css`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    cursor: pointer;
    padding: 15px 36px;

    border-radius: 4px;

    border: none;

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};

    color: #fff;
    background-color: ${p => p.theme.primaryColor};

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }
`;

export const SubmitInput = styled.input`${ButtonStyles}`;
export const Button = styled.button`${ButtonStyles}`;