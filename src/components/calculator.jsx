import React, {useState,} from 'react';

const Calculator = () => {
<<<<<<< Updated upstream
    //const unitOfMeasure = [unit, setUnit] = useState();
=======
    
    const [output, setOutput] = useState({
        studNum: 0,
        measurments: [],
    });
    const [unit, setUnit] = useState(true);
    var OC = unit ? 16: 406;
    var studOffset = unit ? 3/4: 19;
>>>>>>> Stashed changes
    const [userValues, setUserValues] = useState({
        wallLength: 0,
        // door: {
        //     width: 0,
        //     height: 0,
        //     centerX: 0,
        // },
        // window: {
        //     width: 0,
        //     height: 0,
        //     centerX: 0,
        //     centerY: 0,
        // }
    });
    function layoutWall() {
        setOutput({studNum: userValues.wallLength/OC + 1, measurments: makeAList(),});
    }
    const makeAList = () => {
        var newArray = [0 + ', '];
        for (var i = 1; i < Math.ceil(userValues.wallLength/OC); i++) {
            if (i == 1) {
                newArray.push(OC-studOffset + ', ');
            }
            else newArray.push((i*OC)-studOffset + ', ');
        }
<<<<<<< Updated upstream
    });
    return (
        <div>
                <p>Wall Stud Calculator</p>
                <p></p>
                <form>
                    <div>
                        <label>Wall length</label>
                        <input type="number" name="wallX" required />
                        <label>Wall height</label>
                        <input type="number" name="wallY" required />
                    </div>
                    <div>
=======
        newArray.push(userValues.wallLength-(2*studOffset));
        return newArray;
    }
    function toggleUnits() {
        setUnit(prevUnit => !prevUnit);
    }
    //console.log(unitOfMeasure);
    const unitStyle = {
        backgroundColor: 'darkgrey',
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        layoutWall();
    }
    const handleInputChange =
        (event) => {
            setUserValues((prevProps) => ({
              ...prevProps,
              wallLength: event.target.value,
            }));
          };
    

    return (
        <>
            <p>Wall Stud Calculator</p>
            <p></p>
                <form onSubmit={handleSubmit}> 
                    <div>
                        <label>Wall length</label>
                        <input type="number" name="wallX" 
                        value={userValues.wallLength} onChange={handleInputChange} required />
                    </div>
                    {/* <div>
>>>>>>> Stashed changes
                        <label>Door center</label>
                        <input type="number" name="doorC" />
                        <label>Door width</label>
                        <input type="number" name="doorX" />
                        <label>Door height</label>
                        <input type="number" name="doorY" />
                    </div>
                    <div>
                        <label>Window center</label>
                        <input type="number" name="windowC" />
                        <label>Window width</label>
                        <input type="number" name="windowX" />
                        <label>Window height</label>
                        <input type="number" name="windowY" />
<<<<<<< Updated upstream
                    </div>
                    <button type="submit">Layout wall</button>
                </form>
                <button onClick={() => {
                    console.log('TODO')
                }}>
                    Swap Units
                </button> 
                <p>
                    now measuring in 
                </p>
        </div>
=======
                    </div> */}
                    <input type="submit" value="Layout wall"/>
                </form>
                <div style={unitStyle}>
                    <button onClick={toggleUnits}>
                        Swap Units
                    </button>
                    <p>
                        Now measuring in {unit ? 'Inches': 'Milimetres'}.
                    </p>
                </div>
                <div>
                    <p>
                        You need {Math.ceil(output.studNum)} studs. 
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
                        Place your studs at: {output.measurments}
                    </p>
                </div>
        </>
>>>>>>> Stashed changes
    );
}

export default Calculator;
// cd documents/github/calculator