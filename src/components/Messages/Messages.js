import React, { useMemo } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

import firebase from "../../firebase";

function Messages({ currentChannel, currentUser }) {
  const messagesRef = firebase.database().ref("messages");

  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages" />
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
