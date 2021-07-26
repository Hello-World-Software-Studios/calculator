import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, Form} from "react-bootstrap";
import ProjectManager from "./ProjectManager";
import useFetch from "./useFetch";

function Calculator() {
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [wallLength, setWallLength] = useState(0);
  const ChangeUnit = () => {
    function toggleUnits() {
      setImperialUnit((prevUnit) => !prevUnit);
    }
    toggleUnits();
    const newData = useFetch(
      `http://localhost:3001/walls?wallLength=${wallLength}&isImperialUnit=${isImperialUnit}`
    );
    setListOfMeasurements(newData.response);
  };
  const handleInputChange = (event) => {
    setWallLength(event.target.value);
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = useFetch(
      `http://localhost:3001/walls?wallLength=${wallLength}&isImperialUnit=${isImperialUnit}`
    );
    setListOfMeasurements(data);
  };

  return (
    <>
      <Card>
        <Card.Title>Wall Stud Calculator</Card.Title>

        <Form onSubmit={HandleSubmit}>
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
            {isImperialUnit ? "Inches" : "Milimetres"}.
          </Card.Text>

          <Button onClick={ChangeUnit} variant="warning">
            Swap Between Imperial and Metric
          </Button>
        </Form>
      </Card>

      <Card>
        <h2>Directions:</h2>

        <p>
          You need
          {listOfMeasurements.length}
          studs. Don&apos;t forget, you will need 3 more boards for your top and bottom
          plates for every
          {isImperialUnit ? " 96 inches" : " 2438 milimetres"}
          of wall.
        </p>

        <p>
          In order for your drywall to line up right, the second stud is placed at
          {isImperialUnit ? " 15.25 inches" : " 387 milimetres"}. From there, you can hook
          your tape onto the second stud and proceed at spacing intervals. OR, should you
          want to mark them all in one go, simply subtract
          {isImperialUnit ? " 3/4 inches" : " 19 milimetres"}
          from each number as you measure.
          <br />
          Your wall is shown below, placing the edge of each stud on the measurments
          listed.
        </p>

        <p>
          Place your studs at:
          {listOfMeasurements.join(", ")}
        </p>
      </Card>
      <ProjectManager listOfMeasurements={listOfMeasurements} />
    </>
  );
}

export default Calculator;
