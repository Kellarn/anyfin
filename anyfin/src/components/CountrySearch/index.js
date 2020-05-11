import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const CountrySearch = ({ onChange, searchTerm, onClick, countries }) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    setSearchSuggestions(countries);
  }, [countries]);

  const handleChange = event => {
    onChange(event.target.value);
  };

  const handleClick = country => {
    onClick(country);
    setSearchSuggestions([]);
  };
  return (
    <div className='CountrySearch'>
      <input
        value={searchTerm}
        placeholder='Please search'
        onChange={handleChange}
      />

      {searchSuggestions && (
        <div className='searchSuggestions'>
          {searchSuggestions.map((country, key) => (
            <p key={key} onClick={() => handleClick(country)}>
              {country.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
