import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";

import FileModal from "./FileModal";

import firebase from "../../firebase";

function MessageForm({ messagesRef, currentChannel, currentUser }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const createMessage = () => ({
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user: {
      id: currentUser.uid,
      name: currentUser.displayName,
      avatar: currentUser.photoURL
    },
    content: message
  });

  const sendMessage = () => {
    if (message) {
      setIsLoading(true);
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setIsLoading(false);
          setMessage("");
          setErrors([]);
        })
        .catch(err => {
          setIsLoading(false);
          setErrors([...errors, err]);
        });
    } else {
      setErrors([...errors, { message: "Add a message" }]);
    }
  };

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Write your message"
        onChange={handleChange}
        className={
          errors.some(error => error.message.includes("message")) ? "error" : ""
        }
        value={message}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          onClick={sendMessage}
          disabled={isLoading}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
          onClick={openModal}
        />
        <FileModal modal={modal} closeModal={closeModal} />
      </Button.Group>
    </Segment>
  );
}

export default MessageForm;
