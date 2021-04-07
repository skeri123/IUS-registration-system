import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Schedule from "@material-ui/icons/Schedule";
import ExitToApp from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircle from "@material-ui/icons/AddCircle";
import Home from "@material-ui/icons/Home";
import Link from "next/link";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

// import "../css/style.css";
// import Logo from "../img/IUSlogo2.png";
// import { Redirect, Link } from "react-router-dom";
// import Cookie from "js-cookie";

const drawerWidth = 200;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      display: "flex",
    },
    drawer: {
      position: "relative",
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      //display: "flex",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "#292626",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    specialDivider: {
      marginTop: "5%",
      background: "#999",
    },
    drawerInnerLayout: {
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column",
      height: "80%",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      position: "absolute",
      //display: "flex",
      minHeight: "100%",
      width: drawerWidth,
      borderRight: "none",
      backgroundColor: "#292626",
      color: "#fff",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    maximised: {
      height: "100%",
      position: "relative",
    },
    blueGrad: {
      background:
        "linear-gradient(90deg, rgba(6, 125, 233, 0.9110994739692753) 0%, rgba(1, 169, 250, 0.9251050762101716) 100%)",
      height: "20%",
    },
    iconColor: {
      color: "#fff",
    },
    ius: {
      left: "35%",
      position: "relative",
      width: 60,
      height: "auto",
    },
    logo: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      top: "25%",
      textAlign: "center",
    },
    link: {
      textDecorationStyle: "none",
      textDecoration: "none",
      color: "#fffff",
    },
    user: {
      fontSize: "0.9em",
      //font-family: "Montserrat", sans-serif,
      textTransform: "uppercase",
    },
    size: {
      fontSize: "0.5em",
    },
  })
);

export default function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = props.mobileOpen;

  const handleDrawerToggle = () => {
    props.mobileOpenFunction(!mobile);
  };

  const drawer = (
    <div className={classes.maximised}>
      <div className={classes.blueGrad}>
        <div className={classes.logo}>
          <img className={classes.ius} src="/IUSlogo2.png" />
          <span
            className="user"
            // dangerouslySetInnerHTML={{
            //   __html: Cookie.get("name") + " " + Cookie.get("surname"),
            // }}
          >
            USername
          </span>
        </div>
        <div className={classes.toolbar} />
      </div>
      <div className={classes.drawerInnerLayout}>
        <div>
          <Divider />
          <List>
            {/*Home*/}
            <ListItem button key="Home" className={classes.size}>
              <ListItemIcon>
                <Home className={classes.iconColor} />
              </ListItemIcon>
              <Link
                className={classes.link}
                href="/home"
                onClick={() => props.mobileOpenFunction(false)}
              >
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            {/*Add Courses*/}
            <ListItem button key="Registration">
              <ListItemIcon>
                <AddCircle className={classes.iconColor} />
              </ListItemIcon>
              <Link
                className={classes.link}
                href="/registration"
                onClick={() => props.mobileOpenFunction(false)}
              >
                <ListItemText primary="Registration" />
              </Link>
            </ListItem>
            {/*My Courses*/}
            <ListItem button key="Transcript">
              <ListItemIcon>
                <InboxIcon className={classes.iconColor} />
              </ListItemIcon>
              <Link
                className={classes.link}
                href="/transcript"
                onClick={() => props.mobileOpenFunction(false)}
              >
                <ListItemText primary="Transcript" />
              </Link>
            </ListItem>
            <ListItem button key="Contract and payment">
              <ListItemIcon>
                <InboxIcon className={classes.iconColor} />
              </ListItemIcon>
              <Link
                className={classes.link}
                href="/payment"
                onClick={() => props.mobileOpenFunction(false)}
              >
                <ListItemText primary="Contract and payment" />
              </Link>
            </ListItem>
            {/*Schedule*/}
            <ListItem button key="Schedule">
              <ListItemIcon>
                <Schedule className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItem>
          </List>
        </div>
        <div>
          <Divider className={classes.specialDivider} />
          <List>
            <ListItem button key="LogOut">
              <ListItemIcon>
                <ExitToApp className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobile}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
