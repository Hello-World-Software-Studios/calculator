import {useEffect, useState} from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    }
    fetchData();
  });
  return {response};
};

export default useFetch;
