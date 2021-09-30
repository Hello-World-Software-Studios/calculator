import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Dropdown, DropdownButton, Form, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import usePostAPI from "../hooks/usePostAPI";
import {errorAndLoadingHandler} from "./utilities";
// import DropdownItemGenerator from "./DropdownItemGenerator";

export default function Dashboard({
  setIsAuthenticated,
  currentProject,
  setCurrentProject,
}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: userName,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/users/name`);
  const handledUsername = errorAndLoadingHandler(
    userName,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );
  console.log("Data:", handledUsername);
  useEffect(() => {
    if (errData) {
      setError(errData);
    }
  }, [errData]);

  const [{data: incomingProjectData, isLoading: loadingBool, error: postError}, callAPI] =
    usePostAPI(`http://localhost:3000/projects`, {currentProject});
  const errorCheckedProjectData = !postError ? incomingProjectData : "Server Error Post!";
  const loadingCheckedProjectData = useMemo(
    () =>
      loadingBool === false ? errorCheckedProjectData : <Spinner animation="border" />,
    [errorCheckedProjectData, loadingBool]
  );

  useEffect(() => {
    if (loadingCheckedProjectData) {
      setCurrentProject(loadingCheckedProjectData);
    }
  }, [loadingCheckedProjectData, setCurrentProject]);

  // console.log("value returned from API:", loadingCheckedProjectData, "current Project State:", currentProject);

  const submitProject = async (event) => {
    event.preventDefault();
    await callAPI();
    await setCurrentProject(() => {
      if (loadingCheckedProjectData) {
        return loadingCheckedProjectData;
      }
      return currentProject;
    });
    setError(postError);
  };

  const onChangeProject = (event) => {
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: event.target.value,
    }));
  };

  return (
    <Card>
      <Card.Header>Project Dashboard</Card.Header>
      <Card.Body>
        <Button
          onClick={() => {
            setIsAuthenticated(false);
            localStorage.removeItem("Token");
          }}
        >
          Logout
        </Button>
        <Form className="form" onSubmit={submitProject}>
          <h3>
            Hello, &nbsp;
            {handledUsername || error}
          </h3>
          <br />
          <Form.Label>
            <h5>To create a project, enter a name:</h5>
          </Form.Label>
          <Form.Control
            placeholder="Ex: New Shed"
            required
            type="text"
            onChange={onChangeProject}
            value={currentProject.name}
          />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        <h5>Or, select one of your existing projects:</h5>
        {/* <DropdownItemGenerator
          dataReturnedFromAPICall={userName}
          setCurrentProject={setCurrentProject}
        />  */}
        <DropdownButton id="dropdown-project" title="Your Saved Projects">
          <Dropdown.Item onClick={() => console.log("Hello WOrld")}>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </Card.Body>
    </Card>
  );
}

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
Dashboard.defaultProps = {
  currentProject: {id: undefined, name: ""},
};
