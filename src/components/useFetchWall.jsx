import {useEffect, useState} from "react";

const useFetchWall = (wallLength, isImperialUnit) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3000/walls?wallLength=${wallLength}&isImperialUnit=${isImperialUnit}`
        );
        const json = await res.json();
        console.log(json);
        setResponse(json);
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }, [wallLength, isImperialUnit]);
  return {response, error};
};

export default useFetchWall;
