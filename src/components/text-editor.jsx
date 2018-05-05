import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { styled } from '../styles';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onEditorWillMount = (monaco) => {
        this.monaco = monaco;
    }

    onEditorDidMount = (editor) => {
        this.editor = editor;
    }

    render() {
        const options = {
            fontSize: 20,
            minimap: { enabled: false },
            wordWrap: true
        };

        return <MonacoEditor
            language="plaintext"
            value={this.props.children}
            options={options}
            onChange={this.props.onChange}
            editorWillMount={this.onEditorWillMount}
            editorDidMount={this.onEditorDidMount}
        />;
    }
}