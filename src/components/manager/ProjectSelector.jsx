import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dropdown, DropdownButton, Spinner} from "react-bootstrap";
import useAPI from "../../hooks/useAPI";
import {errorAndLoadingHandler, newListGenerator} from "../utils/utilities";

export default function ProjectSelector({setCurrentProject}) {
  const [listOfProjects, setListOfProjects] = useState([]);
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: incomingProjectData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/projects`);
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
    <DropdownButton id="dropdown-project" title="Your Saved Projects">
      {listOfProjects.length === 0 ? (
        <Dropdown.Item>No Saved Projects</Dropdown.Item>
      ) : (
        listOfProjects.map((item) => (
          <Dropdown.Item onClick={() => setCurrentProject(item)}>
            {item.name}
          </Dropdown.Item>
        ))
      )}
    </DropdownButton>
  );
}

ProjectSelector.propTypes = {
  setCurrentProject: PropTypes.func.isRequired,
};
