import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';

const CurrencyConverter = currencyCode => {
  const [submit, setSubmit] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [searchedAmount, setSearchedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data = await axios({
          method: 'get',
          url: `http://data.fixer.io/api/convert`,
          mode: 'cors',
          params: {
            access_key: process.env.REACT_APP_API_ACCESS_KEY,
            from: 'SEK',
            to: currencyCode.currencyCode,
            amount: currentAmount
          }
        });
        if (data.status === 200) {
          setSearchedAmount(currentAmount);
          setConvertedAmount(data.data.result);
        }
        setSubmit(false);
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

    if (submit) {
      fetchData();
    }
  }, [submit]);

  return (
    <div className='CurrencyConverter'>
      <p>Please enter an amount in SEK</p>
      <input
        type='number'
        onChange={e => setCurrentAmount(e.target.value)}
      ></input>
      <button onClick={() => setSubmit(true)}>
        Convert to {currencyCode.currencyCode}
      </button>
      {convertedAmount && (
        <div className='result'>
          <p>
            {searchedAmount} SEK to {currencyCode.currencyCode} ={' '}
            {convertedAmount}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
