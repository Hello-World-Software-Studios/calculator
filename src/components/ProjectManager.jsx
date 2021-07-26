import {Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function ProjectManager({listOfMeasurements}) {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/project/walls}").then((resp) => {
      resp.json();
    });
  }, [userData]);
  const handleClick = () => {
    setUserData([...userData, listOfMeasurements]);
  };
  return (
    <Card>
      <Card.Title>Your Project</Card.Title>
      <Card.Text>{userData.join(", ")}</Card.Text>
      <Button onClick={handleClick} variant="secondary">
        Add Wall to Project
      </Button>
    </Card>
  );
}

ProjectManager.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
};
