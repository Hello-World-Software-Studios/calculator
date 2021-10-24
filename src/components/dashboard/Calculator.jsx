import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, Form, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import HowToLayoutAWall from "./HowToLayoutAWall";
import {
  BASE_STUD,
  CENTER_SPACING_IMPERIAL,
  CENTER_SPACING_METRIC,
  STUD_OFFSET_IMPERIAL,
  STUD_OFFSET_METRIC,
} from "../utils/constants";

export const getListOfMeasurements = (isImperial, wall) => {
  const newArray = [BASE_STUD];
  const onCenterSpacing =
    isImperial === true ? CENTER_SPACING_IMPERIAL : CENTER_SPACING_METRIC;
  const studOffset = isImperial === true ? STUD_OFFSET_IMPERIAL : STUD_OFFSET_METRIC;

  for (let studCount = 1; studCount < Math.ceil(wall / onCenterSpacing); studCount += 1) {
    newArray.push(studCount * onCenterSpacing - studOffset);
  }
  newArray.push(wall - 2 * studOffset);
  return isImperial === true
    ? newArray
    : newArray.map((roundedItem) => Math.round(roundedItem));
};

export default function Calculator({
  isImperialUnit,
  listOfMeasurements,
  setListOfMeasurements,
  setWallLength,
  wallLength,
}) {
  const handleInputChange = (event) => {
    setWallLength(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(getListOfMeasurements(isImperialUnit, wallLength));
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
              Now measuring in &nbsp;
              {isImperialUnit ? "inches" : "milimetres"}
.
</Card.Text>

            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  Place your studs at: &nbsp;
                  {listOfMeasurements.join(", ")}
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

Calculator.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
  setListOfMeasurements: PropTypes.func.isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
  wallLength: PropTypes.number.isRequired,
  setWallLength: PropTypes.func.isRequired,
};
