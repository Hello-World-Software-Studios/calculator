import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dropdown, DropdownButton, Spinner} from "react-bootstrap";
import useAPI from "../hooks/useAPI";
import {errorAndLoadingHandler} from "./utilities";

export default function DropdownItemGenerator({
  setCurrentProject
}) {
  const [listOfProjects, setListOfProjects] = useState();
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: incomingProjectData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/projects/current`);
  const handledProjectData = errorAndLoadingHandler(
    incomingProjectData,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );
  console.log("Data:", incomingProjectData, handledProjectData, isLoadData);
  useEffect(() => {
    if (errData) {
      setError(errData);
    }
  }, [errData]);

  useEffect(() => {
    const unique = (array) => {
      const arr = [];
      for(let i = 0; i < array.length; i += 1) {
          if(!arr.includes(array[i].name)) {
              arr.push(array[i].name);
          }
      }
      return arr; 
    }
    const uniqueProjectNames = unique(handledProjectData);
    setListOfProjects(uniqueProjectNames);
  }, [handledProjectData]);
  console.log(listOfProjects);
  
  if (listOfProjects === undefined) {
    return (
      <DropdownButton title="Your Saved Projects">
        <Dropdown.Item>Nothing Loaded</Dropdown.Item>
      </DropdownButton>
    );
  }
  return (
    <DropdownButton id="dropdown-project" title="Your Saved Projects">
      {listOfProjects.map((item) => (
        <Dropdown.Item onClick={setCurrentProject(item)}>{item}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

DropdownItemGenerator.propTypes = {
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
