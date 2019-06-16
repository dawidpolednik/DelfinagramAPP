import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsFromAPI, sortPosts } from "../../actions/postActions";
import {
  getFriendsFromAPI,
  getFriendsPostsFromAPI
} from "../../actions/friendActions";
import Post from "./Post/Post";
import { Grid, Typography } from "@material-ui/core";

class Home extends Component {
  componentDidMount = () => {
    this.props.getPostsFromAPI(this.props.authToken);
    this.props.getFriendsPostsFromAPI(this.props.authToken);
  };
  render() {
    const { user, posts, postsFriends } = this.props;
    const allPosts = postsFriends
      ? posts.concat(...postsFriends)
      : posts;
    return (
      <Grid item style={{ width: "100%" }} sm={8} xxl={7}>
        {allPosts && allPosts.length > 0 ? (
          allPosts.sort(sortPosts).map(post => {
            return (post.Friend && !post.Friend.Show) ||
              (user && post.UserId === user.Id) ? (
                <Post key={post.Id} post={post} user={post.Friend || user} />
              ) : null;
          })
        ) : (
            <Typography variant="h5">You don't have any posts yet. </Typography>
          )}
      </Grid>
    );
  }
}
const mapProps = state => ({
  posts: state.posts,
  authToken: state.authToken,
  user: state.user,
  postsFriends: state.postsFriends
});
const mapDispatch = dispatch => ({
  getPostsFromAPI: authToken => dispatch(getPostsFromAPI(authToken)),
  getFriendsFromAPI: authToken => dispatch(getFriendsFromAPI(authToken)),
  getFriendsPostsFromAPI: authToken =>
    dispatch(getFriendsPostsFromAPI(authToken))
});
export default connect(
  mapProps,
  mapDispatch
)(Home);
