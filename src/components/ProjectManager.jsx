import React, {useContext} from "react";
import {Button, Card} from "react-bootstrap";
import {UserDataContext} from "./UserDataContext";

export default function ProjMan() {
  const userData = useContext(UserDataContext);
  const handleClick = () => {
    userData.push("new value, ");
  };
  return (
    <Card>
      <Card.Title>Your Project</Card.Title>
      <Card.Text>{userData}</Card.Text>
      <Button onClick={handleClick} variant="secondary">
        Add Wall to Project
      </Button>
    </Card>
  );
}
