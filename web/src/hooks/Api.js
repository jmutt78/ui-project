import { useState, useEffect } from 'react';

export const useFetch = (query) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      fetch(`${url}?label_id_like=${query}&_limit=10`)
        .then((response) => response.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    } else {
      setData([]);
    }
  }, [url, query]);

  return { data, error, loading };
};
