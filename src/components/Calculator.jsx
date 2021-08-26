import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, Form, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchWall from "./useFetchWall";
import HowToLayoutAWall from "./HowToLayoutAWall";


function Calculator({isImperialUnit, setListOfMeasurements, setWallLength, wallLength}) {
  const {response: fetchedListOfMeasurements, error: fetchedListOfMeasurementsError} =
    useFetchWall(wallLength, isImperialUnit);
  console.error(fetchedListOfMeasurementsError);
  
  const handleInputChange = (event) => {
    setWallLength(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setListOfMeasurements(fetchedListOfMeasurements);
  };
  
  return (
    <>
      <CardColumns className="column">
        <Card bg="light">
         
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Label>Wall length</Form.Label>

            <Form.Control
              min="0"
              name="wallX"
              onChange={handleInputChange}
              required
              type="number"
              value={wallLength}
            />

            <Button type="submit" variant="primary">
              Layout wall
            </Button>

            <Card.Text>
              {`Now measuring in ${isImperialUnit ? "inches" : "milimetres"}.`}
            </Card.Text>

            
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>{`Place your studs at: ${fetchedListOfMeasurements}`}</ListGroup.Item> 
              </ListGroup>              
            </Card.Body>
          </Form>
        </Card>
        <HowToLayoutAWall isImperialUnit={isImperialUnit} />
      </CardColumns>      
    </>
  );
}

export default Calculator;

Calculator.propTypes = {
  setListOfMeasurements: PropTypes.func.isRequired,
  isImperialUnit: PropTypes.bool.isRequired,
  wallLength: PropTypes.number.isRequired,
  setWallLength: PropTypes.func.isRequired,
};
