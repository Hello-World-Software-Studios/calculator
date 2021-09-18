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
      const incoming = await res.json();
      localStorage.setItem("Token", incoming.token);
      // TODO figure out why these arent functions
      setUserID(incoming.token.payload);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    }
  };
  const submitUser = async (event) => {
    event.preventDefault();
    await addUser(username, password);
  };

  const loginUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
    };
    try {
      const res = await fetch(`http://localhost:3000/users/login`, requestOptions);
      const incoming = await res.json();
      localStorage.setItem("Token", incoming.token);
      // TODO figure out why response is missing
      setUserID(incoming.token.payload);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    }
  };
  const submitLogin = async (event) => {
    event.preventDefault();
    await loginUser(username, password);
  };
  const onChangeName = (event) => {
    username = event.target.value;
  };
  const onChangePassword = (event) => {
    password = event.target.value;
  };

  return (
    <>
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
            placeholder="Enter a Password"
            required
            value={password}
          />

          <Button type="submit" variant="primary">
            Create Account
          </Button>
        </Form>
      </Card>

      <Card>
        <Card.Header>Login</Card.Header>
        <Form className="form" onSubmit={submitLogin}>
          <Form.Label>Enter your name</Form.Label>

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
            placeholder="Enter a Password"
            required
            value={password}
          />

          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </Card>
    </>
  );
}

RegisterUser.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserID: PropTypes.func.isRequired,
};
