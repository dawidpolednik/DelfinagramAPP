import React from "react";
import { GoogleLogin } from "react-google-login";
import { fetchAuthToken } from "../../../actions/loginActions";
import { connect } from "react-redux";

function GoogleLoginButton(props) {
  const responseGoogle = data => {
    props.fetchAuthToken(data);
  };

  return (
    <React.Fragment>
      <GoogleLogin
        clientId="576077564511-fd1t0nbqe1av9rr70to25hnuce1j0mg7.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      {props.authToken}
    </React.Fragment>
  );
}
const mapDispatch = dispatch => {
  return {
    fetchAuthToken: data => dispatch(fetchAuthToken(data))
  };
};
export default connect(
  null,
  mapDispatch
)(GoogleLoginButton);
