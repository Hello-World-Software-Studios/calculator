import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";

export default function Dashboard({ 
  setIsAuthenticated,
  currentProject,
  setCurrentProject,
  userID,
}) {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const {nameData, isLoading, errr} = useAPI(`http://localhost:3000/users/name`);

  setUsername(nameData);

  console.log("Error:", error);
  console.log("data:", nameData, isLoading, errr);

  const addProject = async (projectName) => {
    const projectRequestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({projectName, userID}),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/projects/post`,
        projectRequestOptions
      );
      const json = await res.json();
      setCurrentProject(json[0]);
    } catch (err) {
      setError(err);
    }
  };

  const submitProject = async (event) => {
    event.preventDefault();
    await addProject(currentProject.name);
  };
  const onChangeProject = (event) => {
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: event.target.value,
      owner_id: prevState.owner_id,
    }));
  };

  return (
    <Card>
      <Card.Header>Project Dashboard</Card.Header>
      <Card.Body>
        <Form className="form" onSubmit={submitProject}>
          <Form.Label>
            Choose a name for your project, &nbsp;
            {username}
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
      </Card.Body>
      <Button onClick={() => {
        setIsAuthenticated(false);
        localStorage.removeItem("Token");
        }}>
          Logout
        </Button>
    </Card>
  );
}

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner_id: PropTypes.number,
  }).isRequired,
  userID: PropTypes.number.isRequired,
};
