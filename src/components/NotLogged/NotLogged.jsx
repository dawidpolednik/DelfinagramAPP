import React from "react";
import styles from "./NotLogged.module.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NotLogged = () => (
  <div className={styles.MainDiv}>
    <Typography variant="h5" className={styles.Message}>
      You are not logged in, to go any further and explore our awesome app{" "}
      <Button variant="contained" color="primary">
        <Link className={styles.Link} to="/login">
          Log in
        </Link>
      </Button>
    </Typography>
  </div>
);
export default NotLogged;
