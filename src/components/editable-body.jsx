import React from 'react';

import { styled } from '../styles';
import TabbedContainer from './tabbed-container';
import ContentSize from './content-size';
import JsonEditor from './json-editor';
import TextEditor from './text-editor';

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`;

const EditorHeader = styled.h4`
    padding: 10px;
    text-transform: uppercase;

    background-color: ${p => p.theme.popColor};
    color: ${p => p.theme.popBackground};
`;

const TabbedEditor = styled(TabbedContainer)`
`;

const isValidJson = (content) => {
    try {
        JSON.parse(content);
        return true;
    } catch (e) {
        return false;
    }
}

export default class EditableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            content: props.children
        };
    }

    getDerivedStateFromProps(newProps) {
        return {
            content: newProps.children
        };
    }

    render() {
        const { heading, contentType } = this.props;
        const { content } = this.state;

        return <EditorContainer className={this.props.className}>
            <EditorHeader>
                { heading }
                <ContentSize content={content} />
            </EditorHeader>
            <TabbedEditor
                defaultSelection={contentType}
                tabNameFormatter={(option) => ({
                    "text/plain": "Text",
                    "application/json": "JSON",
                    "application/octet-stream": "Hex",
                    "application/xml": "XML"
                }[option])}
            >{{
                "application/json": isValidJson(content) && <JsonEditor
                    key={'application/json'}
                    onChange={(content) => this.setState({ content })}
                >{ content }</JsonEditor>,
                "text/plain": <TextEditor
                    key={'text/plain'}
                    onChange={(content) => this.setState({ content })}
                >{ content }</TextEditor>,
                "application/xml": null,
                "application/octet-stream": null,
                "application/graphql": null,
            }}</TabbedEditor>
        </EditorContainer>;
    }
}