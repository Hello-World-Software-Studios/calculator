import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, Form} from "react-bootstrap";

const CENTER_SPACING_IMPERIAL = 16,
  CENTER_SPACING_METRIC = 406.4,
  STUD_OFFSET_IMPERIAL = 0.75,
  STUD_OFFSET_METRIC = 19,
  makeAList = (wallLength, isImperialUnit) => {
    const BASE_STUD = 0,
      newArray = [BASE_STUD],
      onCenterSpacing = isImperialUnit ? CENTER_SPACING_IMPERIAL : CENTER_SPACING_METRIC,
      studOffset = isImperialUnit ? STUD_OFFSET_IMPERIAL : STUD_OFFSET_METRIC;
    for (
      let studCount = 1;
      studCount < Math.ceil(wallLength / onCenterSpacing);
      studCount++
    ) {
      newArray.push(studCount * onCenterSpacing - studOffset);
    }
    newArray.push(wallLength - 2 * studOffset);
    if (isImperialUnit) {
      return newArray;
    }
    return newArray.map((roundedItem) => Math.round(roundedItem));
  };

function Calculator() {
  const [listOfMeasurements, setListOfMeasurements] = useState([]),
    [isImperialUnit, setImperialUnit] = useState(true),
    [wallLength, setWallLength] = useState(0);

  useEffect(() => {
    setListOfMeasurements(makeAList(wallLength, isImperialUnit));
  }, [isImperialUnit, wallLength]);

  function toggleUnits() {
    setImperialUnit((prevUnit) => !prevUnit);
  }

  const handleInputChange = (event) => {
    setWallLength(event.target.value);
    },
    handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(makeAList(wallLength, isImperialUnit));
    }
    

  return (
    <>
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
            Now measuring in {isImperialUnit ? "Inches" : "Milimetres"}.
          </Card.Text>

          <Button onClick={toggleUnits} variant="warning">
            Swap Between Imperial and Metric
          </Button>
        </Form>
      </Card>

      <Card>
        <h2>Directions:</h2>

        <p>
          You need {listOfMeasurements.length} studs. Don&apos;t forget, you will need 3
          more boards for your top and bottom plates for every
          {isImperialUnit ? " 96 inches" : " 2438 milimetres"} of wall.
        </p>

        <p>
          In order for your drywall to line up right, the second stud is placed at{" "}
          {isImperialUnit ? "15.25 inches" : "387 milimetres"}. From there, you can hook
          your tape onto the second stud and proceed at spacing intervals. OR, should you
          want to mark them all in one go, simply subtract{" "}
          {isImperialUnit ? "3/4 inches" : "19 milimetres"} from each number as you
          measure.
          <br />
          Your wall is shown below, placing the edge of each stud on the measurments
          listed.
        </p>

        <p>
          Place your studs at:
          {listOfMeasurements.join(", ")}
        </p>
      </Card>
    </>
  );
}

export default Calculator;
