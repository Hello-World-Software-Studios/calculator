import React from "react";
import PropTypes from "prop-types";
import {Card, Button, Spinner, Table} from "react-bootstrap";
import usePostAPI from "../../hooks/usePostAPI";

export default function WallTable({listOfWalls, isImperialUnit, deleteCallback}) {
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
    <Table className="wallTable" bordered hover size="sm">
      <thead className="wallTableHead">
        <h3>Your Walls</h3>
      </thead>
      {listOfWalls.length > 0 ? (
        listOfWalls.map((item) => (
          <tr key={item.id} className="wallRow">
            <td>
              <Card bg="dark" className="wallTableCard">
                <Card.Body className="wallTableCardBody">
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
              </Card>
            </td>
            <td>
              <Card bg="dark" className="wallTableDeleteCard">
                <Button variant="danger" onClick={() => handleDeleteWall(item.id)}>
                  REMOVE
                </Button>
              </Card>
            </td>
          </tr>
        ))
      ) : (
        <tr className="wallRow">
          <td>
            <h1>No Walls Created</h1>
          </td>
        </tr>
      )}
    </Table>
  );
}

WallTable.propTypes = {
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
