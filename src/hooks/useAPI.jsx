import {useEffect, useState} from "react";

export default function useAPI(url) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setError] = useState(null);
  // TODO response error
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.Token}`,
          },
        });
        const json = await res.json();
        setData(await json);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return {data, isLoading, errorAPI};
}
