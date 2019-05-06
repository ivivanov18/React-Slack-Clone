import React, { useState, useRef } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

function Channels({ currentUser }) {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");
  const channelsRef = useRef(firebase.database().ref("channels"));

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const handleChannelNameChange = evt => {
    setChannelName(evt.target.value);
  };

  const handleChannelDetailsChange = evt => {
    setChannelDetails(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (isFormValid({ channelName, channelDetails })) {
      addChannel();
    }
  };

  const addChannel = () => {
    console.log("in addChannel", channelsRef);
    const key = channelsRef.current.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    };

    channelsRef.current
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannelName("");
        setChannelDetails("");
        closeModal();
        console.log("added channel");
      })
      .catch(err => console.error(err));
  };

  const isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item style={{ paddingBottom: "2em" }}>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
      </Menu.Menu>
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name Of Channel"
                name="channelName"
                onChange={handleChannelNameChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChannelDetailsChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" />
            Check
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
}

export default Channels;
