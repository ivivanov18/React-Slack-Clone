import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";

function SidePanel({ currentUser }) {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c4c4c", fontSize: "1.2rem" }}
    >
      <UserPanel currentUser={currentUser} />
    </Menu>
  );
}

export default SidePanel;
