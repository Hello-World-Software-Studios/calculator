import {Button, Card, CardGroup, Modal, Spinner} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Redirect, useParams} from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import useAPIWithCallback from "../../hooks/useAPIWithCallback";
import usePostAPI from "../../hooks/usePostAPI";
import {errorAndLoadingHandler, newListGenerator} from "../utils/utilities";
import {CONVERSION_COEFFICIENT} from "../utils/constants";
import ListOfWalls from "./ListOfWalls";
import LumberPrice, {twoByFourPrice} from "./LumberPrice";
import Calculator, {getListOfMeasurements} from "./Calculator";

export default function Dashboard({isAuthenticated, setIsAuthenticated}) {
  const {id} = useParams();
  const [currentProject, setCurrentProject] = useState({id: undefined, name: ""});
  const [isImperialUnit, setImperialUnit] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [listOfWalls, setListOfWalls] = useState([{wall_length: 0, list: [0], studs: 0}]);
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const [wallLength, setWallLength] = useState(0);
  const [error, setError] = useState(null);
  console.log("Error:", error);
  console.log("currentProject:", currentProject);
  const numberOfFeetOfPlate = isImperialUnit
    ? Math.ceil(numberOfStuds * 3.3)
    : Math.ceil(numberOfStuds * (3.3 * CONVERSION_COEFFICIENT));
  const topAndBottomPlates = isImperialUnit
    ? `${numberOfFeetOfPlate} feet `
    : `${numberOfFeetOfPlate} metres `;
  const studHeightDivisor = isImperialUnit ? 8 : 2.4;
  // TODO import from LumberPrice
  const studCost = twoByFourPrice;
  const totalCost =
    numberOfStuds * studCost + (numberOfFeetOfPlate / studHeightDivisor) * studCost;
  const {
    data: getProject,
    isLoading: isProjectLoadData,
    errorAPI: errProjectData,
  } = useAPI(`http://localhost:3000/projects?projectID=${id}`);
  const handledProjectData = errorAndLoadingHandler(
    getProject,
    isProjectLoadData,
    errProjectData,
    <Spinner animation="border" />
  );
  useEffect(() => {
    setCurrentProject(handledProjectData);
    console.log("useEffectProject:", handledProjectData);
  }, [handledProjectData]);
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
      `http://localhost:3000/walls?projectID=${currentProject.id}`
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
  }, [callGetAPI, currentProject.id, isImperialUnit]);

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
      currentProject,
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
  // TODO fix this
  const toggleUnits = () => setImperialUnit((prevUnit) => !prevUnit);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const goBacktoManager = () => {
    setCurrentProject({id: 0, name: ""});
    console.log("Hello", currentProject);
    return <Redirect to="/projects" />;
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <CardGroup className="dashboard">
      <Card>
        <Card.Header>
          <h1>
            You are working on &nbsp;
            {currentProject.name}
          </h1>
          <Button onClick={toggleUnits} variant="warning">
            Swap Between Imperial and Metric
          </Button>
          <Button onClick={goBacktoManager} variant="secondary">
            &lt;&lt; Go Back
          </Button>
          <Button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("Token");
            }}
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
            currentProject={currentProject}
            isImperialUnit={isImperialUnit}
            deleteCallback={deleteRefreshCallback}
          />
        )}
      </Card>
    </CardGroup>
  );
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  // currentProject: PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  // }),
  // setCurrentProject: PropTypes.func.isRequired,
};
// Dashboard.defaultProps = {
//   currentProject: {id: undefined, name: ""},
// };
