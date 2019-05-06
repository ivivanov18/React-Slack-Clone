import React, { useState, useRef, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";

import { setCurrentChannel } from "../../actions";

function Channels({ currentUser, setCurrentChannel }) {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");
  const [activeChannel, setActiveChannel] = useState("");

  const channelsRef = useRef(firebase.database().ref("channels"));

  useEffect(() => {
    let loadChannels = [];
    channelsRef.current.on("child_added", snap => {
      loadChannels.push(snap.val());
      setChannels(loadChannels);
      // TODO: set first channel as active channel
      setActiveChannel(snap.val().id);
    });
  }, []);

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
      })
      .catch(err => console.error(err));
  };

  const changeChannel = channel => {
    setCurrentChannel(channel);
    setActiveChannel(channel.id);
  };

  const isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  const displayChannels = channelsP =>
    channelsP.length > 0 &&
    channelsP.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item style={{ paddingBottom: "2em" }}>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels(channels)}
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

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
