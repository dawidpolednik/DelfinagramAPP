import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import img from "../../../img/withoutPhoto.PNG";
import {
  setUserProfileInfo,
  fetchFriendToApi
} from "../../../actions/friendActions";
import { connect } from "react-redux";
import styles from "./SearchMenu.module.scss";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

class SearchMenu extends React.Component {
  handleAddFriend = id => {
    this.props.fetchFriendToApi(this.props.authToken, id);
  };
  avatar = user => {
    return user ? (
      user.Photo ? (
        <Avatar
          style={{ height: 35, margin: 10 }}
          alt={`${user.GivenName}${user.Name}`}
          src={user.Photo}
        />
      ) : (
        <Avatar
          style={{ height: 35, margin: 10 }}
          alt={`${user.GivenName}${user.Name}`}
          src={img}
        >
          }`}
        </Avatar>
      )
    ) : null;
  };
  render() {
    const { open } = this.props;
    return (
      <div>
        <Popper
          open={open}
          anchorEl={this.props.inputRef}
          transition
          disablePortal
          placement="bottom"
          style={{
            paddingTop: this.props.mobile ? "5px" : "25px",
            width: this.props.mobile ? "100%" : 288
          }}
          modifiers={{
            preventOverflow: {
              enabled: true,
              padding: "20px"
            }
          }}
        >
          {({ TransitionProps, placement, style }) => {
            return (
              <Grow {...TransitionProps} id="SearchMenu">
                <Paper style={style}>
                  <ClickAwayListener
                    onClickAway={this.props.handleCloseSearchMenu}
                  >
                    <MenuList style={{ overflow: "auto", maxHeight: "50vh" }}>
                      {this.props.matchingFriends.map(element => (
                        <MenuItem key={element.Id}>
                          <Link
                            className={styles.Link}
                            to={`/user/${element.Id}`}
                            onClick={() => {
                              this.props.setUserProfileInfo(element);
                              this.props.handleCloseSearchMenu();
                            }}
                          >
                            {this.avatar(element)}
                            <Typography variant="body1">{`${
                              element.GivenName
                            } ${element.Name}`}</Typography>
                            {/* {this.props.allFriends.filter(
                              elem => elem.Id === element.Id
                            ).length === 1 ? (
                              <Fab
                                size="small"
                                color="secondary"
                                aria-label="Add"
                                onClick={() => this.handleAddFriend(element.Id)}
                              >
                                <AddIcon />
                              </Fab>
                            ) : null} */}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            );
          }}
        </Popper>
      </div>
    );
  }
}
const mapProps = state => ({
  matchingFriends: state.matchingFriends,
  user: state.user,
  authToken: state.authToken,
  allFriends: state.allFriends
});
const mapDispatch = dispatch => ({
  setUserProfileInfo: profileInfo => dispatch(setUserProfileInfo(profileInfo)),
  fetchFriendToApi: (authToken, id) => dispatch(fetchFriendToApi(authToken, id))
});
export default connect(
  mapProps,
  mapDispatch
)(SearchMenu);
