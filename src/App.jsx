import "./App.css";
import Calculator from "./components/Calculator";
import React from "react";
import {UserDataProvider} from "./components/UserDataContext";
import ProjMan from "./components/ProjectManager";

function App() {
  return (
    <UserDataProvider>
      <Calculator />
      <ProjMan />
    </UserDataProvider>
  );
}

export default App;
