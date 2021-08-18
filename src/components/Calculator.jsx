import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, CardColumns, Form, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchWall from "./useFetchWall";
import HowToLayoutAWall from "./HowToLayoutAWall";


function Calculator({ setListOfMeasurements, isImperialUnit}) {
  const [wallLength, setWallLength] = useState(0);
  const {response: fetchedListOfMeasurements, error: fetchedListOfMeasurementsError} =
    useFetchWall(wallLength, isImperialUnit);
  console.error(fetchedListOfMeasurementsError);
  const handleInputChange = (event) => {
    event.preventDefault();
    setWallLength(event.target.value);
    setListOfMeasurements(fetchedListOfMeasurements);
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
};
