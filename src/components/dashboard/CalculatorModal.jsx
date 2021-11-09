import React, {useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Calculator from "./Calculator";
import usePostAPI from "../../hooks/usePostAPI";

export default function CalculatorModal({isImperialUnit, refreshCallback}) {
  const {id} = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [listOfMeasurements, setListOfMeasurements] = useState([]);
  const [wallLength, setWallLength] = useState(0);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  const [{isLoading: loadingBool, error: postError}, callAPI] = usePostAPI();
  console.log("PostWallData:", loadingBool, postError);

  const handlePostWall = async () => {
    const postWallContextHelper = isImperialUnit ? wallLength : wallLength / 25.4;
    const [wallData] = await callAPI(`http://localhost:3000/walls`, {
      postWallContextHelper,
      id,
    });
    if (wallData) {
      refreshCallback();
    }
  };

  return (
    <Card>
      <Card.Header className="header">Directions:</Card.Header>
      <Card.Body>
        Use the Calculator component to layout a wall, and add the wall to your project.
        <br />
        <Button onClick={handleShow}>Open Calculator</Button>
        <>
          <Modal show={isModalOpen} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Wall Stud Calculator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Calculator
                className="calculator"
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
  );
}

CalculatorModal.propTypes = {
  isImperialUnit: PropTypes.bool.isRequired,
  refreshCallback: PropTypes.func.isRequired,
};
