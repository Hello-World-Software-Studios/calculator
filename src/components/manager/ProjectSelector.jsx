import React, {useEffect, useState} from "react";
import {Dropdown, DropdownButton, Spinner} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import {errorAndLoadingHandler, newListGenerator} from "../utils/utilities";

export default function ProjectSelector() {
  const history = useHistory();
  const [listOfProjects, setListOfProjects] = useState([]);
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: incomingProjectData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/projects/list`);
  const handledProjectData = errorAndLoadingHandler(
    incomingProjectData,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );

  console.log("projectData:", incomingProjectData, handledProjectData, isLoadData);
  useEffect(() => {
    if (errData) {
      setError(errData);
    }
  }, [errData]);

  useEffect(() => {
    const newListOfProjects = newListGenerator(handledProjectData);
    setListOfProjects(newListOfProjects);
  }, [handledProjectData]);

  if (listOfProjects === undefined) {
    return (
      <DropdownButton title="Your Saved Projects">
        <Dropdown.Item>Nothing Loaded</Dropdown.Item>
      </DropdownButton>
    );
  }
  return (
    <DropdownButton title="Your Saved Projects">
      {listOfProjects.length === 0 ? (
        <Dropdown.Item>No Saved Projects</Dropdown.Item>
      ) : (
        listOfProjects.map((item) => (
          <Dropdown.Item
            onClick={() => history.push(`/projects/${item.id}`)}
            key={item.id}
          >
            {item.name}
          </Dropdown.Item>
        ))
      )}
    </DropdownButton>
  );
}
