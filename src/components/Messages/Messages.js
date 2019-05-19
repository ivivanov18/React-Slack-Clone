import React, { useState, useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

import firebase from "../../firebase";

function Messages({ currentChannel, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const messagesRef = firebase.database().ref("messages");

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListeners(currentChannel.id);
    }
  });

  const addListeners = channelId => {
    addMessageListener(channelId);
  };

  const addMessageListener = channelId => {
    let loadedMessages = [];
    messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      setMessages(loadedMessages);
      setMessagesLoading(false);
    });
  };

  const displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message.timestamp} message={message} user={currentUser} />
    ));

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={messagesRef}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
}

export default Messages;
