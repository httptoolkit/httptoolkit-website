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
            inputSelector: ".docsearch-input"
        });
    }, []);

    return <DocsearchContainer className={props.className}>
        <TextInput
            type="search"
            placeholder="Search the docs..."
            className="docsearch-input"
        />
    </DocsearchContainer>;
}