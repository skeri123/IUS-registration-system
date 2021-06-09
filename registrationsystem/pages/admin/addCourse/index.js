import { createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../../Components/Layout";
import Course from "../../../Components/CourseForm";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      width: "90%",
      top: "5%",
      left: "50%",
      marginBottom: "3%",
      transform: "translate(-50%)",
      overflowY: "auto",
    },
  })
);

const UserPanel = (props) => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <Course />
      </div>
    </Layout>
  );
};
export default UserPanel;
