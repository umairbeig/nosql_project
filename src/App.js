import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [word, setWord] = useState('');
  const [responses, setResponses] = useState([]);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/search/${word}`);
      const data = await response.json();
      setResponses(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openFile = async (filePath) => {
    try {
      const response = await fetch(`http://localhost:8080/api/open/${filePath}`);
      const text = await response.text();

      // Open file contents in a new browser tab
      const newTab = window.open('', '_blank');
      newTab.document.write('<pre>' + text + '</pre>');
      newTab.document.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Your App Component</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleWordChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        {responses.map((doc, index) => (
          <div key={index}>
            <p onClick={() => openFile(doc.filename)}>Filename: {doc.filename}</p>
            <p>Count: {doc.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
