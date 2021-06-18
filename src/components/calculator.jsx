import React, {useState} from 'react';

const Calculator = () => {
    
    const [listOfMeasurements, setListofMeasurements] = useState([]);
    const [unit, setUnit] = useState(true);
    const OC = unit ? 16: 406;
    const studOffset = unit ? 3/4: 19;
    
    const [wallLength, setWallLength] = useState(0);
    function layoutWall() {
        setListofMeasurements(makeAList());
    }
    const makeAList = () => {
        var newArray = [0];
        for (var i = 1; i < Math.ceil(wallLength/OC); i++) {
            if (i === 1) {
                newArray.push(OC-studOffset);
            }
            else newArray.push((i*OC)-studOffset);
        }
        newArray.push(wallLength-(2*studOffset));
        return newArray;
    }
    function toggleUnits() {
        setUnit(prevUnit => !prevUnit);
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
            <p>Wall Stud Calculator</p>
                <form onSubmit={handleSubmit}> 
                    <div>
                        <label>Wall length</label>
                        <input type="number" name="wallX" 
                        value={wallLength} onChange={handleInputChange} required />
                    </div>
                    <input type="submit" value="Layout wall"/>
                </form>
                <div>
                    <button onClick={toggleUnits}>
                        Swap Units
                    </button>
                    <p>
                        Now measuring in {unit ? 'Inches': 'Milimetres'}.
                    </p>
                </div>
                <div>
                    <p>
                        You need {listOfMeasurements.length} studs. 
                        Don't forget, you will need 3 more boards for your top and bottom plates for every 
                        {unit ? ' 96 inches': ' 2438 milimetres'} of wall.
                    </p>
                    <h2>Directions:</h2>
                    <p>
                      In order for your drywall to line up right, the second stud is placed at {unit ? '15.25 inches': '387 milimetres'}. 
                      From there, you can hook your tape onto the second stud and proceed at spacing intervals.
                      OR, should you want to mark them all in one go, simply subtract {unit ? '3/4 inches': '19 milimetres'} from each number as you measure.
                      <br/>Your wall is shown below, placing the edge of each stud on the measurments listed. 
                    </p>
                    <p>
                        Place your studs at: {listOfMeasurements.join(", ")}
                    </p>
                </div>
        </>
    );
}

export default Calculator;