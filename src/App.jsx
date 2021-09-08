import "./App.css";
import React, {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import ProjectManager from "./components/ProjectManager";
import RegisterUser from "./components/RegisterUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(0);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            render=
            {!isAuthenticated ? (
              <Redirect to="/register" />
            ) : (
              <ProjectManager
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={(boolean) => setIsAuthenticated(boolean)}
                userID={userID}
              />
            )}
          </Route>
          <Route exact path="/register">
            <RegisterUser
              render={
                !isAuthenticated ? (
                  <RegisterUser
                    setIsAuthenticated={(boolean) => setIsAuthenticated(boolean)}
                    setUserID={(id) => setUserID(id)}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
