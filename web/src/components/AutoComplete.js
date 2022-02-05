import React, { useState, useEffect } from 'react';
import { Results } from './Results';
import { Kit } from './Kit';
import { useFetch } from '../hooks/Api';

const AutoComplete = () => {
  const [value, setValue] = useState('');
  const { data, loading, error } = useFetch(value);
  const [results, setResults] = useState([]);
  const [resultsActive, setResultsActive] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (data.length) {
      setResults(data);
      if (selected) {
        setResultsActive(false);
      } else {
        setResultsActive(true);
      }
    } else {
      setResultsActive(false);
      setResults([]);
    }
  }, [data, selected]);

  const handleChange = (e) => {
    const re = /^[0-9.-]*$/;
    const query = e.target.value;
    if (re.test(query)) {
      setValue(query);
      query.length < 1 && setResults([]);
      e && setSelected(null);
    }
  };

  const handleClick = (e) => {
    setSelected(data);
    setResults([]);
    setValue(e.target.innerText);
  };

  return (
    <div>
      <div>
        <label htmlFor='search'>Label ID:</label>
        <input
          type='search'
          pattern='/^[0-9A-Za-z\s\-]+$/'
          placeholder='Search Label Id'
          value={value}
          onChange={handleChange}
        />
      </div>
      {/* I would usually handle loading states here, but it looks strange with a json-server */}
      {/* {loading && <div>Loading...</div>} */}
      {error && <p className='error'>Error: Something went wrong</p>}
      {resultsActive && <Results handleClick={handleClick} data={results} />}
      {!resultsActive && data.length === 1 && <Kit data={data} />}
    </div>
  );
};

export default AutoComplete;
