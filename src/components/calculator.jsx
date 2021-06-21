import React, {useState, useEffect} from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calculator = () => {
    
    const [listOfMeasurements, setListOfMeasurements] = useState([]);
    const [isImperialUnit, setImperialUnit] = useState(true);
    const [wallLength, setWallLength] = useState(0);
    const onCenterSpacing = isImperialUnit ? 16: 406.4;
    const studOffset = isImperialUnit ? 3/4: 19;
    
    const makeAList = () => {
        var newArray = [0];
        for (var i = 1; i < Math.ceil(wallLength/onCenterSpacing); i++) {
            if (i === 1) {
                newArray.push(onCenterSpacing-studOffset);
            }
            else newArray.push((i*onCenterSpacing)-studOffset);
        }
        newArray.push(wallLength-(2*studOffset));
        if (isImperialUnit == true) {
            return newArray;
        }
        else return newArray.map((x) => Math.round(x));
    }
    function layoutWall() {
        setListOfMeasurements(makeAList);
    }
    useEffect(() => {
        layoutWall();
    }, [isImperialUnit]);

    function toggleUnits() {
        setImperialUnit(prevUnit => !prevUnit);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        layoutWall();
    }
    const handleInputChange = (event) => {
        setWallLength(event.target.value);
    };
    

    return (
        <>
            <Card>
                <Card.Title>Wall Stud Calculator</Card.Title>
                <Form onSubmit={handleSubmit}> 
                    <Form.Label>Wall length</Form.Label>
                    <Form.Control type="number" name="wallX" value={wallLength} onChange={handleInputChange} required />
                    <Button variant="primary" type="submit">
                        Layout wall
                    </Button>
                    <Card.Text>
                        Now measuring in {isImperialUnit ? 'Inches': 'Milimetres'}.
                    </Card.Text>
                    <Button variant="warning" onClick={toggleUnits}>
                        Swap Between Imperial and Metric
                    </Button>
                </Form>
            </Card>
            <Card>
                <h2>Directions:</h2>
                <p>
                    You need {listOfMeasurements.length} studs. 
                    Don&apos;t forget, you will need 3 more boards for your top and bottom plates for every 
                    {isImperialUnit ? ' 96 inches': ' 2438 milimetres'} of wall.
                </p>
                <p>
                    In order for your drywall to line up right, the second stud is placed at {isImperialUnit ? '15.25 inches': '387 milimetres'}. 
                    From there, you can hook your tape onto the second stud and proceed at spacing intervals.
                    OR, should you want to mark them all in one go, simply subtract {isImperialUnit ? '3/4 inches': '19 milimetres'} from each number as you measure.
                    <br/>Your wall is shown below, placing the edge of each stud on the measurments listed. 
                </p>
                <p>
                    Place your studs at: {listOfMeasurements.join(", ")}
                </p>
            </Card>
        </>
    );
}

export default Calculator;