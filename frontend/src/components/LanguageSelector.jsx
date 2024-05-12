import React, { useState } from 'react';

const LanguageSelector = ({ languages, onLanguageChange, selectedLanguage }) => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

  const handleSelectLanguage = (event) => {
    onLanguageChange(event.target.value);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="language-selector">
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage}
      </button>
      {isOpen && (
        <ul>
          {languages.map((lang) => (
            <li key={lang}>
              <button onClick={handleSelectLanguage} value={lang}>
                {lang}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;