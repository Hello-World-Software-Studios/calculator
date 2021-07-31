import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";
import ListGroupGenerator from "./ListGroupGenerator";

export default function ProjectManager({listOfMeasurements, isImperialUnit}) {
  const [listOfWalls, setListOfWalls] = useState([]);
  const [numberOfStuds, setNumberOfStuds] = useState(0);

  const handleClick = () => {
    setListOfWalls([...listOfWalls, listOfMeasurements.join(", ")]);
    setNumberOfStuds(numberOfStuds + listOfMeasurements.length);
  };

  return (
    <Card className="projectManager">
      <Card.Header>
        <h5>Carpentry Project Manager</h5>
      </Card.Header>
      <Card.Body>
        {" "}
        You need 
{' '}
{numberOfStuds}
{' '}
studs.
<br />
        You will also need
        {isImperialUnit
          ? ` ${numberOfStuds * 1.3} feet `
          : ` ${numberOfStuds * 2.5} metres `}
{" "}
        of boards for your top and bottom plates.
        <Button onClick={handleClick} variant="secondary">
          Add Wall to Project
        </Button>
      </Card.Body>

      <ListGroupGenerator listOfWalls={listOfWalls} />
    </Card>
  );
}

ProjectManager.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
};
