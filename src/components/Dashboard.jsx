import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function Dashboard({user, currentProject, setCurrentProject}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const addProject = async (projectName, ownerUserID) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({projectName, ownerUserID}),
    };
    try {
      const res = await fetch(`http://localhost:3000/projects/post`, requestOptions);
      const json = await res.json();
      setCurrentProject(json[0]);
    } catch (err) {
      setError(err);
    }
  };

  const submitProject = async (event) => {
    event.preventDefault();
    await addProject(currentProject.name, user.id);
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
            Choose a name for your project
            {user.username}
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
    </Card>
  );
}

Dashboard.propTypes = {
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner_id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
