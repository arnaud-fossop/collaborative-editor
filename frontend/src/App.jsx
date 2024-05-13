import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Button from './components/Button';
import OutputLogs from './components/OutputLogs';
import LanguageSelector from './components/LanguageSelector';

const SUPPORTED_LANGUAGES = ['javascript', 'python'];

const App = () => {
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
    console.log(language)
    fetch(process.env.REACT_APP_BACKEND_URL + "/run",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          code: code,
        })
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.Status);
      });
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex gap-4 items-center">
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
      <div className='flex flex-1 border border-1 border-blue-400 rounded p-2'>
        <CodeEditor value={code} onChange={handleCodeChange} language={language} width='100%' height='100%' />
      </div>
      <div className='min-h-[10vh]'>
        <OutputLogs logs={logs} />
      </div>

    </div>
  );
};

export default App;
