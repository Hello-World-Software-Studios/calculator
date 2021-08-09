import {Button, Card, CardGroup} from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";
import ListGroupGenerator from "./ListGroupGenerator";
import LumberPrice from "./LumberPrice";

export default function ProjectManager({listOfMeasurements, isImperialUnit}) {
  const [listOfWalls, setListOfWalls] = useState([]);
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const numberOfFeetOfPlate = isImperialUnit 
    ? Math.ceil(numberOfStuds * 3.3) 
    : Math.ceil(numberOfStuds / 2.5);
  const topAndBottomPlates = isImperialUnit
    ? ` ${numberOfFeetOfPlate} feet `
    : ` ${numberOfFeetOfPlate} metres `;
  const studCost = 7;
  const totalCost = (numberOfStuds * studCost) + ((numberOfFeetOfPlate / 8) * studCost);
  const handleClick = () => {
    setListOfWalls([...listOfWalls, listOfMeasurements]);
    setNumberOfStuds(numberOfStuds + listOfMeasurements.length);
  };

  return (
    <Card className="projectManager">
      <Card.Header>
        <h1>Carpentry Project Manager</h1>
      </Card.Header>
      <Card.Body>
        <CardGroup>
        <LumberPrice />
          <Card>
          <Card.Header>Project Total:</Card.Header>
          <Card.Body>
            {`You need ${numberOfStuds} studs.`}
            <br />
            {`You will also need ${topAndBottomPlates}
            of boards for your top and bottom plates.`}
            <br />
            {`It will cost: $${totalCost.toFixed(2)}`}
          </Card.Body>
          </Card>
          <Card>
          <Card.Header>Directions:</Card.Header>
          <Card.Body>
            Use the Calculator component to layout a wall, then click below to add the wall to your project.
            <Button onClick={handleClick} variant="primary">
              Add Wall to Project
            </Button>
          </Card.Body>
         
          </Card>
        </CardGroup>
      </Card.Body>
      <ListGroupGenerator listOfWalls={listOfWalls} />
    </Card>
  );
}

ProjectManager.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
};
