import React, {useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import usePostAPI from "../hooks/usePostAPI";

export default function Dashboard({
  setIsAuthenticated,
  currentProject,
  setCurrentProject,
  // userID,
}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: nameData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/users/name`);

  const errorCheckedNameData = !errData ? nameData : "Server Error!";
  const loadingCheckedNameData =
    isLoadData === false ? errorCheckedNameData : <Spinner animation="border" />;

  const [{data: incomingFromPost, isLoading: loadingBool, error: postError}, callAPI] =
    usePostAPI(`http://localhost:3000/projects/post`, {currentProject});

  console.log({data: incomingFromPost, isLoading: loadingBool, error: postError}, callAPI);

  const errorCheckedProjectData = !postError ? incomingFromPost : "Server Error Post!";
  const loadingCheckedProjectData =
    loadingBool === false ? errorCheckedProjectData : <Spinner animation="border" />;
  console.log(loadingCheckedProjectData);

  // const addProject = async (projectName) => {
  //   const projectRequestOptions = {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({projectName, userID}),
  //   };
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/projects/post`,
  //       projectRequestOptions
  //     );
  //     const json = await res.json();
  //     setCurrentProject(json[0]);
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  const submitProject = async (event) => {
    event.preventDefault();
    await callAPI();
    setError(postError);
    // await addProject(currentProject.name);
  };
  const onChangeProject = (event) => {
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: event.target.value,
      owner_id: prevState.owner_id,
    }));
  };

  return (
    <Card>
      <Card.Header>Project Dashboard</Card.Header>
      <Card.Body>
        <Form className="form" onSubmit={submitProject}>
          <Form.Label>
            Choose a name for your project, &nbsp;
            {loadingCheckedNameData}
          </Form.Label>

          <Form.Control
            placeholder="Ex: New Shed"
            required
            type="text"
            onChange={onChangeProject}
            value={currentProject.name}
          />

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Card.Body>
      <Button
        onClick={() => {
          setIsAuthenticated(false);
          localStorage.removeItem("Token");
        }}
      >
        Logout
      </Button>
    </Card>
  );
}

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner_id: PropTypes.number,
  }).isRequired,
  // userID: PropTypes.number.isRequired,
};
