import { styled } from '../styles';

export const ProPill = styled.span.attrs({
    children: 'Pro'
})`
    display: inline-block;
    border-radius: 4px;
    padding: 4px 8px;

    margin: 0 8px 0 0;
    * + & {
        margin-left: 8px;
    }
    & + & {
        margin-left: 0;
    }

    text-align: center;
    text-transform: uppercase;
    font-weight: bold;

    color: #e1421f;
    background-color: rgba(225,66,31,0.3);
`;