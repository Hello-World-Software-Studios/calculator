import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, Form, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import HowToLayoutAWall from "./HowToLayoutAWall";

function Calculator({
  isImperialUnit,
  listOfMeasurements,
  setListOfMeasurements,
  setWallLength,
  wallLength,
}) {
  const BASE_STUD = 0;
  const CENTER_SPACING_IMPERIAL = 16;
  const CENTER_SPACING_METRIC = 406.4;
  const STUD_OFFSET_IMPERIAL = 0.75;
  const STUD_OFFSET_METRIC = 19;

  const getListOfMeasurements = () => {
    const newArray = [BASE_STUD];
    const onCenterSpacing =
      isImperialUnit === true ? CENTER_SPACING_IMPERIAL : CENTER_SPACING_METRIC;
    const studOffset =
      isImperialUnit === true ? STUD_OFFSET_IMPERIAL : STUD_OFFSET_METRIC;

    for (
      let studCount = 1;
      studCount < Math.ceil(wallLength / onCenterSpacing);
      studCount += 1
    ) {
      newArray.push(studCount * onCenterSpacing - studOffset);
    }
    newArray.push(wallLength - 2 * studOffset);
    return isImperialUnit === true
      ? newArray
      : newArray.map((roundedItem) => Math.round(roundedItem));
  };

  const handleInputChange = (event) => {
    setWallLength(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(getListOfMeasurements);
  };

  return (
    <>
      <CardColumns className="column">
        <Card bg="light">
          <Form className="form" onSubmit={handleSubmit}>
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
              Now measuring in &nbsp
              {isImperialUnit ? "inches" : "milimetres"}
              .
            </Card.Text>

            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
{`Place your studs at: ${listOfMeasurements.join(
                  ", "
                )}`}
</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Form>
        </Card>
        <HowToLayoutAWall isImperialUnit={isImperialUnit} />
      </CardColumns>
    </>
  );
}

export default Calculator;

Calculator.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
  setListOfMeasurements: PropTypes.func.isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
  wallLength: PropTypes.number.isRequired,
  setWallLength: PropTypes.func.isRequired,
};
