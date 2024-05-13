import React, { useState } from 'react';

const LanguageSelector = ({ languages, onLanguageChange, selectedLanguage }) => {
  const handleSelectLanguage = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className="flex gap-2 border border-1 p-1 border-blue-400 rounded">
      <label className='text-blue-500'>
        Language
      </label>
      <select value={selectedLanguage} onChange={handleSelectLanguage}>
          {languages.map((lang) => (
            <option value={lang} key={lang}>{lang}</option>
          ))}
        </select>
    </div>
  );
};

export default LanguageSelector;