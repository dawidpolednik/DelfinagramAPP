import { connect } from "react-redux";
import UserProfile from "./UserProfile";
import { fetchUser } from "../../actions/userActions";

const mapDispatch = dispatch => {
  return {
    fetchUser: authToken => dispatch(fetchUser(authToken))
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
)(UserProfile);
