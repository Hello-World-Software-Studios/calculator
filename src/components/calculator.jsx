import React, {useState} from 'react';

const Calculator = () => {
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
    })
    return (
        <div>
            <h1>Wall Stud Calculator</h1>
        </div>
    );
}

export default Calculator;