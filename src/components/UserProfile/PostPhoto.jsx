import React from 'react';
import { Grid } from "@material-ui/core";
import style from "../UserProfile/UserProfile.module.scss";
import PostModal from "../PostModal/PostModal";
import { connect } from "react-redux";
import { getPostsFromAPI } from "../../actions/postActions";
import { withRouter } from "react-router-dom";
import { fetchUserPosts } from "../../actions/friendActions";

class PostPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      currentPost: ""
    };

    if (this.props.location.pathname !== "/userProfile") {
      this.state = {
        posts: this.props.otherUserPosts,
        user: this.props.userProfileInfo
      };
    } else {
      this.state = { posts: this.props.posts, user: this.props.user };
    }
  }
  setOpenModal = post => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      currentPost: post
    }));
  };
  componentDidUpdate = prevProps => {
    if (this.props.otherUserPosts !== prevProps.otherUserPosts) {
      this.setState({
        posts: this.props.otherUserPosts,
        user: this.props.userProfileInfo
      });
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.props.location.pathname !== "/userProfile") {
        this.setState({
          posts: this.props.otherUserPosts,
          user: this.props.userProfileInfo
        });
      } else {
        this.setState({ posts: this.props.posts, user: this.props.user });
      }
    }
  };
  render() {
    const { openModal, currentPost } = this.state;

    return (
      <>
        <Grid
          container
          direction="row"
          justify="center"
          className={style.PhotosContainer}
        >
          {this.state.posts && this.state.posts.length > 0
            ? this.state.posts.map(post => {
              return (
                <Grid
                  item
                  key={post.Id}
                  xs={10}
                  sm={8}
                  md={6}
                  lg={4}
                  xl={4}
                  className={style.postImage}
                >
                  <button
                    style={{
                      backgroundImage: `url(${post.ThumbnailPhoto})`
                    }}
                    onClick={() => this.setOpenModal(post)}
                  />
                </Grid>
              );
            })
            : null}
        </Grid>
        <PostModal
          open={openModal}
          changeModal={this.setOpenModal}
          post={currentPost}
          user={this.state.user}
        />
      </>
    );
  }
}
const mapState = state => ({
  authToken: state.authToken,
  posts: state.posts,
  user: state.user,
  otherUserPosts: state.otherUserPosts,
  userProfileInfo: state.userProfileInfo
});
const mapDispatch = dispatch => ({
  getPostsFromAPI: authToken => dispatch(getPostsFromAPI(authToken)),
  fetchUserPosts: (userId, authToken) =>
    dispatch(fetchUserPosts(userId, authToken))
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(PostPhoto)
);
