import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

function Messages() {
  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages" />
      </Segment>
      <MessageForm />
    </React.Fragment>
  );
}

export default Messages;
