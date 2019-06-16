import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
import Grid from "@material-ui/core/Grid";
import style from "./LoginPage.module.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleGoogleResp = this.handleGoogleResp.bind(this);
  }
  //this function gets the response from google authentication retrieved in child component GoogleLoginButton
  handleGoogleResp(response) {
    //this function passes the authentication token to a parent component of LoginPage
    sessionStorage.setItem("authToken", response.authenticationToken);
  }
  render() {
    return (
      <Grid
        item
        container
        className={style.LoginPageGrid}
        justify="center"
        alignContent="center"
        xs={10}
      >
        <Card className={style.Card}>
          <Grid
            container
            className={style.CardInnerGrid}
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <CardContent>
              <Typography
                className={style.WelcomeSign}
                color="textPrimary"
                variant="h5"
                align="center"
              >
                Welcome
              </Typography>
              <Typography
                color="textPrimary"
                variant="subtitle1"
                align="center"
              >
                Log in using socialmedia buttons below
              </Typography>
            </CardContent>
            <CardActions>
              <GoogleLoginButton handleGoogleResp={this.handleGoogleResp} />
            </CardActions>
          </Grid>
        </Card>
        {this.props.authToken ? <Redirect to="/home" /> : null}
      </Grid>
    );
  }
}

export default connect(state => ({ authToken: state.authToken }))(LoginPage);
