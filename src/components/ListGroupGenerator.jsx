import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Card, ListGroup} from "react-bootstrap";
// import useFetchProject from "./useFetchProject";
// eslint-disable-next-line import/no-cycle

const NO_NAME_TO_DISPLAY = "No Project Selected";

export default function ListGroupGenerator({listOfWalls, currentProject, wallLength}) {
  const [listItems, setListItems] = useState([]);
  const [listItemWall, setListItemWall] = useState(0);
  const displayProjectName = currentProject == null
    ? NO_NAME_TO_DISPLAY
    : currentProject.name;

  // const {response: fetchedSQLProject, error: fetchedSQLProjectError} =
  //   useFetchProject();
  
  // const fetchErrorCheck =  fetchedSQLProjectError == null 
  //   ? fetchedSQLProject 
  //   : fetchedSQLProjectError;

  useEffect(() => {
    setListItems(listOfWalls);
    setListItemWall(wallLength)
  }, [listOfWalls, wallLength]);

  return (
    <ListGroup className="listGroup" variant="flush">
      <h3 className="listGroupHeader">{displayProjectName}</h3>
      {listItems.map((item) => (
        <ListGroup.Item key={listItems.id}>
          <Card bg="secondary">
            <Card.Body className="listGroupItem">
              {`${listItemWall} inches.`}
              <br/>
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
  currentProject: PropTypes.shape({id: PropTypes.number, name: PropTypes.string, owner_id: PropTypes.number}).isRequired,
  wallLength: PropTypes.number.isRequired,
};
