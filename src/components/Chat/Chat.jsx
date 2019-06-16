import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import { connect } from "react-redux";
import { setChatkitUser } from "../../actions/chatActions";
import RoomsList from "./RoomsList/RoomsList";
import { addNewMessages, setRooms } from "../../actions/chatActions";
import Messages from "./Messages/Messages";
import { Grid } from "@material-ui/core";
import style from "./Chat.module.scss";

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.connectToChatKit();
    this.subscribeAllRooms();
  }
  connectToChatKit = async () => {
    try {
      const chatkitUser = await (await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: this.props.user
        })
      })).json();

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:1212f49a-0211-4f71-80dc-bbe873c80dd0",
        userId: chatkitUser.id,
        tokenProvider: new Chatkit.TokenProvider({
          url:
            "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1212f49a-0211-4f71-80dc-bbe873c80dd0/token"
        })
      });
      const chatkitCurrentUser = await chatManager.connect();
      this.props.setChatkitUser(chatkitCurrentUser);
    } catch (e) {
      alert(e);
    }
  };
  subscribeAllRooms = () => {
    const { chatkitCurrentUser } = this.props;
    let tempArray = [];
    let rooms = [];
    if (chatkitCurrentUser) {
      chatkitCurrentUser.rooms.map(element => {
        chatkitCurrentUser
          .subscribeToRoom({
            roomId: element.id,
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                tempArray = [message, ...tempArray];
                this.props.addNewMessages(tempArray);
              }
            }
          })
          .then(currentRoom => {
            rooms = [currentRoom, ...rooms];
            this.props.setRooms(rooms);
          });
      });
    }
  };
  componentDidUpdate = prevProps => {
    if (this.props.chatkitCurrentUser !== prevProps.chatkitCurrentUser) {
      this.subscribeAllRooms();
    }
  };
  render() {
    return (
      <div className={style.Chat}>
        <Grid container className={style.Grid}>
          <Grid md={3} item style={{ borderRight: "black solid 1px" }}>
            <RoomsList />
          </Grid>

          <Grid item constainer direction="row" xs={9}>
            <Messages />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapProps = state => ({
  chatkitCurrentUser: state.chatkitCurrentUser,
  user: state.user
});
const mapDispatch = dispatch => ({
  setChatkitUser: currentUser => dispatch(setChatkitUser(currentUser)),
  addNewMessages: messages => dispatch(addNewMessages(messages)),
  setRooms: rooms => dispatch(setRooms(rooms))
});
export default connect(
  mapProps,
  mapDispatch
)(Chat);
