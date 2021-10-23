import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import {Redirect, Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import usePostAPI from "../../hooks/usePostAPI";
import {errorAndLoadingHandler} from "../utils/utilities";
import ProjectSelector from "./ProjectSelector";
import Dashboard from "../calculator/Dashboard";
import UserContext from "../../UserContext";

export default function Manager() {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const history = useHistory();
  const {path} = useRouteMatch();
  const [projectInput, setProjectInput] = useState("");
  const [error, setError] = useState(null);

  console.log("Manager Error:", error);
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
    const {id: returnID} = await callAPI(`http://localhost:3000/projects`, {
      projectInput,
    });
    console.log("projectResponse:", returnID, loadingBool);
    history.push(`/projects/${returnID}`);
    setError(postError);
  };
  const onChangeProject = (event) => {
    setProjectInput(event.target.value);
  };
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <Dashboard />
      </Route>
      <Route path={path}>
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
            <ProjectSelector />
          </Card.Body>
        </Card>
      </Route>
    </Switch>
  );
}
