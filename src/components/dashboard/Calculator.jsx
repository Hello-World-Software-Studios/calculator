import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Card, CardColumns, Form, ListGroup} from "react-bootstrap";
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
    ? newArray.map((toFixedItem) => toFixedItem.toFixed(2))
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
    const tempWallLength = parseInt(event.target.value, 10);
    setWallLength(tempWallLength);
    setListOfMeasurements(getListOfMeasurements(isImperialUnit, tempWallLength));
  };

  return (
    <>
      <CardColumns className="column">
        <Card bg="light">
          <Form className="form">
            <Form.Label>Wall length</Form.Label>

            <Form.Control
              min="0"
              name="wallX"
              onChange={handleInputChange}
              required
              type="number"
              step={0.01}
              value={wallLength}
            />

            <Card.Text>
              {`Now measuring in ${isImperialUnit ? "inches" : "milimetres"}.`}
            </Card.Text>

            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  {`Place your studs at: ${listOfMeasurements.join(", ")}`}
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
