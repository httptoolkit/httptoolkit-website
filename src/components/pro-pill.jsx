import { Link } from 'gatsby';
import { styled } from '../styles';

export const ProPill = styled(Link).attrs({
    children: 'Pro',
    to: '/get-pro'
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
    text-decoration: none;
    font-weight: bold;

    color: ${p => p.theme.popColor};
    background-color: rgba(255, 255, 255, 0.9);
`;