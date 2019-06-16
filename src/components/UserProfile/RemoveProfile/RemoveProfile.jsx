import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRemoveUser } from "../../../actions/userActions";
import style from './RemoveProfile.module.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

  RemoveButtonsContainer: {
    marginTop: '2rem',
    marginBottom: '1.2rem',
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100px",
      flexDirection: "column"
    }
  },
  removeButtons: {
    color: "white",
    backgroundColor: "#E89274"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RemoveProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checkedA: false,
      checkedB: false,
      checkedC: false
    };
  }
  handleDeleteButton = () => {
    this.props.fetchRemoveUser(this.props.authToken);
  };
  handleChangeCheckBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  get isDeleteEnabled() {
    return (
      this.state.checkedA && this.state.checkedB && this.state.checkedC
    )
  }
  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open,
        checkedA: false,
        checkedB: false,
        checkedC: false
      });
    }
  };
  render() {
    const { open } = this.state
    const { classes } = this.props;
    return (

      <Dialog
        className={classes.DialogRemove}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleDeleteDialog}
        scroll="body"

      >
        <DialogTitle className={style.DialogRemoveTitle}>
          {"Are you sure?"}
        </DialogTitle>
        {/* <DialogContent className={style.DialogCheckBoxContainer}> */}
        <MuiFormControlLabel
          className={style.CheckBoxStyle}
          control={
            <Checkbox

              checked={this.state.checkedA}
              onChange={this.handleChangeCheckBox('checkedA')}
              value="checkedA"
              color="primary"
            />
          }
          label="I know what I'm doing"
        />
        <FormControlLabel
          className={style.CheckBoxStyle}
          control={
            <Checkbox

              checked={this.state.checkedB}
              onChange={this.handleChangeCheckBox('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="I'm sure, I want to delete it!"
        />
        <FormControlLabel
          className={style.CheckBoxStyle}
          control={
            <Checkbox
              checked={this.state.checkedC}
              onChange={this.handleChangeCheckBox('checkedC')}
              value="checkedC"
              color="primary"
            />
          }
          label="Just do it!"
        />

        {/* </DialogContent> */}
        <DialogActions className={classes.RemoveButtonsContainer}>
          <Button onClick={this.handleDeleteButton}
            className={classes.removeButtons}
            variant="contained"
            color="default"
            size="large"
            disabled={!this.isDeleteEnabled}
          >
            Delete
            </Button>
          <Button onClick={this.props.handleDeleteDialog} className={classes.removeButtons}
            variant="contained"
            color="default"
            size="large">
            I'm staying
            </Button>
        </DialogActions>
      </Dialog>

    );
  }
}
const mapDispatch = dispatch => ({
  fetchRemoveUser: authToken => dispatch(fetchRemoveUser(authToken))
});

const mapState = state => ({
  authToken: state.authToken
});
export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(RemoveProfile));
