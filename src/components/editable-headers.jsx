import * as _ from 'lodash';
import * as React from 'react';
import { action } from 'mobx';
import { Observer } from 'mobx-react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { styled } from '../styles';
import { Button } from './form';

// Based RFC7230, 3.2.6:
const HEADER_NAME_PATTERN = '[!#$%&\'*+\-;^_`|~A-Za-z0-9]+';

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
    grid-template-columns: 54% 36% calc(10% - 10px);

    > :last-child {
        grid-column: 2 / span 2;
    }
`;

const TextInput = styled.input`
    /* Stop iOS messing with my input styling */
    -webkit-appearance: none;

    padding: 10px;

    border-radius: 4px;

    border: 1px solid ${p => p.theme.primaryInputBackground};
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeText};
`;

const HeaderDeleteButton = styled(Button).attrs({
    type: 'button'
})`
    font-size: ${p => p.theme.textSize};
    padding: 3px 10px 5px;
`;


export const EditableHeaders = (props) => {
    const { headers, onChange, autoFocus, onlyClientHeaders } = props;

    const [focused, setFocused] = React.useState(!autoFocus);

    return <Observer>{() => <HeadersContainer>
        { _.flatMap(headers, ([key, value], i) => [
            <TextInput
                value={key}
                required
                pattern={HEADER_NAME_PATTERN}
                spellCheck={false}
                key={`${i}-key`}
                onChange={action((event) => {
                    event.target.reportValidity();
                    headers[i][0] = event.target.value;
                    onChange(headers);
                })}
            />,
            <TextInput
                value={value}
                required
                spellCheck={false}
                key={`${i}-val`}
                onChange={action((event) => {
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
                <Icon icon={['far', 'trash-alt']} />
            </HeaderDeleteButton>
        ]).concat([
            <TextInput
                value=''
                pattern={HEADER_NAME_PATTERN}
                placeholder='Header name'
                spellCheck={false}
                key={`${headers.length}-key`}
                onChange={action((event) => {
                    headers.push([event.target.value, '']);
                    onChange(headers);
                })}
                ref={(elem) => {
                    if (!elem || focused || !autoFocus) return;
                    elem.focus();
                    setFocused(true);
                }}
            />,
            <TextInput
                value=''
                placeholder='Header value'
                spellCheck={false}
                key={`${headers.length}-val`}
                onChange={action((event) => {
                    headers.push(['', event.target.value]);
                    onChange(headers);
                })}
            />
        ]) }
    </HeadersContainer>}</Observer>;
};