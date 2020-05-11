import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CurrencyConverter from '../CurrencyConverter';
import CountrySearch from '../CountrySearch';
import {
  GoogleMap,
  StandaloneSearchBox,
  LoadScript,
  Marker
} from '@react-google-maps/api';

import './style.css';

const ClassicView = ({
  countries,
  onChange,
  onClick,
  activeCountry,
  searchTerm
}) => {
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (activeCountry && activeCountry.latlng) {
      setPosition({
        lat: activeCountry.latlng[0],
        lng: activeCountry.latlng[1]
      });
    }
  }, [activeCountry]);

  return (
    <div className='ClassicView'>
      <CountrySearch
        onChange={onChange}
        searchTerm={searchTerm}
        onClick={onClick}
        countries={countries}
      />
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
