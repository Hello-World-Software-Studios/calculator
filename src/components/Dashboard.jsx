import React, {useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from "prop-types";

const NO_NAME_TO_DISPLAY = "No Project Selected";

export default function Dashboard({currentProject, setCurrentProject}) {
    const [user, setUser] = useState({username: "JP", password: "password", id: 1});
    const [response, setResponse] = useState({});
    const [error, setError] = useState(null);
    const displayProjectName = currentProject == null
    ? NO_NAME_TO_DISPLAY
    : currentProject.name;

    console.log(currentProject);
    // const {response: returnedProject, error: returnedProjectError} = response;
    // const handleErrors = returnedProjectError == null
    // ? returnedProject
    // : returnedProjectError;

    const addProject = async (projectName, ownerUserID) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({projectName, ownerUserID})
      };
      try {
          const res = await fetch(
          `http://localhost:3000/projects/post`,
          requestOptions
          );
          const json = await res.json();
          setResponse(json);
          } catch (err) {
              setError(err);
          } 
      return {response, error}    
    }

    const loginSubmit = (event) => {
      event.preventDefault();
      setUser(prevState => ({username: user, ...prevState}));
      // TODO Create a login function
    };
    const onChangeUser = (event) => {
      setUser(event.target.value);
    };

    const submitProject = (event) => {
      event.preventDefault();
      addProject(currentProject.name, user.id);
      setCurrentProject(response);
      console.log(currentProject);
    };
    const onChangeProject = (event) => {
      setCurrentProject(prevState => ({id: prevState.id, name: event.target.value, owner_id: prevState.owner_id}));
  }

    return (
        <Card>
            <Card.Header>{`Hello, ${user.username}`}</Card.Header>
            <Card.Body>
                {`Current Project: ${displayProjectName}`}
              <Form className="form" onSubmit={loginSubmit}>
                <Form.Label>Login to get started</Form.Label>

                <Form.Control
                  placeholder="Enter your name"
                  required
                  onChange={onChangeUser}
                  type="text"
                  value={user.username}
                />
               
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </Form>
              <Form className="form" onSubmit={submitProject}>
                <Form.Label>Choose a name for your project</Form.Label>

                <Form.Control
                  placeholder="Ex: New Shed"
                  required
                  type="text"
                  onChange={onChangeProject}
                  value={displayProjectName}
                />

                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Card.Body>

        </Card>
    )
}

Dashboard.propTypes = {
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({id: PropTypes.number, name: PropTypes.string, owner_id: PropTypes.number}).isRequired,
};