import React, {useState} from "react";
import {Card} from "react-bootstrap";

function ProjMan() {
  const [listOfWalls, setListOfWalls] = useState(["placeHolder"]);
  function setList(newElem) {
    setListOfWalls(listOfWalls.push(newElem));
  }
  return (
    <Card>
      <Card.Title>Project So Far:</Card.Title>
      <Card.Text>{setList}</Card.Text>
    </Card>
  );
}

export default ProjMan;
