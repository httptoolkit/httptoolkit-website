import React, { useEffect } from 'react';

import { isSSR } from '../util';
import { styled } from '../styles';

import { TextInput } from './form';

const DocsearchContainer = styled.div`
    .algolia-autocomplete, input {
        width: 100%;
    }
`;

export const Docsearch = (props) => {
    useEffect(() => {
        if (isSSR) return;

        window.docsearch({
            appId: 'SYY32YEAY9',
            apiKey: '36f428abfcd5e46d5c7e79617b3cc06a',
            indexName: "httptoolkit",
            // We need a *unique* id here. Breaks if we use memoized ids if we also
            // try to use SSR, so instead we use an explicit name prop:
            inputSelector: `.docsearch-input-${props.name}`
        });
    }, [props.name]);

    return <DocsearchContainer className={props.className}>
        <TextInput
            type="search"
            placeholder="Search the docs..."
            className={`docsearch-input-${props.name}`}
        />
    </DocsearchContainer>;
}