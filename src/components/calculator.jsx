import React, {useState,} from 'react';

const Calculator = () => {
    //const unitOfMeasure = [unit, setUnit] = useState();
    const [userValues, setUserValues] = useState({
        wallLength: 0,
        door: {
            width: 0,
            height: 0,
            centerX: 0,
        },
        window: {
            width: 0,
            height: 0,
            centerX: 0,
            centerY: 0,
        }
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
    );
}

export default Calculator;
// cd documents/github/calculator