import "./App.css";
import React, {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import ProjectManager from "./components/ProjectManager";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState();
  console.log(userID);
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/calculator">
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
              {
                !isAuthenticated ? (
                  <RegisterUser
                    setIsAuthenticated={(boolean) => setIsAuthenticated(boolean)}
                    setUserID={(id) => setUserID(id)}
                  />
                ) : (
                  <Redirect to="/calculator" />
                )
              }
          </Route>
          <Route exact path="/login">
              {
                !isAuthenticated ? (
                  <LoginUser
                    setIsAuthenticated={(boolean) => setIsAuthenticated(boolean)}
                    setUserID={(id) => setUserID(id)}
                  />
                ) : (
                  <Redirect to="/calculator" />
                )
              }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
