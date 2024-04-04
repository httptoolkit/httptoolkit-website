/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as _ from 'lodash';

export function getOrigin(url: string | URL) {
  return new URL(url).origin;
}

export function getHeaderPair(headers: any, key: string) {
  return _.find(headers, ([headerKey]) => headerKey.toLowerCase() === key.toLowerCase());
}

export function getHeaderValue(headers: any, key: any) {
  return (getHeaderPair(headers, key) || [])[1];
}

export function getHeaderValues(headers: any, key: any, separator = ',') {
  return (getHeaderValue(headers, key) || '')
    .split(separator)
    .map((v: string) => v.trim())
    .filter((v: any) => !!v);
}

export function setHeader(headers: any, key: any, value: any) {
  const headerPair = getHeaderPair(headers, key);
  if (headerPair) {
    headerPair[1] = value;
  } else {
    headers.push([key, value]);
  }
}

export function deleteHeader(headers: _.List<unknown>, key: string) {
  _.remove(headers, ([headerKey]) => headerKey.toLowerCase() === key.toLowerCase());
}

export function someHeaderValues(headers, predicate) {
  return headers.some(
    ([, value]) =>
      value
        .split(',')
        .map(v => v.trim())
        .filter(predicate).length > 0,
  );
}

export function joinAnd(vals: any[], initialSep = ', ', finalSep = ' and ') {
  if (vals.length === 1) return vals[0];
  return vals.slice(0, -1).join(initialSep) + finalSep + vals[vals.length - 1];
}
