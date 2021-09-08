import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function RegisterUser({setIsAuthenticated, setUserID}) {
  let password;
  let username;
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const addUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
    };
    try {
      const res = await fetch(`http://localhost:3000/users/register`, requestOptions);
      const [{id: incomingID}] = await res.json();
      setUserID(incomingID);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    }
  };
  const submitUser = async (event) => {
    event.preventDefault();
    await addUser(username, password);
  };
  const onChangeName = (event) => {
    username = event;
  };
  const onChangePassword = (event) => {
    console.log("ocp:", event.target);
    password = event.target.value;
  };

  return (
    <Card>
      <Card.Header>Registration</Card.Header>
      <Form className="form" onSubmit={submitUser}>
        <Form.Label>Enter your name to begin</Form.Label>

        <Form.Control
          placeholder="Enter your name"
          required
          onChange={onChangeName}
          type="text"
          value={username}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={onChangePassword}
          required
          value={password}
        />

        <Button type="submit" variant="primary">
          Create Account
        </Button>
      </Form>
    </Card>
  );
}

RegisterUser.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserID: PropTypes.func.isRequired,
};
