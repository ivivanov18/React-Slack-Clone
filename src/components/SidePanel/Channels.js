import React, { useState } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

function Channels() {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const handleChannelName = evt => {
    setChannelName(evt.target.value);
  };

  const handleChannelDetails = evt => {
    setChannelDetails(evt.target.value);
  };

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
                onChange={handleChannelName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChannelDetails}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
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
