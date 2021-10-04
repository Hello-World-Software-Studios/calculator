import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dropdown, DropdownButton, Spinner} from "react-bootstrap";
import useAPI from "../hooks/useAPI";
import {errorAndLoadingHandler, newListGenerator} from "./utilities";

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
    // const unique = (array) => {
    //   const arr = [];
    //   for (let i = 0; i < array.length; i += 1) {
    //     if (!arr.includes(array[i].id)) {
    //       arr.push(array[i].name);
    //     }
    //   }
    //   return arr;
    // };
    // const uniqueProjectNames = unique(handledProjectData);
    // setListOfProjects(uniqueProjectNames);

    // const newListGenerator = (array) => {
    //   const arr = [];
    //   for (let i = 0; i < array.length; i += 1) {
    //     arr.push(array[i]);
    //   }
    //   return arr;
    // };
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
  // dataReturnedFromAPICall: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //     project_id: PropTypes.number,
  //     username: PropTypes.string,
  //     wall_length: PropTypes.number,
  //   })
  // ),
  setCurrentProject: PropTypes.func.isRequired,
};
// DropdownItemGenerator.defaultProps = {
//   dataReturnedFromAPICall: [
//     {
//       id: null,
//       name: "No Projects Saved",
//       project_id: null,
//       username: null,
//       wall_length: null,
//     },
//   ],
// };
