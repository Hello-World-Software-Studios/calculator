import {Button, Card, CardGroup, Form, Spinner} from "react-bootstrap";
import React, {useCallback, useEffect, useState, useContext} from "react";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAPI from "../../hooks/useAPI";
import useAPIWithCallback from "../../hooks/useAPIWithCallback";
import usePostAPI from "../../hooks/usePostAPI";
import {
  contextHelper,
  errorAndLoadingHandler,
  newListGenerator,
} from "../utils/utilities";
import WallTable from "./WallTable";
import LumberPrice from "./LumberPrice";
import {getListOfMeasurements} from "./Calculator";
import UserContext from "../../UserContext";
import DeleteProject from "./DeleteProject";
import TotalModal from "./TotalModal";
import CalculatorModal from "./CalculatorModal";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const {id} = useParams();
  console.log("ID:", id);
  const history = useHistory();

  const [isImperialUnit, setImperialUnit] = useState(true);
  const [listOfWalls, setListOfWalls] = useState([{wall_length: 0, list: [0], studs: 0}]);
  const [error, setError] = useState(null);
  console.log("Error:", error);

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

  const [{isLoading: loadingRefreshBool, error: refreshError}, callGetAPI] =
    useAPIWithCallback();

  console.log("refreshWallData:", loadingRefreshBool, refreshError);

  const listOfWallsItemGenerator = useCallback(
    (item) => {
      const gotList = getListOfMeasurements(
        isImperialUnit,
        contextHelper(isImperialUnit, item.wall_length)
      );
      console.log("ContextHelper:", contextHelper);
      return {
        wallLength: item.wall_length,
        list: gotList,
        studs: gotList.length,
        id: item.id,
      };
    },
    [isImperialUnit]
  );
  const refreshCallback = useCallback(async () => {
    const refreshedListOfWalls = await callGetAPI(
      `http://localhost:3000/walls?projectID=${id}`
    );
    const newListOfWalls = newListGenerator(refreshedListOfWalls);
    setListOfWalls(() => newListOfWalls.map(listOfWallsItemGenerator));
  }, [callGetAPI, id, listOfWallsItemGenerator]);

  useEffect(() => {
    const newListOfWalls = newListGenerator(handledWallData);
    setListOfWalls(() => newListOfWalls.map(listOfWallsItemGenerator));
  }, [handledWallData, isImperialUnit, listOfWallsItemGenerator]);

  useEffect(() => {
    refreshCallback();
  }, [isImperialUnit, refreshCallback]);

  const toggleUnits = () => setImperialUnit((prevUnit) => !prevUnit);
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
        <Card.Header className="toolbelt">
          <FontAwesomeIcon icon="check-square" />
          <h1>
            You are working on: &nbsp;
            {handledProjectName}
          </h1>
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card>
              <Form className="buttonCard">
                <Form.Label>
                  {`Now measuring in ${isImperialUnit ? "inches" : "milimetres"}.`}
                </Form.Label>
                <Button className="buttonCard" onClick={toggleUnits} variant="warning">
                  Swap Units
                </Button>
              </Form>
              <DeleteProject deleteProject={deleteProject} />
              <Button className="buttonCard" onClick={goBacktoManager} variant="warning">
                &lt;&lt; Go Back
              </Button>
              <Button
                className="buttonCard"
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem("Token");
                }}
                variant="dark"
              >
                Logout
              </Button>
            </Card>
            <LumberPrice />
            <TotalModal isImperialUnit={isImperialUnit} listOfWalls={listOfWalls} />
            <CalculatorModal
              isImperialUnit={isImperialUnit}
              refreshCallback={refreshCallback}
            />
          </CardGroup>
        </Card.Body>
        {loadingRefreshBool ? (
          <Spinner animation="border" />
        ) : (
          <WallTable
            listOfWalls={listOfWalls}
            setListOfWalls={setListOfWalls}
            isImperialUnit={isImperialUnit}
            deleteCallback={refreshCallback}
          />
        )}
      </Card>
    </CardGroup>
  );
}
