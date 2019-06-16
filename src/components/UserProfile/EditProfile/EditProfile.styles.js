const styles = theme => ({
  ContentEditProfile: {
    paddingTop: "0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  TextWidth: {
    width: "80%"
  },
  avatar: {
    marginBottom: "20px",
    width: 150,
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: 130,
      height: 130,
      margin: "5px 50px 10px 20px"
    },
    [theme.breakpoints.down("xs")]: {
      width: 110,
      height: 110,
      margin: "5px 30px 10px 20px"
    }
  },
  changePhoto: {
    color: "black",
    backgroundColor: "#FFD10D",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontSize: "0.6rem",
      textAlign: "center"
    }
  },
  buttonAction: {
    color: "white",
    backgroundColor: "#3F51B5"
  },
  EditActions: {
    width: "55%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "120px",
      flexDirection: "column"
    }
  }
});
export default styles;
