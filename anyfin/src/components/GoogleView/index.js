import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CurrencyConverter from '../CurrencyConverter';
import CountrySearch from '../CountrySearch';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import './style.css';

const GoogleView = searchTerm => {
  const [position, setPosition] = useState({});
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(activeCountry);
    if (activeCountry && activeCountry.latlng) {
      console.log(activeCountry.latlng);
      setPosition({
        lat: activeCountry.latlng[0],
        lng: activeCountry.latlng[1]
      });
    }
  }, [activeCountry]);

  const onChange = searchTerm => {
    setSearchTerm(searchTerm);
    setIsPristine(false);
  };
  const onClick = country => {
    setActiveCountry(country);
    setSearchTerm('');
  };

  return (
    <div className='GoogleView'>
      {/* <CountrySearch
        onChange={onChange}
        searchTerm={searchTerm}
        onClick={onClick}
        countries={countries}
      /> */}
      {position.lat && (
        <LoadScript googleMapsApiKey='AIzaSyACoDXdyl23j0_8fdP5WcJRXmzfR04P0D4'>
          <GoogleMap id='googleMap' center={position} zoom={4}>
            <Marker position={position} />
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
