import React, { useState } from "react";
import Bar from "./Bar";
import Drawer from "./Drawer";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      position: "relative",
      backgroundImage: "url(/banner1.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    pannelDiv: {
      position: "relative",
      display: "flex",
      top: "10%",
      left: "10%",
      width: "85%",
      height: "85%",
      display: "flex",
      backgroundColor: "rgb(95, 91, 91, 0.8)",
    },
    main: {
      position: "relaive",
      width: "100%",
    },
    barDiv: {
      position: "relaive",
      width: "100%",
    },
  })
);

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    if (width < 800) {
      return true;
    } else return false;
  }
}

const Layout = (props) => {
  const classes = useStyles();
  const [isMobile, setisMobile] = useState(props.mobile);
  return (
    <div className={classes.root}>
      <div className={classes.pannelDiv}>
        <Drawer
          mobileOpenFunction={props.setMobileOpen}
          mobileOpen={props.mobileOpen}
        />
        <main className={classes.main}>
          <div className={classes.bardDiv}>
            {isMobile ? (
              <Bar
                setMobileOpen={props.setMobileOpen}
                mobileOpen={props.mobileOpen}
              />
            ) : (
              ""
            )}
          </div>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;