import "./App.css";
import React from "react";
import {CardColumns, CardGroup} from "react-bootstrap";
import ProjectManager from "./components/ProjectManager";

function App() {
  return (
    <CardGroup>
      <CardColumns>
        <ProjectManager />
      </CardColumns>
    </CardGroup>
  );
}
export default App;
