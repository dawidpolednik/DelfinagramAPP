import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { getMessagesFromRoom } from "../../../actions/chatActions";
import img from "../../../img/withoutPhoto.PNG";
import MessageInput from "./MessageInput/MessageInput";
import styles from "./Messages.module.scss";
class Messages extends Component {
  constructor(props) {
    super(props);
  }
  getAvatar = element => {
    let avatarURL = element.sender.avatarURL;

    if (avatarURL) {
      return avatarURL;
    } else {
      return img;
    }
  };
  getUserFromMessage = element => {
    return element.room.users.filter(elem => elem.id !== this.props.user.Id)[0];
  };
  componentDidMount = () => {
    this.fetchMessagesFromRoom();
  };
  fetchMessagesFromRoom = async () => {
    const { chatkitCurrentUser, currentRoom } = this.props;
    try {
      const oldMessages = await chatkitCurrentUser.fetchMultipartMessages({
        roomId: currentRoom.id,
        direction: "older",
        limit: 50
      });
      this.props.getMessagesFromRoom(oldMessages);
    } catch (e) {}
  };
  sortMessages = (a, b) => {
    if (new Date(a.createdAt) < new Date(b.createdAt)) return -1;
    if (new Date(a.createdAt) > new Date(b.createdAt)) return 1;
    return 0;
  };
  render() {
    const { messages, currentRoom } = this.props;
    return (
      <div className={styles.Wrapper}>
        {messages && currentRoom ? (
          <List className={styles.List}>
            {messages
              .filter(element => element.roomId === currentRoom.id)
              .sort(this.sortMessages)
              .map(message => (
                <ListItem
                  key={message.id}
                  className={styles.ListItem}
                  style={
                    message.sender.id === this.props.user.Id
                      ? {
                          alignSelf: "flex-end",
                          alignItems: "flex-end",
                          justifyContent: "flex-end"
                        }
                      : {}
                  }
                >
                  {message.sender.id !== this.props.user.Id ? (
                    <>
                      <ListItemAvatar>
                        <Avatar
                          className={styles.Avatar}
                          src={this.getAvatar(message)}
                        />
                      </ListItemAvatar>
                      <Typography
                        style={{ color: "white" }}
                        variant="subtitle1"
                        className={styles.Message}
                      >
                        {message.text}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="subtitle1"
                        className={styles.Message}
                        style={{ color: "white" }}
                      >
                        {message.text}
                      </Typography>
                      <ListItemAvatar>
                        <Avatar
                          className={styles.Avatar}
                          src={this.getAvatar(message)}
                        />
                      </ListItemAvatar>
                    </>
                  )}
                </ListItem>
              ))}
          </List>
        ) : null}
        <MessageInput />
      </div>
    );
  }
}
const mapProps = state => ({
  chatkitCurrentUser: state.chatkitCurrentUser,
  currentRoom: state.currentRoom,
  messages: state.messages,
  user: state.user
});
const mapDispatch = dispatch => ({
  getMessagesFromRoom: messages => dispatch(getMessagesFromRoom(messages))
});
export default connect(
  mapProps,
  mapDispatch
)(Messages);
