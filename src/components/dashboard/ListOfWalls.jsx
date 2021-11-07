import React from "react";
import PropTypes from "prop-types";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import usePostAPI from "../../hooks/usePostAPI";

export default function ListOfWalls({listOfWalls, isImperialUnit, deleteCallback}) {
  console.log("List of Walls:", listOfWalls);

  const [{isLoading: loadingBool, error: deleteError}, callAPI] = usePostAPI();

  const handleDeleteWall = async (id) => {
    const {status: deleteRes} = await callAPI(`http://localhost:3000/walls?id=${id}`);

    if (deleteRes === "Deleted!") {
      deleteCallback();
    }
  };
  if (deleteError) {
    return <div>{deleteError}</div>;
  }
  const wallLengthFromMetric = (length) => (isImperialUnit ? length : length * 25.4);

  return loadingBool ? (
    <Spinner animation="border" />
  ) : (
    <ListGroup className="listGroup" variant="flush">
      <h3 className="listGroupHeader">Your Walls</h3>
      {listOfWalls.length > 0 ? (
        listOfWalls.map((item) => (
          <ListGroup.Item key={item.id} className="listGroupItem">
            <Card bg="dark" className="listGroupCards">
              <Card.Body>
                {`${Math.round(wallLengthFromMetric(item.wallLength))} ${
                  isImperialUnit ? "inches." : "milimetres."
                }`}
                <br />
                {item.studs}
                &nbsp; studs.
                <br />
                Measurements: &nbsp;
                {item.list.join(" | ")}
              </Card.Body>
              <Button variant="danger" onClick={() => handleDeleteWall(item.id)}>
                REMOVE
              </Button>
            </Card>
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item className="emptyList">
          <h1>No Walls Created</h1>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

ListOfWalls.propTypes = {
  listOfWalls: PropTypes.arrayOf(
    PropTypes.shape({
      wallLength: PropTypes.number,
      list: PropTypes.arrayOf(PropTypes.number),
      studs: PropTypes.number,
    })
  ).isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};
