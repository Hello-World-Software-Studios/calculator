import {useCallback, useState} from "react";

export default function useAPIWithCallback() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setError] = useState(null);

  const callGetAPI = useCallback(async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.Token}`,
        },
      });
      const json = await res.json();
      setIsLoading(false);
      return json;
    } catch (err) {
      setError(err.message);
    }
    return null;
  }, []);

  return [{isLoading, errorAPI}, callGetAPI];
}
