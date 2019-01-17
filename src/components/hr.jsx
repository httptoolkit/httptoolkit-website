import { styled, media } from '../styles';

export const Hr = styled.hr`
    height: 1px;
    width: 100%;

    border: 1px solid ${p => p.theme.containerBorder};
`;