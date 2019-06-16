import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class ResetDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }
  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.setState({
        openDialog: this.props.open
      });
    }
  };
  render() {
    const open = Boolean(this.state.openDialog);
    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you want to reset the data provided to add a post ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              The changes you made won't be saved !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleDataReset} color="primary">
              Reset
            </Button>
            <Button onClick={this.props.handleDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default ResetDialog;
