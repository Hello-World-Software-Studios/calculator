import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, CardGroup, Form} from "react-bootstrap";
import ProjectManager from "./ProjectManager";
import useFetchWall from "./useFetchWall";
import Directions from "./Directions";

function Calculator() {
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [wallLength, setWallLength] = useState(0);
  const {response: fetchedListOfMeasurements, error: fetchedListOfMeasurementsError} =
    useFetchWall(wallLength, isImperialUnit);
  console.error(fetchedListOfMeasurementsError);

  function toggleUnits() {
    setImperialUnit((prevUnit) => !prevUnit);
    setListOfMeasurements(fetchedListOfMeasurements);
  }

  const handleInputChange = (event) => {
    setWallLength(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(fetchedListOfMeasurements);
  };

  return (
    <>
      <CardGroup>
        <ProjectManager
          listOfMeasurements={listOfMeasurements}
          isImperialUnit={isImperialUnit}
        />
        <CardColumns className="column">
          <Card bg="light">
            <Card.Header>
              <Card.Title>Wall Stud Calculator</Card.Title>
            </Card.Header>
            <Form onSubmit={handleSubmit}>
              <Form.Label>Wall length</Form.Label>

              <Form.Control
                min="0"
                name="wallX"
                onChange={handleInputChange}
                required
                type="number"
                value={wallLength}
              />

              <Button type="submit" variant="primary">
                Layout wall
              </Button>

              <Card.Text>
                {`Now measuring in ${isImperialUnit ? "inches" : "milimetres"}.`}
              </Card.Text>

              <Button onClick={toggleUnits} variant="warning">
                Swap Between Imperial and Metric
              </Button>
              <Card.Body>
                {`Place your studs at: ${listOfMeasurements.join(", ")}`}
              </Card.Body>
            </Form>
          </Card>
          <Directions isImperialUnit={isImperialUnit} />
        </CardColumns>
      </CardGroup>
    </>
  );
}

export default Calculator;
