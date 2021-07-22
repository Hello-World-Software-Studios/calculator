import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";

export default function ProjectManager({listOfMeasurements}) {
  // const getData = useEffect(() => {
  //   fetch("../backend/savedData").then((res) => res.data);
  // });
  const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   fetch("../backend/savedData").then((res) => setUserData(res.data));
  // }, [userData]);
  const handleClick = () => {
    setUserData([...userData, listOfMeasurements]);
  };
  return (
    <Card>
      <Card.Title>Your Project</Card.Title>
      <Card.Text>{userData.join(", ")}</Card.Text>
      <Button onClick={handleClick} variant="secondary">
        Add Wall to Project
      </Button>
    </Card>
  );
}

ProjectManager.propTypes = {
  listOfMeasurements: PropTypes.arrayOf(PropTypes.number).isRequired,
};
