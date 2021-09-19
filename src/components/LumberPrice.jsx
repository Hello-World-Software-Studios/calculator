import React from "react";
// import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

export default function LumberPrice() {
  const twoByFourPrice = 7.00;
  const twoBySixPrice = 12.00;
  
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
