import "./App.css";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Manager from "./components/manager/Manager";
import Authentication from "./components/authentication/Authentication";
import UserContext from "./UserContext";

function App() {
  const authState = useState(false);
  const [isAuthenticated, setIsAuthenticated] = authState;
  const [error, setError] = useState(null);
  console.log("Auth:", isAuthenticated, "Error:", error);
  // TODO refresh token.

  useEffect(() => {
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
    checkIfStillAuthenticated();
  }, [setIsAuthenticated]);

  return (
    <UserContext.Provider value={authState}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/calculator">
              <Redirect to="/login" />
            </Route>
            <Route path="/projects">
              <Manager />
            </Route>
            <Route exact path="/register">
              <Authentication isLoginComponent={false} />
            </Route>
            <Route exact path="/login">
              <Authentication isLoginComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
