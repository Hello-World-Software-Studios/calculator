import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

export default function Directions({isImperialUnit}) {
  const unitSwappedValues = (imperialValue, metricValue) =>
    isImperialUnit ? imperialValue : metricValue;
  return (
    <Card className="directions">
      <h2>How to layout a wall:</h2>
      <Card.Body>
        {`In order for your drywall to line up right, the second stud is placed at
        ${unitSwappedValues(" 15.25 inches ", " 387 milimetres ")}
        instead of the standard spacing of
        ${unitSwappedValues(" 16 inches", " 406 milimetres")}
        . From there, you can hook your
        tape onto the second stud and proceed at spacing intervals. OR, should you want to
        mark them all in one go, simply subtract
        ${unitSwappedValues(" 3/4 inches ", " 19 milimetres ")}
        from each number as you measure.`}
      </Card.Body>
    </Card>
  );
}

Directions.propTypes = {
  isImperialUnit: PropTypes.bool.isRequired,
};
