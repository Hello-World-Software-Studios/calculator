import React, {useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
// import usePostAPI from "../../hooks/usePostAPI";

export default function DeleteProject({deleteProject}) {
  const history = useHistory();
  // const id = useParams();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [{isLoading: deleteBool, error: deleteError}, callDeleteAPI] = usePostAPI();
  // console.log("Delete Project:", deleteBool, deleteError);
  console.log("Modal:", isDeleteModalOpen);
  console.log("history:", history);

  const handleDeleteClose = () => setDeleteModalOpen(false);
  const handleDeleteShow = () => setDeleteModalOpen(true);
  // const deleteProject = async () => {
  //   const {status: deleteRes} = await callDeleteAPI(
  //     `http://localhost:3000/projects?id=${id}`
  //   );
  //   if (deleteRes === "Deleted!") {
  //     history.push("/projects");
  //   }
  // };
  return (
    <>
      <Button onClick={handleDeleteShow} variant="dark">
        Delete Project
      </Button>
      <Modal show={isDeleteModalOpen} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This can&apos;t be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button onClick={deleteProject} variant="primary">
            Yes, delete this project!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteProject.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};
