import React from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

function ColorPanel() {
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thing"
    >
      <Divider />
      <Button icon="add" size="small" color="blue" />
    </Sidebar>
  );
}

export default ColorPanel;
