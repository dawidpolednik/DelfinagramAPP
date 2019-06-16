import React, { Component } from "react";
import style from "./EditProfile.module.scss";
import styles from "./EditProfile.styles.js";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Dialog } from "@material-ui/core";
import { fetchUser, fetchUpdatedUser } from "../../../actions/userActions";
import img from "../../../img/withoutPhoto.PNG";
import { connect } from "react-redux";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedUser: {
        ...props.user
      },
      photo: null,
      open: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleBiogramChange = this.handleBiogramChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    this.setState({
      updatedUser: { ...this.state.updatedUser, GivenName: event.target.value }
    });
  }
  handleSurnameChange(event) {
    this.setState({
      updatedUser: { ...this.state.updatedUser, Name: event.target.value }
    });
  }
  handleBiogramChange(event) {
    // this.setState({
    //   updatedUser: { ...this.state.updatedUser, biogram: event.target.value }
    // });
  }
  handleAvatarChange(event) {
    this.setState({
      photo: event.target.files[0]
    });
  }
  handlePhoto() {
    const input = document.getElementById("raised-button-file");
    input.click();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchUpdatedUser(
      this.props.authToken,
      this.state.updatedUser,
      this.state.photo
    );
    this.props.handleEditDialog();
  }
  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open
      });
    }
  };
  render() {
    const { classes, handleEditDialog } = this.props;
    const { GivenName, Name, biogram, open } = this.state;
    return (
      <Grid container item xs={10} justify="center" alignContent="center">
        <Dialog open={open} scroll="body">
          <Card>
            <form className={style.FormEdit} onSubmit={this.handleSubmit}>
              <h2 className={style.FormEditHeader}>Edit a profile</h2>
              <CardContent className={classes.ContentEditProfile}>
                {this.props.user.Photo ? (
                  <Avatar
                    alt={`${this.props.user.GivenName}${this.props.user.Name}`}
                    src={this.props.user.Photo}
                    className={classes.avatar}
                  />
                ) : (
                  <Avatar
                    alt={`${this.props.user.GivenName}${this.props.user.Name}`}
                    src={img}
                    className={classes.avatar}
                  />
                )}
                <div className={style.ButtonsAvatarContainer}>
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    className={classes.changePhoto}
                    size="medium"
                    onClick={this.handlePhoto}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={this.handleAvatarChange}
                    />
                    Change a photo
                  </Button>
                </div>
                <TextField
                  label="Name"
                  className={classes.TextWidth}
                  value={GivenName}
                  defaultValue={this.props.user.GivenName}
                  onChange={this.handleNameChange}
                  margin="normal"
                  variant="outlined"
                  placeholder="Write your name..."
                  required
                />
                <TextField
                  label="Surname"
                  className={classes.TextWidth}
                  value={Name}
                  defaultValue={this.props.user.Name}
                  onChange={this.handleSurnameChange}
                  margin="normal"
                  variant="outlined"
                  placeholder="Write your surname..."
                  required
                />
                <TextField
                  label="Biogram"
                  className={classes.TextWidth}
                  value={biogram}
                  multiline
                  rows="8"
                  onChange={this.handleTextChange}
                  margin="normal"
                  variant="outlined"
                  placeholder="Write an information about yourself..."
                />
              </CardContent>
              <CardActions className={classes.EditActions}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes.buttonAction}
                >
                  <SaveIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEditDialog}
                  size="large"
                  className={classes.buttonAction}
                >
                  Cancel
                </Button>
              </CardActions>
            </form>
          </Card>
        </Dialog>
      </Grid>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUser: authToken => dispatch(fetchUser(authToken)),
    fetchUpdatedUser: (authToken, updatedUser, photo) =>
      dispatch(fetchUpdatedUser(authToken, updatedUser, photo))
  };
};
const mapState = state => ({
  authToken: state.authToken,
  user: state.user,
  photo: state.user.photo
});
export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(EditProfile));
