import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Button from '../components/Button';
import OutputLogs from '../components/OutputLogs';
import LanguageSelector from '../components/LanguageSelector';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { runCode } from '../apiClient';

const SUPPORTED_LANGUAGES = ['javascript', 'python'];

const EditorPage = ({ token }) => {
    const [code, setCode] = useState('print("Helloooo")');
    const [executing, setIsExecuting] = useState(false);
    const [language, setLanguage] = useState('python');
    const [logs, setLogs] = useState('');

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    }

    const handleRunCode = () => {
        setIsExecuting(true);
        runCode(language, code).then((data) => {
            setLogs(data);
            setIsExecuting(false);
        }).catch((err) => {
            console.log(`An error occured ${err}`);
            setLogs("An error occurred, Retry later");
            setIsExecuting(false);
        })
    };

    return (
        <div className="flex flex-col gap-4 p-4 h-full">
            <div className="flex gap-4 items-center">
                <div className='col-md-6'>
                    <Button text="Run Code" onClick={handleRunCode} disabled={executing} />
                </div>
                <div className='col-md-6'>
                    <LanguageSelector
                        languages={SUPPORTED_LANGUAGES}
                        onLanguageChange={handleLanguageChange}
                        selectedLanguage={language}
                    />
                </div>
            </div>
            <div className='flex flex-1'>
                <PanelGroup direction="vertical">
                    <Panel id="codeEditor" order={1} className='flex flex-1'>
                        <div className='flex flex-1 border border-1 border-blue-400 rounded p-2'>
                            <CodeEditor code={code} onChange={handleCodeChange} language={language} width='100%' height='100%' />
                        </div>
                    </Panel>
                    <PanelResizeHandle className="h-1 w-full bg-black" />
                    <Panel id="outputs" minSize={25} order={2}>
                        <OutputLogs logs={logs} loading={executing} />
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}

export default EditorPage;