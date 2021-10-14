import React from "react";
// import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

export const twoByFourPrice = 5.0;
export const twoBySixPrice = 9.0;

export default function LumberPrice() {
  // const twoByFourPrice = 5.0;
  // const twoBySixPrice = 9.0;

  return (
    <Card>
      <Card.Header className="header">Current price of lumber:</Card.Header>
      <Card.Body>
        Price of a 2x4: $
{twoByFourPrice}
        <br />
        Price of a 2x6: $
{twoBySixPrice}
      </Card.Body>
    </Card>
  );
}

LumberPrice.propTypes = {};
