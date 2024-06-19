import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="results-container">
            {results.length > 0 ? (
                results.map((item, index) => (
                    <div key={index} className="result-item">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default Results;
