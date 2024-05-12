import React from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({ value, language, onChange, width, height }) => {
  return (
    <div className="code-editor">
        {/* <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />; */}
      <Editor
        height={height}
        width={width}
        value={value}
        onChange={onChange}
        language={language}
      />
    </div>
  );
};

export default CodeEditor;
