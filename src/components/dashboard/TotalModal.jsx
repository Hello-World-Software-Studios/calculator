import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {CONVERSION_COEFFICIENT} from "../utils/constants";
import {twoByFourPrice} from "./LumberPrice";

export default function TotalModal({isImperialUnit, listOfWalls}) {
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const [isTotalModalOpen, setisTotalModalOpen] = useState(false);
  const handleModal = () => setisTotalModalOpen((PrevUnit) => !PrevUnit);

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

  useEffect(() => {
    const sumNumberOfStuds = listOfWalls.reduce((total, item) => total + item.studs, 0);
    setNumberOfStuds(sumNumberOfStuds);
  }, [listOfWalls]);

  return (
    <>
      <Button onClick={handleModal} variant="dark">
        Detailed Totals
      </Button>

      <Modal show={isTotalModalOpen} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>Project Totals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

TotalModal.propTypes = {
  isImperialUnit: PropTypes.bool.isRequired,
  listOfWalls: PropTypes.arrayOf(
    PropTypes.shape({
      wallLength: PropTypes.number,
      list: PropTypes.arrayOf(PropTypes.number),
      studs: PropTypes.number,
    })
  ).isRequired,
};
