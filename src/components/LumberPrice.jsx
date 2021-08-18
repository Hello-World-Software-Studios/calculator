import React, {useEffect, useState} from "react";
// import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

export default function LumberPrice() {
  const [twoByFourPrice, setTwoByFourPrice] = useState(0);
  const [twoBySixPrice, setTwoBySixPrice] = useState(0);
  useEffect(() => {
    setTwoByFourPrice(7.0);
    setTwoBySixPrice(12.0);
  }, []);

  return (
    <Card>
      <Card.Header className="header">Current price of lumber:</Card.Header>
      <Card.Body>
        {`Price of a 2x4: $${twoByFourPrice} `}
        <br />
        {`Price of a 2x6: $${twoBySixPrice} `}
      </Card.Body>
    </Card>
  );
}

LumberPrice.propTypes = {};
