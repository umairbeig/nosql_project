import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [word, setWord] = useState('');
  const [selectedValue, setSelectedValue] = useState('a');
  const [responses, setResponses] = useState([]);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/search/${word}/${selectedValue}`);
      const data = await response.json();
     
      setResponses(data);
      
     
      // console.log(data);
    } catch (error) {
      console.error('Error:', error);
      console.log("word not found")
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
        <select value={selectedValue} onChange={handleDropdownChange}>
          <option value="table1">table1</option>
          <option value="table2">table2</option>
          <option value="table3">table3</option>
        </select>
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
