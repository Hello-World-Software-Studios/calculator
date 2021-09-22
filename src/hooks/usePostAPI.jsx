import {useEffect, useState} from "react";

export default function usePostAPI(url, bodyObjectParam) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.Token}`},
          body: JSON.stringify(bodyObjectParam),
        });
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [url, bodyObjectParam]);

  return {data, isLoading, error};
}