// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import * as _ from 'lodash';
import { action } from 'mobx';
import { Observer } from 'mobx-react-lite';
import * as React from 'react';

import { Trash } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { Input } from '@/components/modules/input';
import { screens, styled } from '@/styles';

// Based RFC7230, 3.2.6:
const HEADER_NAME_PATTERN = "[!#$%&'*+-;^_`|~A-Za-z0-9]+";

function clickOnEnter(e) {
  if (e.target === e.currentTarget && e.key === 'Enter') {
    // Can't use .click(), as sometimes our target is an SVGElement, and they don't have it
    e.currentTarget.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }
}

// Taken directly from https://github.com/httptoolkit/httptoolkit-ui/blob/003eb6c/src/components/common/editable-headers.tsx

const HeadersContainer = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 54% 36% calc(10% - 28px);
  margin: 0 -18px 10px -18px;

  > :last-child {
    grid-column: 2 / span 2;
  }

  @media (min-width: ${screens.lg}) {
    margin: 0 0 10px 0;
  }
`;

const HeaderDeleteButton = styled.button.attrs({
  type: 'button',
  'aria-label': 'Delete header',
})`
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;

// Check for headers that browsers won't let you send
function isForbiddenBrowserHeader(rawHeaderName) {
  const headerName = rawHeaderName.toLowerCase();

  return (
    headerName.startsWith('proxy-') ||
    headerName.startsWith('sec-') ||
    [
      'accept-charset',
      'accept-encoding',
      'access-control-request-headers',
      'access-control-request-method',
      'connection',
      'content-length',
      'cookie',
      'cookie2',
      'date',
      'dnt',
      'expect',
      'feature-policy',
      'host',
      'keep-alive',
      'origin',
      'referer',
      'te',
      'trailer',
      'transfer-encoding',
      'upgrade',
      'via',
    ].includes(headerName)
  );
}

function validateClientHeaderNameChange(event) {
  const headerName = event.target.value;
  if (isForbiddenBrowserHeader(headerName)) {
    event.target.setCustomValidity(`Browsers will not let you set a custom ${headerName} header`);
  } else {
    event.target.setCustomValidity('');
  }
}

export const EditableHeaders = props => {
  const { headers, onChange, autoFocus, onlyClientHeaders } = props;

  const [focused, setFocused] = React.useState(!autoFocus);

  return (
    <Observer>
      {() => (
        <HeadersContainer>
          {_.flatMap(headers, ([key, value], i) => [
            <Input
              value={key}
              required
              pattern={HEADER_NAME_PATTERN}
              spellCheck={false}
              key={`${i}-key`}
              onChange={action(event => {
                if (onlyClientHeaders) validateClientHeaderNameChange(event);
                event.target.reportValidity();
                headers[i][0] = event.target.value;
                onChange(headers);
              })}
            />,
            <Input
              value={value}
              spellCheck={false}
              key={`${i}-val`}
              onChange={action(event => {
                event.target.reportValidity();
                headers[i][1] = event.target.value;
                onChange(headers);
              })}
            />,
            <HeaderDeleteButton
              key={`${i}-del`}
              onClick={action(() => {
                headers.splice(i, 1);
                onChange(headers);
              })}
              onKeyPress={clickOnEnter}
            >
              <SquareIcon $size="small" icon={Trash} />
            </HeaderDeleteButton>,
          ]).concat([
            <Input
              value=""
              pattern={HEADER_NAME_PATTERN}
              placeholder="Header name"
              spellCheck={false}
              key={`${headers.length}-key`}
              onChange={action(event => {
                if (onlyClientHeaders) validateClientHeaderNameChange(event);
                headers.push([event.target.value, '']);
                onChange(headers);
              })}
              ref={elem => {
                if (!elem || focused || !autoFocus) return;
                elem.focus();
                setFocused(true);
              }}
            />,
            <Input
              value=""
              placeholder="Header value"
              spellCheck={false}
              key={`${headers.length}-val`}
              onChange={action(event => {
                headers.push(['', event.target.value]);
                onChange(headers);
              })}
            />,
          ])}
        </HeadersContainer>
      )}
    </Observer>
  );
};
