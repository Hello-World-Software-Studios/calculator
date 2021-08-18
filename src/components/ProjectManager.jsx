import {Button, Card, CardGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";
import ListGroupGenerator from "./ListGroupGenerator";
import LumberPrice from "./LumberPrice";
import Calculator from "./Calculator";

export default function ProjectManager() {
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
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
  function setListOfMeasurementsFunction(fetchedListOfMeasurements){
    setListOfMeasurements(fetchedListOfMeasurements);
  }
  function toggleUnits() {
    setImperialUnit((prevUnit) => !prevUnit);
    setListOfMeasurements(listOfMeasurements);
  }
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  return (
  <CardGroup className="projectManager">
    <Card>
      <Card.Header>
        <h1>Carpentry Project Manager</h1>
        <Button onClick={toggleUnits} variant="warning">
          Swap Between Imperial and Metric
        </Button>
      </Card.Header>
      <Card.Body>
        <CardGroup>
        <LumberPrice />
          <Card>
            <Card.Header className="header">Project Total:</Card.Header>
            <Card.Body>
              {`You need ${numberOfStuds} studs.`}
              <br />
              {`You will also need ${topAndBottomPlates}
              of boards for your top and bottom plates.`}
              <br />
              {`It will cost about: $${(totalCost * 1.1).toFixed(2)}`}
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="header">Directions:</Card.Header>
            <Card.Body>
              Use the Calculator component to layout a wall, then click below to add the wall to your project.
              <br/>
              <Button onClick={handleShow}>
                Open Calculator
              </Button>
              <>
                <Modal show={isModalOpen} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Wall Stud Calculator</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Calculator className="calcInstance"
                      listOfMeasurements={listOfMeasurements}
                      setListOfMeasurements={setListOfMeasurementsFunction}
                      isImperialUnit={isImperialUnit}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button onClick={handleClick} variant="primary">
                      Add Wall to Project
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </Card.Body>         
          </Card>
        </CardGroup>
      </Card.Body>
      <ListGroupGenerator listOfWalls={listOfWalls} />
    </Card>
    </CardGroup>
  );
}


