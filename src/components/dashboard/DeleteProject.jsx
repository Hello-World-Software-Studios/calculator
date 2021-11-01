import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";

export default function DeleteProject({deleteProject}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleModal = () => setDeleteModalOpen((PrevUnit) => !PrevUnit);

  return (
    <>
      <Button onClick={handleModal} variant="dark">
        Delete Project
      </Button>

      <Modal show={isDeleteModalOpen} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This can&apos;t be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
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
