import React from 'react';

const OutputLogs = ({ logs }) => {
  return (
    <div className="output-logs">
      <h4>Output</h4>
      <pre>{logs}</pre>
    </div>
  );
};

export default OutputLogs;
