import {Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function ProjectManager({listOfMeasurements, isImperialUnit}) {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/walls}").then((resp) => {
      resp.json();
    });
  }, [userData]);
  const handleClick = () => {
    setUserData([...userData, listOfMeasurements]);
  };
  return (
    <Card className="projectManager">
      <Card.Title>Your Project</Card.Title>
      <Card.Text>{userData.join(", ")}</Card.Text>
      <Button onClick={handleClick} variant="secondary">
        Add Wall to Project
      </Button>
      <Card.Body>
        {" "}
        You need {listOfMeasurements.length} studs.
        <br />
        Don&apos;t forget, you will need 3 more boards for your top and bottom plates for
        every
        {isImperialUnit ? " 96 inches " : " 2438 milimetres "}
        of wall.
      </Card.Body>
    </Card>
  );
}

ProjectManager.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
};
