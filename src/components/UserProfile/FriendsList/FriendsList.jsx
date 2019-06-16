import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  ListItemText,
  Avatar,
  CardContent,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  InputBase,
  Typography
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  getFriendsFromAPI,
  deleteFriendFromAPI,
  setUserProfileInfo
} from "../../../actions/friendActions";
import { connect } from "react-redux";
import style from "../FriendsList/FriendsList.module.scss";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { Link } from "react-router-dom";
import img from "../../../img/withoutPhoto.PNG";
const styles = theme => ({
  List: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto"
  },
  ListItemUser: {
    marginTop: "0.6rem"
  },
  removeFriendButton: {
    color: "white",
    backgroundColor: "#E89274"
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignIitems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 3,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    margin: "0 auto",
  },
  inputInput: {
    margin: "0 auto",
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 3,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  NoFriendsInfo: {
    margin: "3rem auto",
    textAlign: "center",
    fontSize: "1.5rem"
  }
});
class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      query: "",
      friends: this.props.allFriends
    };
  }
  areArraysEqual = (array1, array2) => {
    if (array1 && array2) {
      if (array1.length !== array2.length) return false;
      for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) === -1) return false;
      }
      return true;
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open
      });
      if (!this.state.open) {
        this.setState({
          query: ""
        });
      }
    }
    if (!this.areArraysEqual(this.state.friends, this.props.allFriends)) {
      this.setState({
        friends: this.props.allFriends
      });
    }
  };

  handleInputFriendSearch = event => {
    let value = event.target.value;
    this.setState({
      query: value
    });
  };
  render() {
    const { open, query, friends } = this.state;
    const { classes, handleOpenFriendsList, authToken } = this.props;
    const filterFriends = friends.filter(friend => {
      return friend.GivenName.toLowerCase().includes(query.toLowerCase()) ||
        friend.Name.toLowerCase().includes(query.toLowerCase())
        ? friend
        : null;
    });
    return (
      <Grid
        container
        item
        xs={12}
        sm={10}
        md={9}
        lg={7}
        xl={7}
        justify="center"
        alignContent="center"
      >
        <Dialog
          open={open}
          scroll="body"
          onClose={handleOpenFriendsList}
        >
          <Card>
            <CardContent>
              <List dense className={classes.List}>
                {friends && friends.length > 0 ? (
                  <>
                    <div className={classes.search}>
                      <InputBase
                        placeholder="Find a specific friend..."
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        onChange={this.handleInputFriendSearch}
                        value={query}
                      />
                    </div>
                    {filterFriends.length > 0 ? (
                      filterFriends.map(friend => (
                        <ListItem
                          key={friend.Id}
                          className={classes.ListItemUser}
                        >
                          <ListItemAvatar>
                            {friend.Photo ? (
                              <Avatar
                                alt={`${friend.Name} ${friend.GivenName}`}
                                src={friend.Photo}
                              />
                            ) : (
                                <Avatar alt={`Avatar`} src={img} />
                              )}
                          </ListItemAvatar>
                          <Link
                            to={`/user/${friend.Id}`}
                            onClick={() => {
                              this.props.setUserProfileInfo(friend);
                            }}
                            style={{ textDecoration: 'none' }}
                            className={style.FriendLink}
                          >
                            <ListItemText
                              primary={`${friend.Name} ${friend.GivenName}`}
                            />
                          </Link>
                          <ListItemSecondaryAction>
                            <DeleteForeverSharpIcon
                              className={style.FriendLink}
                              onClick={() => {
                                this.props.deleteFriendFromAPI(
                                  friend,
                                  authToken
                                );
                                this.setState({
                                  query: ""
                                });
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))
                    ) : (
                        <Typography
                          variant="inherit"
                          className={classes.NoFriendsInfo}
                        >
                          {`No search results for the query: ${query}`}
                        </Typography>
                      )}
                  </>
                ) : (
                    <Typography
                      variant="inherit"
                      className={classes.NoFriendsInfo}
                    >
                      Sorry. You don't have any friends.
                  </Typography>
                  )}
              </List>
            </CardContent>
          </Card>
        </Dialog>
      </Grid>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    getFriendsFromAPI: authToken => dispatch(getFriendsFromAPI(authToken)),
    deleteFriendFromAPI: (friend, authToken) =>
      dispatch(deleteFriendFromAPI(friend, authToken)),
    setUserProfileInfo: friend => dispatch(setUserProfileInfo(friend))
  };
};
const mapState = state => ({
  authToken: state.authToken,
  allFriends: state.allFriends
});
export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(FriendsList));
