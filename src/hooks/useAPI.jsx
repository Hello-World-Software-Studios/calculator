import {useEffect, useState} from "react";

export default function useAPI(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {"Authorization": `Bearer ${localStorage.Token}`},
        });
        const {username: json} = await res.json();
        setData(json);        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return {data, isLoading, errorAPI};
}
