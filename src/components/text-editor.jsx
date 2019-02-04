import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class extends React.PureComponent {

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
            requireConfig={{ url: '/vs/loader.js' }}
            onChange={this.props.onChange}
            editorWillMount={this.onEditorWillMount}
            editorDidMount={this.onEditorDidMount}
        />;
    }
}