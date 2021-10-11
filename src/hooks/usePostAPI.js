import {useCallback, useState} from "react";

export default function usePostAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async (url, bodyJSON) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: bodyJSON ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.Token}`,
        },
        body: JSON.stringify(bodyJSON),
      });
      const json = await res.json();
      setIsLoading(false);
      return json;
    } catch (err) {
      setError(err.message);
    }
    return null;
  }, []);

  return [{isLoading, error}, callAPI];
}
