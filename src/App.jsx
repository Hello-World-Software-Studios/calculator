import "./App.css";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProjectManager from "./components/ProjectManager";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  console.log("Auth:", isAuthenticated);
  const setIsAuthCallback = (boolean) => {
    setIsAuthenticated(boolean);
  }
  // TODO token refresh
  // const checkIfStillAuthenticated = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/users/verify", {
  //       method: "GET",
  //       headers: {"Content-Type": "application/json", "Authorization": localStorage.token},
  //     });

  //     const refreshValid = await res.json();

  //     if (refreshValid) {
  //       setIsAuthenticated(true);
  //     } else setIsAuthenticated(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   checkIfStillAuthenticated();
  // }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/calculator">
              <ProjectManager
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthCallback}
                userID={userID}
              />
          </Route>
          <Route exact path="/register">
              <RegisterUser
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthCallback}
                setUserID={(id) => setUserID(id)}
              />
          </Route>
          <Route exact path="/login">
              <LoginUser
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthCallback}
              />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
