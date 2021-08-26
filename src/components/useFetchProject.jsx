import {useEffect, useState} from "react";

const useFetchProject = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
        try {
        const res = await fetch(
        `http://localhost:3000/projects`
        );
        const json = await res.json();
        // const {name: project} = json[0];
        setResponse(json[0]);
        } catch (err) {
            setError(err);
        } 
    }
    fetchData();
    
;  }, []);

  return {response, error};
};

export default useFetchProject;
