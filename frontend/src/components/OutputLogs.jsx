import React from 'react';

const OutputLogs = ({ logs, loading }) => {
  return (
    <div className="output-logs">
      <h3>Output</h3>
      <hr/>
      <div className='flex h-full p-2 border border-1 border-blue-300 rounded'>
        {loading ? <label>Code execution in progress...<span className="loading loading-dots loading-md"></span></label>: logs}
      </div>
    </div>
  );
};

export default OutputLogs;
