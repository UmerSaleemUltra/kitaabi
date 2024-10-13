import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const styles = {
    appBar: {
      background:
        "linear-gradient(90deg, rgba(79,70,229,1) 0%, rgba(147,51,234,1) 100%)",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      flexGrow: 1,
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#ffffff",
    },
    list: {
      width: 250,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  const list = () => (
    <div style={styles.list} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Sidebar Links */}
        <ListItem button component={Link} to="/" style={styles.link}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/sell" style={styles.link}>
          <ListItemText primary="Sell Book" />
        </ListItem>
        <ListItem button component={Link} to="/login" style={styles.link}>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/register" style={styles.link}>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* AppBar with a Menu Icon for opening the sidebar */}
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.title}>
            Kitaabi
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for Sidebar */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Sidebar;
