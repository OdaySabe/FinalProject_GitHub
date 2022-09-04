import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

export default class SideNavbar extends Component {
  render() {
    return (
      <div>
        <Menu>
          <a className="menu-item" href="/trips">
            Trips
          </a>
          <a className="menu-item" href="/friends">
            Friends
          </a>
        </Menu>
      </div>
    );
  }
}
