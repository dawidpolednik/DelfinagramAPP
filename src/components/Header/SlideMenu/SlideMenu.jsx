import React from "react";
import { Component } from "react";
import { Drawer } from "@material-ui/core/";
import { MenuItem, MenuList } from "@material-ui/core";
import { Link } from "react-router-dom";
import style from "./SlideMenu.module.scss";
import LogOut from "./LogOut/LogOut";
import { connect } from "react-redux";

class SlideMenu extends Component {
  render() {
    const publicDrawerItems = (
      <div>
        <MenuItem>
          <Link to="/login">Log in</Link>
        </MenuItem>
      </div>
    );

    const privateDrawerItems = this.props.authToken ? (
      <div>
        <MenuItem>
          <Link to="/home">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/userProfile">My profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/newPost">Add a post</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/chat">Chat</Link>
        </MenuItem>
        <LogOut />
      </div>
    ) : (
      publicDrawerItems
    );

    return (
      <Drawer open={this.props.open} onClose={this.props.handleClickMenu}>
        <div
          className={style.DrawerDiv}
          tabIndex={0}
          role="button"
          onClick={this.handleClickMenu}
          onKeyDown={this.handleClickMenu}
        >
          <MenuList className={style.MenuList}>{privateDrawerItems}</MenuList>
        </div>
      </Drawer>
    );
  }
}

export default connect(state => ({ authToken: state.authToken }))(SlideMenu);
