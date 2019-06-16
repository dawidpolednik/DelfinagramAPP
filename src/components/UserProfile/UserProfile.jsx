import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography, withStyles, IconButton } from "@material-ui/core";
import style from "../UserProfile/UserProfile.module.scss";
import styles from "../UserProfile/UserProfile.styles";
import PostPhoto from "./PostPhoto";
import EditProfile from "./EditProfile/EditProfile";
import RemoveProfile from "./RemoveProfile/RemoveProfile";
import img from "../../img/withoutPhoto.PNG";
import { connect } from "react-redux";
import {
  fetchFriendToApi,
  getFriendsFromAPI,
  fetchUserPosts,
  deleteFriendFromAPI,
  fetchToggleShowUserPosts,
  setUserProfileInfo
} from "../../actions/friendActions";
import FriendsList from "./FriendsList/FriendsList";
import { withRouter } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEditPageisOpen: false,
      modalDeletePageisOpen: false,
      modalFriendsList: false
    };
    if (this.props.location.pathname === "/userProfile") {
      this.state = { posts: this.props.posts, user: this.props.user };
    } else {
      this.props.fetchUserPosts(
        this.props.userProfileInfo.Id,
        this.props.authToken
      );
      this.state = {
        posts: this.props.otherUserPosts,
        user: this.props.userProfileInfo
      };
    }
  }
  componentDidMount = () => {
    this.props.getFriendsFromAPI(this.props.authToken);
  };
  handleEditDialog = () => {
    this.setState(prevState => ({
      modalEditPageisOpen: !prevState.modalEditPageisOpen
    }));
  };
  handleDeleteDialog = () => {
    this.setState(prevState => ({
      modalDeletePageisOpen: !prevState.modalDeletePageisOpen
    }));
  };
  handleAddFriendButton = () => {
    this.props.fetchFriendToApi(
      this.props.authToken,
      this.props.userProfileInfo.Id
    );
  };
  handleOpenFriendsList = () => {
    this.setState(prevState => ({
      modalFriendsList: !prevState.modalFriendsList
    }));
  };
  handleShowPosts = () => {
    this.props.fetchToggleShowUserPosts(
      !this.state.user.Show,
      this.props.userProfileInfo.Id,
      this.props.authToken
    );
    this.props.setUserProfileInfo({
      ...this.props.userProfileInfo,
      Show: !this.state.user.Show
    });
  };
  componentDidUpdate = prevProps => {
    if (prevProps.allFriends !== this.props.allFriends) {
      if (this.props.location.pathname !== "/userProfile") {
        this.props.fetchUserPosts(
          this.props.userProfileInfo.Id,
          this.props.authToken
        );
        this.setState({
          posts: this.props.otherUserPosts,
          user: this.props.userProfileInfo
        });
      }
    }
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      });
    }
    if (this.props.otherUserPosts !== prevProps.otherUserPosts) {
      this.setState({
        posts: this.props.otherUserPosts,
        user: this.props.userProfileInfo
      });
    }
    if (this.props.userProfileInfo !== prevProps.userProfileInfo) {
      if (this.props.location.pathname !== "/userProfile") {
        this.props.fetchUserPosts(
          this.props.userProfileInfo.Id,
          this.props.authToken
        );
        this.setState({
          posts: this.props.otherUserPosts,
          user: this.props.userProfileInfo
        });
      }
    }
    if (
      prevProps.location.pathname !== "/userProfile" &&
      this.props.location.pathname === "/userProfile"
    ) {
      this.setState({ posts: this.props.posts, user: this.props.user });
    }
  };
  render() {
    const { classes, allFriends } = this.props;
    const checkUser = () => {
      if (this.state.user) {
        return (
          <>
            <Typography
              variant="headline"
              align="justify"
              style={{ paddingTop: "10px" }}
              className={classNames(classes.typography, classes.loginControl)}
            >
              {this.state.user.GivenName && this.state.user.Name
                ? `${this.state.user.GivenName}  ${this.state.user.Name}`
                : `Please edit your profile`}
            </Typography>
            {this.props.location.pathname !== "/userProfile" ? (
              this.props.allFriends.filter(
                element => element.Id === this.props.userProfileInfo.Id
              ).length === 1 ? (
                <IconButton onClick={this.handleShowPosts}>
                  {!this.state.user.Show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ) : null
            ) : null}
          </>
        );
      } else return null;
    };
    return (
      <>
        <Grid container direction="column" className={classes.wrap}>
          <Grid item>
            <Card className={style.ProfileContainer}>
              {this.state.user ? (
                this.state.user.Photo ? (
                  <Avatar
                    alt={`${this.state.user.GivenName}${this.state.user.Name}`}
                    src={this.state.user.Photo}
                    className={classes.avatar}
                  />
                ) : (
                  <Avatar
                    alt={`${this.state.user.GivenName}${this.state.user.Name}`}
                    src={img}
                    className={classes.avatar}
                  />
                )
              ) : null}
              <CardContent className={style.BioContainer}>
                <div className={style.ButtonContainer}>
                  {checkUser()}
                  {this.props.location.pathname === "/userProfile" ? (
                    <>
                      <Button
                        variant="contained"
                        className={classes.edit}
                        onClick={this.handleEditDialog}
                      >
                        Edit profile
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.delete}
                        onClick={this.handleDeleteDialog}
                      >
                        Delete profile
                      </Button>
                    </>
                  ) : null}
                </div>

                <Typography
                  variant="headline"
                  style={{ fontSize: "0.7rem" }}
                  className={classes.typography}
                >
                  {this.state.posts && this.state.posts.length > 0
                    ? `Posts: ${this.state.posts.length}`
                    : "Posts: 0"}
                </Typography>
                <button
                  className={style.TransparentButton}
                  onClick={this.handleOpenFriendsList}
                >
                  <Typography
                    variant="headline"
                    style={{ fontSize: "0.7rem" }}
                    className={classes.typography}
                  >
                    {this.props.location.pathname === "/userProfile"
                      ? allFriends && allFriends.length > 0
                        ? `Friends: ${allFriends.length}`
                        : "Friends: 0"
                      : null}
                  </Typography>
                </button>
                {this.props.location.pathname !== "/userProfile" ? (
                  this.props.allFriends.filter(
                    element => element.Id === this.props.userProfileInfo.Id
                  ).length === 1 ? (
                    <Button
                      className={classes.removeFriendButton}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        this.props.deleteFriendFromAPI(
                          this.props.userProfileInfo,
                          this.props.authToken
                        );
                      }}
                    >
                      Remove friend
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.delete}
                      onClick={this.handleAddFriendButton}
                    >
                      Add friend
                    </Button>
                  )
                ) : null}
              </CardContent>
            </Card>
          </Grid>

          <>
            <FriendsList
              handleOpenFriendsList={this.handleOpenFriendsList}
              open={this.state.modalFriendsList}
            />
            <EditProfile
              open={this.state.modalEditPageisOpen}
              handleEditDialog={this.handleEditDialog}
            />
            <RemoveProfile
              open={this.state.modalDeletePageisOpen}
              handleDeleteDialog={this.handleDeleteDialog}
            />
          </>

          <PostPhoto userProfileId={this.props.userProfileId} />
        </Grid>
      </>
    );
  }
}

const mapState = state => ({
  user: state.user,
  authToken: state.authToken,
  posts: state.allPosts,
  allFriends: state.allFriends,
  otherUserPosts: state.otherUserPosts,
  userProfileInfo: state.userProfileInfo
});
const mapDispatch = dispatch => ({
  deleteFriendFromAPI: (friend, authToken) =>
    dispatch(deleteFriendFromAPI(friend, authToken)),
  fetchUserPosts: (userId, authToken) =>
    dispatch(fetchUserPosts(userId, authToken)),
  fetchFriendToApi: (authToken, friendID) =>
    dispatch(fetchFriendToApi(authToken, friendID)),
  getFriendsFromAPI: authToken => dispatch(getFriendsFromAPI(authToken)),
  fetchToggleShowUserPosts: (showPosts, friendId, authToken) =>
    dispatch(fetchToggleShowUserPosts(showPosts, friendId, authToken)),
  setUserProfileInfo: info => dispatch(setUserProfileInfo(info))
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withStyles(styles)(UserProfile))
);
