import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dropdown, DropdownButton} from "react-bootstrap";

export default function DropdownItemGenerator({
  dataReturnedFromAPICall,
  setCurrentProject,
}) {
  const [listOfProjects, setListOfProjects] = useState();

  useEffect(() => {
    const filterProjectNamesFromAPIData = () => {
      if (dataReturnedFromAPICall) {
        dataReturnedFromAPICall.filter(() => ));
      }  
    };
    setListOfProjects(filterProjectNamesFromAPIData);
  }, [dataReturnedFromAPICall]);

  console.log(dataReturnedFromAPICall);
  console.log(listOfProjects);

  if (listOfProjects === undefined) {
    return (
      <DropdownButton>
        <Dropdown.Item>Nothing Loaded</Dropdown.Item>
      </DropdownButton>
    );
  }
  return (
    <DropdownButton id="dropdown-project" title="Your Saved Projects">
      {listOfProjects.map((item) => (
        <Dropdown.Item onClick={setCurrentProject(item)}>{item.name}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

DropdownItemGenerator.propTypes = {
  dataReturnedFromAPICall: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      project_id: PropTypes.number,
      username: PropTypes.string,
      wall_length: PropTypes.number,
    })
  ),
  setCurrentProject: PropTypes.func.isRequired,
};
DropdownItemGenerator.defaultProps = {
  dataReturnedFromAPICall: [
    {
      id: null,
      name: "No Projects Saved",
      project_id: null,
      username: null,
      wall_length: null,
    },
  ],
};
