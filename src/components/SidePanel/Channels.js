import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";

function Channels() {
  const [channels, setChannels] = useState([]);

  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item style={{ paddingBottom: "2em" }}>
        <span>
          <Icon name="exchange" /> CHANNELS
        </span>
        ({channels.length}) <Icon name="add" />
      </Menu.Item>
    </Menu.Menu>
  );
}

export default Channels;
