import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

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

export function getHeaderValues(headers, key, separator = ',') {
    return (getHeaderValue(headers, key) || '').split(separator).map(v => v.trim()).filter(v => !!v);
}

export function setHeader(headers, key, value) {
    const headerPair = getHeaderPair(headers, key);
    if (headerPair) {
        headerPair[1] = value;
    } else {
        headers.push([key, value]);
    }
}

export function deleteHeader(headers, key) {
    _.remove(headers, ([headerKey]) => headerKey.toLowerCase() === key.toLowerCase());
}

export function someHeaderValues(headers, predicate) {
    return headers.some(([key, value]) =>
        value.split(',').map(v => v.trim()).filter(predicate).length > 0
    );
}

export function joinAnd(vals, initialSep = ', ', finalSep = ' and ') {
    if (vals.length === 1) return vals[0];
    return vals.slice(0, -1).join(initialSep) + finalSep + vals[vals.length - 1];
}

export const ExternalLink = styled.a.attrs(() => ({
    target: '_blank',
    rel: "noopener noreferrer"
}))`
    color: ${p => p.theme.primaryInputBackground};
`;

export const InternalLink = styled(Link)`
    color: ${p => p.theme.primaryInputBackground};
`;

export const Checkmark = styled(FontAwesomeIcon).attrs(() => ({
    icon: ['fas', 'check'],
    'aria-label': "Yes"
}))`
    color: #27bc17;
`;

export const Cross = styled(FontAwesomeIcon).attrs(() => ({
    icon: ['fas', 'times'],
    'aria-label': "No"
}))`
    color: ${p => p.theme.popColor};
`;