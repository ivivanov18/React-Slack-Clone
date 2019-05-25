import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";

function FileModal({ modal, closeModal, authorizedTypes, uploadFile }) {
  const [file, setFile] = useState("");

  const addFile = event => {
    const fileInput = event.target.files[0];

    if (fileInput) {
      setFile(fileInput);
    }
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        setFile("");
      }
    }
  };

  const isAuthorized = fileName =>
    authorizedTypes.includes(mime.lookup(fileName));

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header> Select an image file</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <Icon name="checkmark" />
          Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" />
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default FileModal;
