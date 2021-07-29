import {useEffect, useState} from "react";

const useFetch = (url, dependencies) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch {
        setError(error);
      }
      // const res = await fetch(url, options);
      // const json = await res.json();
      // setResponse(json);
    }
    fetchData();
  }, [dependencies, error, url]);
  return {response};
};

export default useFetch;
