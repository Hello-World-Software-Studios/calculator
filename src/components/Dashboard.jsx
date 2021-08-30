import React, {useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from "prop-types";
import checkForNameToDisplay from './reusableCode';

const PRODUCTION_USER_ID = 1;

export default function Dashboard({currentProject, setCurrentProject}) {
    const [user, setUser] = useState({username: null, password: "password", id: PRODUCTION_USER_ID});
    const [error, setError] = useState(null);

    console.log("Error:", error);
    console.log("User", user);
    console.log("currentProject", currentProject);
    
    const addUser = async (username, password) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
      };
      try {
        const res = await fetch(
        `http://localhost:3000/users/post`,
        requestOptions
        );
        const json = await res.json();
        const {id: incomingID} = json[0];
        console.log(json[0]);
        setUser(prevState => ({username: prevState.username, password: prevState.password, id: incomingID}));
        } catch (err) {
            setError(err);
        } 
    }

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
          console.log(json[0]);
          setCurrentProject(json[0]);
          } catch (err) {
              setError(err);
          }    
    }

    const submitUser = async (event) => {
      event.preventDefault();
      // TODO find a way to generate a new userID based on SQL table
      await addUser(user.username, user.password);
      setCurrentProject(prevState => ({...prevState, owner_id: user.id}))
      // TODO Create a login function
    };
    const onChangeUser = (event) => {
      setUser(prevState => ({username: event.target.value, password: prevState.password, id: prevState.id}));
    };

    const submitProject = async (event) => {
      event.preventDefault();
      await addProject(currentProject.name, user.id);
    };
    const onChangeProject = (event) => {
      setCurrentProject(prevState => ({id: prevState.id, name: event.target.value, owner_id: prevState.owner_id}));
  }

    return (
        <Card>
            <Card.Header>{`Hello, ${user.username}`}</Card.Header>
            <Card.Body>
                Current Project: 
                {checkForNameToDisplay(currentProject.name)}
              <Form className="form" onSubmit={submitUser}>
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
                  value={currentProject.name}
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