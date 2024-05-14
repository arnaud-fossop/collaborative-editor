import React from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange }) => {
  return (
    <Editor
        value={code}
        onChange={onChange}
        language={language}
      />
  );
};

export default CodeEditor;
