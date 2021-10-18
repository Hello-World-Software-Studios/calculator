import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";

export default function Authentication({
  isAuthenticated,
  setIsAuthenticated,
  isLoginComponent,
}) {
  const [userInformation, setuserInformation] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const addUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInformation),
    };
    try {
      const res = await fetch(`http://localhost:3000/users/register`, requestOptions);
      const incoming = await res.json();
      localStorage.setItem("Token", incoming.token);
      console.log(incoming);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };
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
      setIsAuthenticated(true);
    } catch (err) {
      setError(err);
    }
  };
  const loginOrRegister = async () => {
    await (isLoginComponent
      ? loginUser(userInformation.username, userInformation.password)
      : addUser(userInformation.username, userInformation.password));
  };
  const submitUser = async (event) => {
    event.preventDefault();
    await loginOrRegister();
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
  if (isAuthenticated) {
    return <Redirect to="/projects" />;
  }
  return (
    <Card>
      <Card.Header>{isLoginComponent ? "Login" : "Registration"}</Card.Header>
      <Form className="form" onSubmit={submitUser}>
        <Form.Label>
          {isLoginComponent ? "Enter your name" : "Enter your name to begin"}
        </Form.Label>

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
          placeholder={isLoginComponent ? "Enter your password" : "Enter a password"}
          required
          value={userInformation.password}
        />

        <Button type="submit" variant="primary">
          {isLoginComponent ? "Log In" : "Create Account"}
        </Button>
      </Form>
      <Link to={isLoginComponent ? "/register" : "/login"}>
        {isLoginComponent
          ? "Not already a User? Click here to register"
          : "Already signed up? Click here to Login"}
      </Link>
    </Card>
  );
}

Authentication.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  isLoginComponent: PropTypes.bool.isRequired,
};
