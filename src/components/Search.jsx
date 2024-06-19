import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

const Search = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate()

    const handleSearch = () => {
        onSearch(query);
        navigate('/result')
    };

    const handleClear = () => {
        setQuery('');
        onClear(); // Call onClear function to clear results
    };

    return (
        <div className="container">
            <h2>Search Here..</h2>
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    required
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
                <button className="clear-button" onClick={handleClear}>Clear</button> {/* Clear button */}
            </div>
        </div>
    );
};

export default Search;
