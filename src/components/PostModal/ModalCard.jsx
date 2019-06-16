import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import style from "./ModalCard.module.scss";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import img from "../../img/withoutPhoto.PNG";
const styles = theme => ({
  avatar: {
    backgroundColor: red[500]
  }
});
class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  publishDate = () => {
    let date = new Date(this.props.post.PublishDate);
    let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return `${date.getDate()} ${
      month[date.getMonth()]
      }, ${date.getFullYear()} `;
  };

  render() {
    const checkPhoto = () => (
      <Avatar
        style={{ margin: 10 }}
        alt={`${this.props.user.GivenName}${this.props.user.Name}`}
        src={this.props.user.Photo || img}
      />
    );

    return (
      <Card className={style.Card}>
        <CardHeader
          avatar={checkPhoto()}
          title={this.props.post.Title}
          subheader={this.publishDate()}
        />
        <div className={style.ContainerToIMG}>
          <div className={style.DivIMG}>
            <img alt="data" src={this.props.post.ThumbnailPhoto} />
          </div>
        </div>
        <CardContent>
          <Typography align="justify" paragraph>
            {this.props.post.Text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(ModalCard);
