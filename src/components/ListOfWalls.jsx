import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import {
  errorAndLoadingHandler,
  checkForNameToDisplay,
  newListGenerator,
} from "./utilities";
import usePostAPI from "../hooks/usePostAPI";
import useAPI from "../hooks/useAPI";
import {getListOfMeasurements} from "./Calculator";

export default function ListOfWalls({
  listOfWalls,
  setListOfWalls,
  currentProject,
  isImperialUnit,
}) {
  console.log("List of Walls:", listOfWalls);

  const [{isLoading: loadingBool, error: deleteError}, callAPI] = usePostAPI();
  const {
    data: getWallData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/walls?projectID=${currentProject.id}`);
  const handledWallData = errorAndLoadingHandler(
    getWallData,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );

  useEffect(() => {
    const newListOfWalls = newListGenerator(handledWallData);
    const listOfWallsItemGenerator = (item) => {
      const gotList = getListOfMeasurements(isImperialUnit, item.wall_length);
      return {
        wallLength: item.wall_length,
        list: gotList,
        studs: gotList.length,
        id: item.id,
      };
    };
    setListOfWalls(() => newListOfWalls.map(listOfWallsItemGenerator));
  }, [handledWallData, isImperialUnit, setListOfWalls]);

  const deleteWall = async (id) => {
    const {status: deleteRes} = await callAPI(`http://localhost:3000/walls?id=${id}`);

    if (deleteRes === "Deleted!") {
      console.log("success!");
    }
  };

  console.log("WallData:", getWallData, handledWallData, isLoadData);
  console.log("Delete Response:", deleteWall, loadingBool, deleteError);
  console.log("List of Walls:", listOfWalls);
  // TODO wall length needs imperial/metric context
  return (
    <ListGroup className="listGroup" variant="flush">
      <h3 className="listGroupHeader">{checkForNameToDisplay(currentProject.name)}</h3>
      {listOfWalls ? (
        listOfWalls.map((item) => (
          <ListGroup.Item key={item.id}>
            <Card bg="secondary">
              <Card.Body className="listGroupItem">
                {item.wallLength}
                &nbsp; inches.
                <br />
                {item.studs}
                &nbsp; studs.
                <br />
                Measurements: &nbsp;
                {item.list.join(" | ")}
              </Card.Body>
              <Button variant="danger" onClick={() => deleteWall(item.id)}>
                REMOVE
              </Button>
            </Card>
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No Walls Created</ListGroup.Item>
      )}
    </ListGroup>
  );
}

ListOfWalls.propTypes = {
  listOfWalls: PropTypes.arrayOf(
    PropTypes.shape({
      wall_length: PropTypes.number,
      list: PropTypes.arrayOf(PropTypes.number),
      studs: PropTypes.number,
    })
  ).isRequired,
  setListOfWalls: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
};
