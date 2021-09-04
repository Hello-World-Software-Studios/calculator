import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function RegisterUser({setCurrentProject, user, setUser}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const getUser = async (username) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username}),
    };
    try {
      const res = await fetch(`http://localhost:3000/users`, requestOptions);
      const json = await res.json();
      const {username: userNameIn, id: incomingID} = json[0];
      setUser((prevState) => ({
        username: userNameIn,
        password: prevState.password,
        id: incomingID,
      }));
    } catch (err) {
      setError(err);
    }
  };

  const submitUser = async (event) => {
    event.preventDefault();
    await getUser(user.username);
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: prevState.name,
      owner_id: user.id,
    }));
    // TODO Create a login function
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
      <Card.Header>Returning Users</Card.Header>
      <Form className="form" onSubmit={submitUser}>
        <Form.Label>Login to continue</Form.Label>

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
