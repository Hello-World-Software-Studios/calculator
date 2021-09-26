import {useCallback, useState} from "react";

export default function usePostAPI(url, bodyJSON) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.Token}`,
        },
        body: JSON.stringify(bodyJSON),
      });
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, [url, bodyJSON]);
  return [{data, isLoading, error}, callAPI];

  // useEffect(() => {
  //   setIsLoading(true);
  //   const postData = async () => {
  //     try {
  //       const res = await fetch(url, {
  //         method: "POST",
  //         headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.Token}`},
  //         body: JSON.stringify(bodyJSON),
  //       });
  //       const json = await res.json();
  //       setData(json);
  //       setIsLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  // }, [url, bodyJSON]);

  // return [{data, isLoading, error}, ];
}
