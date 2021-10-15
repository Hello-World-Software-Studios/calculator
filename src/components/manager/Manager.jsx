import React, {useEffect, useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import PropTypes from "prop-types";
import useAPI from "../../hooks/useAPI";
import usePostAPI from "../../hooks/usePostAPI";
import {errorAndLoadingHandler} from "../utils/utilities";
import ProjectSelector from "./ProjectSelector";
import Dashboard from "../calculator/Dashboard";

export default function Manager({isAuthenticated, setIsAuthenticated}) {
  const {path} = useRouteMatch();
  const [currentProject, setCurrentProject] = useState({id: undefined, name: ""});
  const [projectInput, setProjectInput] = useState("");
  const [error, setError] = useState(null);

  console.log("Error:", error);
  console.log("projectInput:", projectInput);

  const {
    data: {username: userName},
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/users/current`);
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

  const [{isLoading: loadingBool, error: postError}, callAPI] = usePostAPI();

  const submitProject = async (event) => {
    event.preventDefault();
    // TODO
    const projectResponse = await callAPI(`http://localhost:3000/projects/list`, {
      projectInput,
    });
    console.log("projectResponse:", projectResponse, loadingBool);
    await setCurrentProject(() => {
      if (projectResponse) {
        return projectResponse;
      }
      return currentProject;
    });
    setError(postError);
  };
  const onChangeProject = (event) => {
    setProjectInput(event.target.value);
  };
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (currentProject.id) {
    console.log("currentProject Routing:", currentProject, "Path:", path);
    return (
      <Switch>
        <Route path={`${path}/:id`}>
          <Dashboard
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            // currentProject={currentProject}
            // setCurrentProject={setCurrentProject}
          />
        </Route>
      </Switch>
    );
  }
  return (
    <Card>
      <Card.Header>Project Manager</Card.Header>
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

Manager.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
