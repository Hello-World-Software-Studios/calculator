import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import usePostAPI from "../hooks/usePostAPI";
import {errorAndLoadingHandler} from "./utilities";
import ProjectSelector from "./ProjectSelector";

export default function Dashboard({
  setIsAuthenticated,
  currentProject,
  setCurrentProject,
}) {
  const [projectInput, setProjectInput] = useState({id: undefined, name: ""});
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: {username: userName},
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/users/name`);
  const handledUsername = errorAndLoadingHandler(
    userName,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );
  useEffect(() => {
    if (errData) {
      setError(errData);
    }
  }, [errData]);

  const [{data: incomingProjectData, isLoading: loadingBool, error: postError}, callAPI] =
    usePostAPI(`http://localhost:3000/projects`, {currentProject});
  const handledProjectData = useMemo(
    () =>
      errorAndLoadingHandler(
        incomingProjectData,
        loadingBool,
        postError,
        <Spinner animation="border" />
      ),
    [incomingProjectData, loadingBool, postError]
  );
  useEffect(() => {
    if (handledProjectData) {
      setCurrentProject(handledProjectData);
    }
  }, [handledProjectData, setCurrentProject]);

  const submitProject = async (event) => {
    event.preventDefault();
    await callAPI();
    await setCurrentProject(() => {
      if (handledProjectData) {
        return handledProjectData;
      }
      return currentProject;
    });
    setError(postError);
  };

  const onChangeProject = (event) => {
    setProjectInput((prevState) => ({
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
            value={projectInput.name}
          />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        <h5>Or, select one of your existing projects:</h5>
        <ProjectSelector setCurrentProject={setCurrentProject} />
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
