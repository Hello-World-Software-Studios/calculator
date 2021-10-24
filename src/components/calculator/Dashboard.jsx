import {Button, Card, CardGroup, Modal, Spinner} from "react-bootstrap";
import React, {useCallback, useEffect, useState, useContext} from "react";
import {Redirect, useHistory, useParams} from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import useAPIWithCallback from "../../hooks/useAPIWithCallback";
import usePostAPI from "../../hooks/usePostAPI";
import {errorAndLoadingHandler, newListGenerator} from "../utils/utilities";
import {CONVERSION_COEFFICIENT} from "../utils/constants";
import ListOfWalls from "./ListOfWalls";
import LumberPrice, {twoByFourPrice} from "./LumberPrice";
import Calculator, {getListOfMeasurements} from "./Calculator";
import UserContext from "../../UserContext";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const {id} = useParams();
  console.log("ID:", id);
  const history = useHistory();

  const [isImperialUnit, setImperialUnit] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [listOfWalls, setListOfWalls] = useState([{wall_length: 0, list: [0], studs: 0}]);
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const [wallLength, setWallLength] = useState(0);
  const [error, setError] = useState(null);
  console.log("Error:", error);
  const numberOfFeetOfPlate = isImperialUnit
    ? Math.ceil(numberOfStuds * 3.3)
    : Math.ceil(numberOfStuds * (3.3 * CONVERSION_COEFFICIENT));
  const topAndBottomPlates = isImperialUnit
    ? `${numberOfFeetOfPlate} feet `
    : `${numberOfFeetOfPlate} metres `;
  const studHeightDivisor = isImperialUnit ? 8 : 2.4;
  // TODO make this toggleable
  const studCost = twoByFourPrice;
  const totalCost =
    numberOfStuds * studCost + (numberOfFeetOfPlate / studHeightDivisor) * studCost;

  const [{isLoading: deleteBool, error: deleteError}, callDeleteAPI] = usePostAPI();
  console.log("Delete Project:", deleteBool, deleteError);
  const {
    data: {name: getProjectName},
    isLoading: isProjectLoadData,
    errorAPI: errProjectData,
  } = useAPI(`http://localhost:3000/projects?id=${id}`);
  const handledProjectName = errorAndLoadingHandler(
    getProjectName,
    isProjectLoadData,
    errProjectData,
    <Spinner animation="border" />
  );

  const {
    data: getWallData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/walls?projectID=${id}`);
  const handledWallData = errorAndLoadingHandler(
    getWallData,
    isLoadData,
    errData,
    <Spinner animation="border" />
  );

  console.log("getWallData:", handledWallData, isLoadData);
  useEffect(() => {
    if (errData) {
      setError(errData);
    }
  }, [errData]);

  const [{isLoading: loadingBool, error: postError}, callAPI] = usePostAPI();
  const [{isLoading: loadingRefreshBool, error: refreshError}, callGetAPI] =
    useAPIWithCallback();

  console.log("PostWallData:", loadingBool, postError);
  console.log("refreshWallData:", loadingRefreshBool, refreshError);

  const deleteRefreshCallback = useCallback(async () => {
    const refreshedListOfWalls = await callGetAPI(
      `http://localhost:3000/walls?projectID=${id}`
    );
    const newListOfWalls = newListGenerator(refreshedListOfWalls);
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
  }, [callGetAPI, id, isImperialUnit]);

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
  }, [handledWallData, isImperialUnit]);

  useEffect(() => {
    const sumNumberOfStuds = listOfWalls.reduce((total, item) => total + item.studs, 0);
    setNumberOfStuds(sumNumberOfStuds);
  }, [listOfWalls]);

  const handlePostWall = async () => {
    const [wallData] = await callAPI(`http://localhost:3000/walls`, {
      wallLength,
      id,
    });
    setListOfWalls([
      ...listOfWalls,
      {
        wallLength: wallData.wall_length,
        list: listOfMeasurements,
        studs: listOfMeasurements.length,
        id: wallData.id,
      },
    ]);
  };

  const toggleUnits = () => setImperialUnit((prevUnit) => !prevUnit);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const handleDeleteClose = () => setDeleteModalOpen(false);
  const handleDeleteShow = () => setDeleteModalOpen(true);
  const goBacktoManager = () => history.push("/projects");
  const deleteProject = async () => {
    const {status: deleteRes} = await callDeleteAPI(
      `http://localhost:3000/projects?id=${id}`
    );

    if (deleteRes === "Deleted!") {
      goBacktoManager();
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <CardGroup className="dashboard">
      <Card>
        <Card.Img variant="bottom" src="./public/tape.png" />
        <Card.Header>
          <h1>
            You are working on: &nbsp;
            {handledProjectName}
          </h1>
          <Button onClick={toggleUnits} variant="warning">
            Swap Between Imperial and Metric
          </Button>
          <Button onClick={handleDeleteShow} variant="dark">
            Delete Project
          </Button>
          <>
            <Modal show={isDeleteModalOpen} onHide={handleDeleteClose}>
              <Modal.Header>
                <Modal.Title>Delete Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure? This can&apos;t be undone.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                  Close
                </Button>
                <Button onClick={deleteProject} variant="primary">
                  Yes, delete this project!
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <Button onClick={goBacktoManager} variant="warning">
            &lt;&lt; Go Back
          </Button>
          <Button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("Token");
            }}
            variant="dark"
          >
            Logout
          </Button>
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <LumberPrice />
            <Card>
              <Card.Header className="header">Project Total:</Card.Header>
              <Card.Body>
                You need &nbsp;
                {numberOfStuds}
                &nbsp; studs.
                <br />
                You will also need &nbsp;
                {topAndBottomPlates}
                of boards for your top and bottom plates.
                <br />
                It will cost about: $
{(totalCost * 1.1).toFixed(2)}
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="header">Directions:</Card.Header>
              <Card.Body>
                Use the Calculator component to layout a wall, and add the wall to your
                project.
                <br />
                <Button onClick={handleShow}>Open Calculator</Button>
                <>
                  <Modal show={isModalOpen} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Wall Stud Calculator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Calculator
                        className="calcInstance"
                        isImperialUnit={isImperialUnit}
                        listOfMeasurements={listOfMeasurements}
                        setListOfMeasurements={(e) => setListOfMeasurements(e)}
                        setWallLength={(e) => setWallLength(e)}
                        wallLength={wallLength}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button onClick={handlePostWall} variant="primary">
                        Add Wall to Project
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Card.Body>
            </Card>
          </CardGroup>
        </Card.Body>
        {loadingBool || loadingRefreshBool ? (
          <Spinner animation="border" />
        ) : (
          <ListOfWalls
            listOfWalls={listOfWalls}
            setListOfWalls={setListOfWalls}
            isImperialUnit={isImperialUnit}
            deleteCallback={deleteRefreshCallback}
          />
        )}
      </Card>
    </CardGroup>
  );
}
