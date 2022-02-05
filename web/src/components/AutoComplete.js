import React, { useState, useEffect } from 'react';
import { Suggestions } from './Suggestions';
import { Tube } from './Tube';
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
      <input type='search' pattern='/^[0-9A-Za-z\s\-]+$/' value={value} onChange={handleChange} />
      {/* I would usually handle loading states here, but it looks strange with a json-server */}
      {/* {loading && <div>Loading...</div>} */}
      {error && <p>Error: Something went wrong</p>}
      {resultsActive && <Suggestions handleClick={handleClick} data={results} />}
      {!resultsActive && data.length === 1 && <Tube data={data} />}
    </div>
  );
};

export default AutoComplete;

//todo: style