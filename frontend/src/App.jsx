import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Button from './components/Button';
import OutputLogs from './components/OutputLogs';
import LanguageSelector from './components/LanguageSelector';

const SUPPORTED_LANGUAGES = ['javascript', 'python']; 

const App = () => {
  // return <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
  const [code, setCode] = useState('print("Helloooo")'); // State for code content
  const [language, setLanguage] = useState('python'); // State for language
  const [logs, setLogs] = useState(''); // State for output logs

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  }

  const handleRunCode = () => {
    // Call your backend function to execute the code
    // Update the logs state with the output
    setLogs('Code execution in progress...'); // Example placeholder
    fetch(process.env.REACT_APP_BACKEND_URL + "/status")
        .then((res) => res.json())
        .then((data) => {
          setLogs(data.Status);
        });
  };

  return (
    <div className="app flex w-full h-full gap-2">
      <div className="controls d-flex flex-column justify-content-center align-items-center">
        <div className='col-md-6'>
          <Button text="Run Code" onClick={handleRunCode} />
        </div>
        <div className='col-md-6'>
        <LanguageSelector
          languages={SUPPORTED_LANGUAGES}
          onLanguageChange={handleLanguageChange}
          selectedLanguage={language}
        />
        </div>
      </div>
      <div className='flex-2 w-full overflow-hidden'>
        <CodeEditor value={code} onChange={handleCodeChange} language={language} width='100%' height='20vh' />
      </div>
      <div className='flex-3 w-full'>
        <OutputLogs logs={logs} />
      </div>
      
    </div>
  );
};

export default App;
