import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import * as firebaseutils from "../utils/firebaseutils";
import firebase from "firebase";
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Binding the state and actions. These will be available as props to component
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor:'#282C34',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logoutButton:{
    color:'#ADB0BB',
    '&:hover': {
       background: "#373B42",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerTop:{
    height:'200px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  drawerTopText:{
    marginTop:theme.spacing(3),
    color:'white',
    fontSize:'16px',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#282C34',
    color:'#ADB0BB',
  },
  listItem:{
    '&:hover': {
       background: "#373B42",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color:'black',
  },
});

const drawerWidth = 240;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen:false,
      ownerName:"",
    };
    //firebaseutils.clear_users()
  }
  componentWillMount(){
    this.setState({ownerName:this.props.coach.ownerName});
  }

  logout = () => {
    firebaseutils.signOut();
    browserHistory.push("/");
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen:!this.state.mobileOpen});
  }

  render() {
    const { classes, children } = this.props;
    const drawer = (
      <div className={classes.drawer}>
        <div className={classes.drawerTop}>
          <Avatar className={classes.large}>{this.state.ownerName[0]}</Avatar>
          <div className={classes.drawerTopText}>{this.state.ownerName}</div>
          <div >{this.props.coach.shopName}</div>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Create Store', 'Update Inventory', 'List Stores'].map((text) => (
            <ListItem className={classes.listItem} button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => this.handleDrawerToggle()}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} />
          <IconButton className={classes.logoutButton} onClick={() => this.logout()}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={() => this.handleDrawerToggle()}
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    coach: state.coach
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
