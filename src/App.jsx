import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      return; // If query is blank or contains only whitespace, do nothing
    }
    try {
      const apiUrl = `/api/search?query=${query}`;
      console.log("Fetching from:", apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Error fetching search results");
    }
  };

  const handleClear = () => {
    setResults([]); // Clear results
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Search onSearch={handleSearch} />} />
        <Route path="/results" element={<Results />} />
      </Routes>

    </div>
  );
};

export default App;
