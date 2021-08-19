import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Card, ListGroup} from "react-bootstrap";
import useFetchProjectName from "./useFetchProjectName";


export default function ListGroupGenerator({listOfWalls}) {
  const [listItems, setListItems] = useState([]);
  const {response: fetchedSQLProject, error: fetchedSQLProjectError} =
    useFetchProjectName();
  
  const fetchErrorCheck =  fetchedSQLProjectError == null 
    ? fetchedSQLProject 
    : fetchedSQLProject;

  useEffect(() => {
    setListItems(listOfWalls);
  }, [listOfWalls]);

  return (
    <ListGroup className="listGroup" variant="flush">
      <h3 className="listGroupHeader">{fetchErrorCheck}</h3>
      {listItems.map((item) => (
        <ListGroup.Item>
          <Card bg="secondary">
            <Card.Header>{1 + listItems.indexOf(item)}</Card.Header>
            <Card.Body className="listGroupItem">
              {`${item.length} studs.`}
              <br/>
              {`Measurements: ${item}`}
            </Card.Body>
            <Button variant="danger" >REMOVE</Button>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

ListGroupGenerator.propTypes = {
  listOfWalls: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
