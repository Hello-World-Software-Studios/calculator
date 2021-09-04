import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function RegisterUser({setCurrentProject, user, setUser}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const addUser = async (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
    };
    try {
      const res = await fetch(`http://localhost:3000/users/post`, requestOptions);
      const [{id: incomingID}] = await res.json();
      setUser((prevState) => ({
        username: prevState.username,
        password: prevState.password,
        id: incomingID,
      }));
    } catch (err) {
      setError(err);
    }
  };
  const submitUser = async (event) => {
    event.preventDefault();
    await addUser(user.username, user.password);
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: prevState.name,
      owner_id: user.id,
    }));
  };
  const onChangeUser = (event) => {
    setUser((prevState) => ({
      username: event.target.value,
      password: prevState.password,
      id: prevState.id,
    }));
  };

  return (
    <Card>
      <Card.Header>Registration</Card.Header>
      <Form className="form" onSubmit={submitUser}>
        <Form.Label>Enter your name to begin</Form.Label>

        <Form.Control
          placeholder="Enter your name"
          required
          onChange={onChangeUser}
          type="text"
          value={user.username}
        />

        <Button type="submit" variant="primary">
          Create Account
        </Button>
      </Form>
    </Card>
  );
}

RegisterUser.propTypes = {
  setCurrentProject: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};
