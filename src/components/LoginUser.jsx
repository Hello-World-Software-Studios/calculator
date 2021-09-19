import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function RegisterUser({setIsAuthenticated, setUserID}) {
  const [userInformation, setuserInformation] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const loginUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInformation),
    };
    try {
      const res = await fetch(`http://localhost:3000/users/login`, requestOptions);
      const incoming = await res.json();
      localStorage.setItem("Token", incoming.token);
      console.log(incoming.token);
      // TODO figure out why response is missing
      setUserID(incoming.token.id);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    }
  };
  const submitLogin = async (event) => {
    event.preventDefault();
    await loginUser(userInformation.username, userInformation.password);
  };
  const onChangeName = (event) => {
    setuserInformation((prevState) => ({
      username: event.target.value,
      password: prevState.password,
    }));
  };
  const onChangePassword = (event) => {
    setuserInformation((prevState) => ({
      username: prevState.username,
      password: event.target.value,
    }));
  };
  return (
    <Card>
      <Card.Header>Login</Card.Header>
      <Form className="form" onSubmit={submitLogin}>
        <Form.Label>Enter your name</Form.Label>

        <Form.Control
          placeholder="Enter your name"
          required
          onChange={onChangeName}
          type="text"
          value={userInformation.username}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={onChangePassword}
          placeholder="Enter a Password"
          required
          value={userInformation.password}
        />

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <Link to="/register">Not a User? Click here to register</Link>
    </Card>
  );
}

RegisterUser.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserID: PropTypes.func.isRequired,
};
