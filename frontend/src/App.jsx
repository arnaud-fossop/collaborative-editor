import React, { useState } from 'react';
import LoginPage from './pages/Login';
import EditorPage from './pages/Editor';


const App = () => {
  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <EditorPage
      token="123"></EditorPage>
  );
};

export default App;
