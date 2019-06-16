import React, { Component } from "react";
import {
  Avatar,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar
} from "@material-ui/core";
import { connect } from "react-redux";
import img from "../../../img/withoutPhoto.PNG";
import { setCurrentRoom } from "../../../actions/chatActions";
import styles from "./RoomsList.module.scss";

class RoomsList extends Component {
  constructor(props) {
    super(props);
  }
  getAvatar = element => {
    let avatarURL = this.getUserFromRoom(element).avatarURL;
    if (avatarURL) {
      return avatarURL;
    } else {
      return img;
    }
  };
  getUserFromRoom = element => {
    return element.users.filter(elem => elem.id !== this.props.user.Id)[0];
  };
  componentDidUpdate = prevProps => {
    if (
      this.props.rooms &&
      prevProps.rooms !== this.props.rooms &&
      !this.props.currenRoom
    ) {
      this.props.setCurrentRoom(this.props.rooms[0]);
    }
  };
  render() {
    return this.props.rooms && this.props.rooms.length > 0 ? (
      <List className={styles.List}>
        {this.props.rooms.map(element => (
          <ListItem
            key={element.id}
            onClick={() => this.props.setCurrentRoom(element)}
          >
            {console.log(this.getUserFromRoom(element).id)}
            <ListItemAvatar>
              <Avatar src={this.getAvatar(element)} />
            </ListItemAvatar>
            <ListItemText>{this.getUserFromRoom(element).name}</ListItemText>
          </ListItem>
        ))}
      </List>
    ) : (
      <p>Just a minute</p>
    );
  }
}

const mapProps = state => ({
  rooms: state.rooms,
  user: state.user,
  chatkitCurrentUser: state.chatkitCurrentUser,
  currentRoom: state.currenRoom
});
const mapDispatch = dispatch => ({
  setCurrentRoom: room => dispatch(setCurrentRoom(room))
});
export default connect(
  mapProps,
  mapDispatch
)(RoomsList);
