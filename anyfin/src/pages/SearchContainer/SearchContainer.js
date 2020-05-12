import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cn from 'classnames';

import ClassicView from '../../components/ClassicView';
import GoogleView from '../../components/GoogleView';

import './style.css';

const SearchContainer = () => {
  const VIEWS = {
    CLASSIC: 'classic',
    GOGGLE: 'google'
  };
  const [view, setView] = useState(VIEWS.CLASSIC);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPristine, setIsPristine] = useState(true);
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        let data = await axios({
          method: 'get',
          url: `https://restcountries.eu/rest/v2/name/${searchTerm}`,
          mode: 'cors'
        });
        if (data.status === 200) {
          setActiveCountry({});
          setCountries(data.data);
        } else {
          setError(true);
          setCountries([]);
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
        setCountries([]);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    } else if (searchTerm === '' && isPristine === false) {
      setIsPristine(true);
      setCountries([]);
    }
  }, [searchTerm, isPristine]);

  const onChange = searchTerm => {
    setSearchTerm(searchTerm);
    setIsPristine(false);
  };
  const onClick = country => {
    setActiveCountry(country);
    setSearchTerm('');
  };

  return (
    <div
      className={cn('SearchContainer', {
        'SearchContainer--classic': view === VIEWS.CLASSIC,
        'SearchContainer--google': view === VIEWS.GOOGLE
      })}
    >
      <button
        className={cn('ViewButton', { active: view === VIEWS.CLASSIC })}
        onClick={() => setView(VIEWS.CLASSIC)}
      >
        Classic view
      </button>
      <button
        className={cn('ViewButton', { active: view === VIEWS.GOOGLE })}
        onClick={() => setView(VIEWS.GOOGLE)}
      >
        Google view
      </button>

      {view === VIEWS.CLASSIC && (
        <ClassicView
          countries={countries}
          onChange={onChange}
          onClick={onClick}
          activeCountry={activeCountry}
          searchTerm={searchTerm}
          error={error}
        />
      )}
      {view === VIEWS.GOOGLE && (
        <GoogleView
          countries={countries}
          onChange={onChange}
          onClick={onClick}
          activeCountry={activeCountry}
          searchTerm={searchTerm}
          error={error}
        />
      )}
    </div>
  );
};

export default SearchContainer;
