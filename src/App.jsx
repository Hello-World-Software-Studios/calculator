import "./App.css";
import React from "react";
import {CardColumns, CardGroup} from "react-bootstrap";
import Calculator from "./components/Calculator";

function App() {
  return (
    <CardGroup>
      <CardColumns>
        <Calculator />
      </CardColumns>
    </CardGroup>
  );
}
export default App;
