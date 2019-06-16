const styles = theme => ({
  card: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.7)",
    border: "3px solid rgba(0, 0, 0, 0.2)",
    // marginBottom: "9rem",
    marginUp: "4rem"
  },
  FormControl: {
    width: "100%"
  },
  upload: {
    color: "black",
    backgroundColor: "#FFD10D",
    margin: "1.2rem auto 4rem auto"
  },
  save: {
    color: "white",
    backgroundColor: "#3F51B5"
  },
  cancel: {
    color: "white",
    backgroundColor: "#3F51B5"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
export default styles;
