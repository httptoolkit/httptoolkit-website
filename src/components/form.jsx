import { Link } from 'gatsby';
import { styled, media, css } from '../styles';

export const TextInput = styled.input`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    padding: 15px;

    ${media.desktop`
        width: 435px;
        max-width: 100%;
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryInputBackground};
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
        max-width: 100%;
        min-height: 200px;
    `}

    ${media.mobile`
        width: 100%;
    `}

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryInputBackground};
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
    white-space: normal;
    line-height: normal;

    color: ${p => p.theme.primaryInputColor};
    background-color: ${p => p.theme.primaryInputBackground};

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }
`;

export const SubmitInput = styled.input.attrs({
    type: 'submit'
})`${ButtonStyles}`;
export const Button = styled.button`${ButtonStyles}`;
export const ButtonLink = styled(Link)`
    ${ButtonStyles}
    text-decoration: none;
    display: inline-block;
`;

export const ButtonExternalLink = styled.a`
    ${ButtonStyles}
    text-decoration: none;
    display: inline-block;
`;

export const LinkButton = styled.button`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 0;

    font-family: Lato;
    font-size: inherit;
    font-style: inherit;
    text-decoration: underline;
`;