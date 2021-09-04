import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProjectManager from "./components/ProjectManager";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <ProjectManager />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
