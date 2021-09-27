import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import usePostAPI from "../hooks/usePostAPI";

export default function Dashboard({
  setIsAuthenticated,
  currentProject,
  setCurrentProject,
}) {
  const [error, setError] = useState(null);
  console.log("Error:", error);

  const {
    data: nameData,
    isLoading: isLoadData,
    errorAPI: errData,
  } = useAPI(`http://localhost:3000/users/name`);
  const errorCheckedName = !errData ? nameData : "Server Error!";
  const loadingCheckedName =
    isLoadData === false ? errorCheckedName : <Spinner animation="border" />;

  const [{data: incomingProjectData, isLoading: loadingBool, error: postError}, callAPI] =
    usePostAPI(`http://localhost:3000/projects/post`, {currentProject});
  console.log(
    {data: incomingProjectData, isLoading: loadingBool, error: postError},
    callAPI
  );
  const errorCheckedProjectData = !postError ? incomingProjectData : "Server Error Post!";
  const loadingCheckedProjectData = useMemo(
    () =>
      loadingBool === false ? errorCheckedProjectData : <Spinner animation="border" />,
    [errorCheckedProjectData, loadingBool]
  );
  useEffect(() => {
    if (loadingCheckedProjectData) {
      setCurrentProject(loadingCheckedProjectData);
    }
  }, [loadingCheckedProjectData, setCurrentProject]);

  console.log("value returned from API:", loadingCheckedProjectData, "current Project State:", currentProject);

  const submitProject = async (event) => {
    event.preventDefault();
    await callAPI();
    await setCurrentProject(() => {
      if (loadingCheckedProjectData) {
        return loadingCheckedProjectData;
      } return currentProject;
    });
    setError(postError);
  };

  const onChangeProject = (event) => {
    setCurrentProject((prevState) => ({
      id: prevState.id,
      name: event.target.value,
    }));
  };

  return (
    <Card>
      <Card.Header>Project Dashboard</Card.Header>
      <Card.Body>
        <Form className="form" onSubmit={submitProject}>
          <Form.Label>
            Choose a name for your project, &nbsp;
            {loadingCheckedName}
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
  }),
};
Dashboard.defaultProps = {
  currentProject: {id: undefined, name: ""}
};
