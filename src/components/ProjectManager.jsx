import {Button, Card, CardColumns, CardGroup, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import ListOfWalls from "./ListOfWalls";
import LumberPrice from "./LumberPrice";
import Calculator from "./Calculator";
import Dashboard from "./Dashboard";
// import useAPI from "../hooks/useAPI";

const CONVERSION_COEFFICIENT = 0.3048;

export default function ProjectManager({isAuthenticated, setIsAuthenticated}) {
  const [currentProject, setCurrentProject] = useState({id: undefined, name: ""});
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [listOfWalls, setListOfWalls] = useState([]);
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const [wallLength, setWallLength] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  console.log("Error:", error);
  console.log(currentProject);
  const numberOfFeetOfPlate = isImperialUnit
    ? Math.ceil(numberOfStuds * 3.3)
    : Math.ceil(numberOfStuds * (3.3 * CONVERSION_COEFFICIENT));
  const topAndBottomPlates = isImperialUnit
    ? `${numberOfFeetOfPlate} feet `
    : `${numberOfFeetOfPlate} metres `;
  const studHeightDivisor = isImperialUnit ? 8 : 2.4;
  const studCost = 7;
  const totalCost =
    numberOfStuds * studCost + (numberOfFeetOfPlate / studHeightDivisor) * studCost;
  // helper for dev
  useEffect(() => {
    if (currentProject.id !== undefined) {
      console.log("Has Project");
    } else console.log("Has No Project");
  })

  const addWall = async (length, projectID) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({length, projectID}),
    };
    try {
      const res = await fetch(`http://localhost:3000/walls/post`, requestOptions);
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setError(err);
    }
  };
  const handlePostWall = async () => {
    setListOfWalls([
      ...listOfWalls,
      {
        wall_length: wallLength,
        studs: listOfMeasurements.length,
        list: listOfMeasurements,
      },
    ]);
    setNumberOfStuds(numberOfStuds + listOfMeasurements.length);
    await addWall(wallLength, currentProject.id);
    console.log(response);
  };
  function toggleUnits() {
    setImperialUnit((prevUnit) => !prevUnit);
    setListOfMeasurements(listOfMeasurements);
  }
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <CardGroup className="projectManager">
      <CardColumns>
        <Dashboard
          currentProject={currentProject}
          setCurrentProject={(project) => setCurrentProject(project)}
          setIsAuthenticated={setIsAuthenticated}
        />
      </CardColumns>
      <Card>
        <Card.Header>
          <h1>Carpentry Project Manager</h1>
          <Button onClick={() => toggleUnits} variant="warning">
            Swap Between Imperial and Metric
          </Button>
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <LumberPrice />
            <Card>
              <Card.Header className="header">Project Total:</Card.Header>
              <Card.Body>
                You need &nbsp;
                {numberOfStuds} 
                &nbsp;
                studs.
                <br />
                You will also need &nbsp;
                {topAndBottomPlates}
                of boards for your top and bottom plates.
                <br />
                It will cost about: $
                {(totalCost * 1.1).toFixed(2)}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="header">Directions:</Card.Header>
              <Card.Body>
                Use the Calculator component to layout a wall, and add the wall to your project.
                <br />
                <Button onClick={handleShow}>Open Calculator</Button>
                <>
                  <Modal show={isModalOpen} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Wall Stud Calculator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Calculator
                        className="calcInstance"
                        isImperialUnit={isImperialUnit}
                        listOfMeasurements={listOfMeasurements}
                        setListOfMeasurements={(e) => setListOfMeasurements(e)}
                        setWallLength={(e) => setWallLength(e)}
                        wallLength={wallLength}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button onClick={handlePostWall} variant="primary">
                        Add Wall to Project
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Card.Body>
            </Card>
          </CardGroup>
        </Card.Body>
        <ListOfWalls
          listOfWalls={listOfWalls}
          currentProject={currentProject}
          wallLength={wallLength}
        />
      </Card>
    </CardGroup>
  );
}

ProjectManager.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
