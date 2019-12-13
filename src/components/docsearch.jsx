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
            apiKey: "f5b49b1ad3229d305c66fc594c1133a3",
            indexName: "httptoolkit",
            // We need a *unique* id here. Breaks if we use memoized ids if we also
            // try to use SSR, so instead we use an explicit name prop:
            inputSelector: `.docsearch-input-${props.name}`
        });
    }, []);

    return <DocsearchContainer className={props.className}>
        <TextInput
            type="search"
            placeholder="Search the docs..."
            className={`docsearch-input-${props.name}`}
        />
    </DocsearchContainer>;
}