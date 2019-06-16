import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { deletePostFromApi } from "../../../../actions/postActions";
import { AppBar, Toolbar, IconButton, Slide } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NewPost from "../../../NewPost/NewPost";
import styles from "./PostMenu.module.scss";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PostMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEditDialog: false
    };
  }
  handleOpenDialog = () => {
    this.setState({ open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };
  handleClickOpenEdit = () => {
    this.setState({ openEditDialog: true });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };
  render() {
    const { authToken, anchorEl, handleCloseMenu, post } = this.props;
    const editDialog = (
      <Dialog
        fullScreen
        open={this.state.openEditDialog}
        onClose={this.handleCloseEditDialog}
        TransitionComponent={Transition}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleCloseEditDialog}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={styles.EditCard}>
          <NewPost
            edit
            postToEdit={this.props.post}
            closeDialog={this.handleCloseEditDialog}
          />
        </div>
      </Dialog>
    );
    const deleteDialog = (
      <Dialog
        open={this.state.open}
        onClose={this.handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this post?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              this.handleCloseDialog();
              this.props.deletePostFromApi(post, authToken);
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
    return (
      <div>
        <Menu
          disableAutoFocusItem
          id="postMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              this.handleClickOpenEdit();
            }}
          >
            Edit Post
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              this.handleOpenDialog();
            }}
          >
            Delete Post
          </MenuItem>
        </Menu>
        {deleteDialog}
        {editDialog}
      </div>
    );
  }
}
const mapProps = state => ({
  authToken: state.authToken
});
const mapDispatch = dispatch => ({
  deletePostFromApi: (post, authToken) =>
    dispatch(deletePostFromApi(post, authToken))
});
export default connect(
  mapProps,
  mapDispatch
)(PostMenu);
