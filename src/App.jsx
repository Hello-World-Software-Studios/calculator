import "./App.css";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProjectManager from "./components/ProjectManager";
import Authentication from "./components/Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  console.log("Auth:", isAuthenticated, "Error:", error);
  const setIsAuthCallback = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // TODO refresh token.
  // Below: revokes auth if token expired
  const checkIfStillAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.Token}`,
        },
      });
      const refreshValid = await res.json();
      if (refreshValid) {
        setIsAuthenticated(true);
      } else setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    checkIfStillAuthenticated();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/calculator">
            <ProjectManager
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthCallback}
            />
          </Route>
          <Route exact path="/register">
            <Authentication
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthCallback}
              isLoginComponent={false}
            />
          </Route>
          <Route exact path="/login">
            <Authentication
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthCallback}
              // eslint-disable-next-line react/jsx-boolean-value
              isLoginComponent={true}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
