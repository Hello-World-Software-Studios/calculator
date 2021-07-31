import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {Card, ListGroup} from "react-bootstrap";

export default function ListGroupGenerator({listOfWalls}) {
  const [listItems, setListItems] = useState([]);
  const [listIndex, setListIndex] = useState(0);

  useEffect(() => {
    setListItems(listOfWalls);
    setListIndex(listIndex);
  }, [listIndex, listOfWalls]);
  return (
    <ListGroup className="listGroup">
      {listItems.map((item) => (
        <ListGroup.Item>
          <Card bg="light">
            <Card.Header>{listIndex}</Card.Header>
            <Card.Body>{item}</Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

ListGroupGenerator.propTypes = {
  listOfWalls: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
