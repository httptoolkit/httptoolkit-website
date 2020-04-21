import * as _ from 'lodash';

import { styled } from '../../styles';

export function getOrigin(url) {
    return new URL(url).origin;
}

export function getHeaderPair(headers, key) {
    return _.find(headers, ([headerKey]) => headerKey.toLowerCase() === key.toLowerCase());
}

export function getHeaderValue(headers, key) {
    return (getHeaderPair(headers, key) || [])[1];
}

export function getHeaderValues(headers, key, separator = ', ') {
    return (getHeaderValue(headers, key) || '').split(separator).filter(v => !!v);
}

export function setHeader(headers, key, value) {
    const headerPair = getHeaderPair(headers, key);
    if (headerPair) {
        headerPair[1] = value;
    } else {
        headers.unshift([key, value]);
    }
}

export const ExternalLink = styled.a.attrs(() => ({
    target: '_blank',
    rel: "noopener noreferrer"
}))`
    color: ${p => p.theme.primaryInputBackground};
`;