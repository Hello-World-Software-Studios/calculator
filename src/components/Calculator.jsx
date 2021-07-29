import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, CardGroup, Form} from "react-bootstrap";
import ProjectManager from "./ProjectManager";
import useFetch from "./useFetch";

// `http://localhost:3001/walls?wallLength=${wallLength}&isImperialUnit=${isImperialUnit}`
function Calculator() {
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [wallLength, setWallLength] = useState(0);
  const newList = useFetch(
    `http://localhost:3001/walls?wallLength=${wallLength}&isImperialUnit=${isImperialUnit}`,
    [(wallLength, isImperialUnit)]
  );

  function toggleUnits() {
    setImperialUnit((prevUnit) => !prevUnit);
    setListOfMeasurements(newList);
  }

  const handleInputChange = (event) => {
    setWallLength(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(newList);
  };

  return (
    <>
      <CardGroup>
        <CardColumns className="column">
          <Card>
            <Card.Title>Wall Stud Calculator</Card.Title>

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
                Now measuring in
                {isImperialUnit ? " inches" : " milimetres"}.
              </Card.Text>

              <Button onClick={toggleUnits} variant="warning">
                Swap Between Imperial and Metric
              </Button>
              <Card.Body>
                Place your studs at:
                {listOfMeasurements.join(", ")}
              </Card.Body>
            </Form>
          </Card>

          <Card className="directions">
            <h2>Directions:</h2>
            <Card.Body>
              In order for your drywall to line up right, the second stud is placed at
              {isImperialUnit ? " 15.25 inches" : " 387 milimetres"}. From there, you can
              hook your tape onto the second stud and proceed at spacing intervals. OR,
              should you want to mark them all in one go, simply subtract
              {isImperialUnit ? " 3/4 inches" : " 19 milimetres"}
              from each number as you measure.
            </Card.Body>
          </Card>
        </CardColumns>
        <ProjectManager
          listOfMeasurements={listOfMeasurements}
          isImperialUnit={isImperialUnit}
        />
      </CardGroup>
    </>
  );
}

export default Calculator;
