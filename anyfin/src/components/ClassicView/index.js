import React from 'react';
import CurrencyConverter from '../CurrencyConverter';
import CountrySearch from '../CountrySearch';

import './style.css';

const ClassicView = ({
  countries,
  onChange,
  onClick,
  activeCountry,
  searchTerm,
  error
}) => {
  return (
    <div className='ClassicView'>
      <CountrySearch
        onChange={onChange}
        searchTerm={searchTerm}
        onClick={onClick}
        countries={countries}
      />
      <div className='error'>
        {error && !countries.length ? (
          <>Nothing found, please try a different search term!</>
        ) : error ? (
          <>Something went wrong, please try again later!</>
        ) : null}
      </div>
      {activeCountry && activeCountry.name && (
        <div className='activeCountry'>
          <img src={activeCountry.flag} alt='Country flag' />
          <p>Name: {activeCountry.name}</p>
          <p>Capital: {activeCountry.capital}</p>
          <p>Population: {activeCountry.population}</p>
          <p>
            Currency:
            {activeCountry.currencies.map((currency, key) => (
              <span key={key}>{currency.code}</span>
            ))}
          </p>
          <CurrencyConverter currencyCode={activeCountry.currencies[0].code} />
        </div>
      )}
    </div>
  );
};

export default ClassicView;
