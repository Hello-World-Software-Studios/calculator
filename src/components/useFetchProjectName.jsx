import {useEffect, useState} from "react";

const useFetchSQLData = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
        try {
        const res = await fetch(
        `http://localhost:3000/projects/get`
        );
        const json = await res.json();
        const {name: projectName} = json.rows[0];
        setResponse(projectName);
        } catch (err) {
            setError(err);
        } 
    }
    fetchData();
;  }, []);
  return {response, error};
};

export default useFetchSQLData;
