import React, {useEffect, useState} from "react";
import {Button, Card, Modal, Table} from "react-bootstrap";
import PropTypes from "prop-types";
import {CONVERSION_COEFFICIENT} from "../utils/constants";
import {twoByFourPrice} from "./LumberPrice";

export default function TotalModal({isImperialUnit, listOfWalls}) {
  const [numberOfStuds, setNumberOfStuds] = useState(0);
  const [isTotalModalOpen, setisTotalModalOpen] = useState(false);

  const numberOfFeetOfPlate = isImperialUnit
    ? Math.ceil(numberOfStuds * 3.3)
    : Math.ceil(numberOfStuds * (3.3 * CONVERSION_COEFFICIENT));
  const topAndBottomPlates = isImperialUnit
    ? `${numberOfFeetOfPlate} feet `
    : `${numberOfFeetOfPlate} metres `;
  const studHeightDivisor = isImperialUnit ? 8 : 2.4;
  // TODO make this toggleable
  const studCost = twoByFourPrice;
  const studCostTotal = numberOfStuds * studCost;
  const plateCost = (numberOfFeetOfPlate / studHeightDivisor) * studCost;
  const subTotal = studCostTotal + plateCost;
  const totalCost = 1.1 * subTotal;

  const handleModal = () => setisTotalModalOpen((PrevUnit) => !PrevUnit);

  useEffect(() => {
    const sumNumberOfStuds = listOfWalls.reduce((total, item) => total + item.studs, 0);
    setNumberOfStuds(sumNumberOfStuds);
  }, [listOfWalls]);

  return (
    <Card>
      <Card.Header className="header">Project Total:</Card.Header>
      <h1>{`$${totalCost.toFixed(2)}`}</h1>
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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>Here&apos;s Some Math!</tr>
            </thead>
            <tbody>
              <tr>
                <td>{`Number of Studs: ${numberOfStuds} @ $${studCost} each`}</td>
                <td>{`$${studCostTotal.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>{`Add your top and bottom plates: ${topAndBottomPlates}`}</td>
                <td>{`+$${plateCost.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>{`=$${subTotal.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Add ten percent just in case:</td>
                <td>x1.1</td>
              </tr>
              <tr>
                <td>Grand Total:</td>
                <td>{`=$${totalCost.toFixed(2)}`}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
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
