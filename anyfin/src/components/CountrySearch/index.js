import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from '../CurrencyConverter';

import './style.css';

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPristine, setIsPristine] = useState(true);
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(searchTerm);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data = await axios({
          method: 'get',
          url: `https://restcountries.eu/rest/v2/name/${searchTerm}`,
          mode: 'cors'
        });
        console.log(data);
        if (data.status === 200) {
          setActiveCountry({});
          setCountries(data.data);
        }
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error('Error', error.message);
        }
        setError(true);
        setIsLoading(false);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    } else if (searchTerm === '' && isPristine === false) {
      setIsPristine(true);
      setCountries([]);
    }
  }, [searchTerm, isPristine]);

  return (
    <div className='CountrySearch'>
      <input
        value={searchTerm}
        placeholder='Please search'
        onChange={e => {
          setSearchTerm(e.target.value);
          setIsPristine(false);
        }}
      />
      {countries && (
        <div className='searchSuggestions'>
          {countries.map((country, key) => (
            <div className='countrySuggestion' key={key}>
              <p
                onClick={() => {
                  setActiveCountry(country);
                  setSearchTerm('');
                  setCountries([]);
                }}
              >
                {country.name}
              </p>
            </div>
          ))}
        </div>
      )}
      {activeCountry && activeCountry.name && (
        <div className='activeCountry'>
          <img src={activeCountry.flag} alt='Country flag' />
          <p>Name: {activeCountry.name}</p>
          <p>Capital: {activeCountry.capital}</p>
          <p>Population: {activeCountry.population}</p>
          <p>
            Currency:
            {activeCountry.currencies.map((currency, key) => (
              <span>
                <span key={key}>{currency.code}</span>
              </span>
            ))}
          </p>
          <CurrencyConverter currencyCode={activeCountry.currencies[0].code} />
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
