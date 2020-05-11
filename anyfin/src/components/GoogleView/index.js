import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from '../CurrencyConverter';
import CountrySearch from '../CountrySearch';
import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';

import './style.css';

const GoogleView = ({
  searchTerm,
  activeCountry,
  onChange,
  onClick,
  countries
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

  const options = { closeBoxURL: '', enableEventPropagation: true };

  return (
    <div className='GoogleView'>
      <CountrySearch
        onChange={onChange}
        searchTerm={searchTerm}
        onClick={onClick}
        countries={countries}
      />
      {position.lat && activeCountry.name && (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap id='googleMap' center={position} zoom={4}>
            <Marker position={position} />
            <InfoBox position={position} options={options}>
              <div className='background'>
                <div className='info'>
                  <img
                    className='countryFlag'
                    src={activeCountry.flag}
                    alt='Country flag'
                  />
                  <p>Name: {activeCountry.name}</p>
                  <p>Capital: {activeCountry.capital}</p>
                  <p>Population: {activeCountry.population}</p>
                  <p>
                    Currency: {''}
                    {activeCountry.currencies.map((currency, key) => (
                      <span key={key}>{currency.code}</span>
                    ))}
                  </p>
                </div>
              </div>
            </InfoBox>
          </GoogleMap>
        </LoadScript>
      )}
      {activeCountry && activeCountry.name && (
        <CurrencyConverter currencyCode={activeCountry.currencies[0].code} />
      )}
    </div>
  );
};

export default GoogleView;
