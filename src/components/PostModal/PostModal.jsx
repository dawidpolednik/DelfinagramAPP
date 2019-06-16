import React from "react";
import ModalCard from "./ModalCard";
import style from "./ModalCard.module.scss";
import Dialog from "@material-ui/core/Dialog";
class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }
  componentDidUpdate = prevProps => {
    if (this.props.open !== prevProps.open) {
      this.setState({
        openModal: this.props.open
      });
    }
  };
  render() {
    return (
      <Dialog
        className={style.Modal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={Boolean(this.props.open)}
        onClose={this.props.changeModal}
        scroll="body"
      >
        <ModalCard post={this.props.post} user={this.props.user} />
      </Dialog>
    );
  }
}
export default PostModal;
