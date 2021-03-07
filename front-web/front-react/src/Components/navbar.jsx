import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Widgets from '@material-ui/icons/Widgets';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ImLibrary } from "react-icons/im";
import {useHistory} from "react-router-dom";
import { purple } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import API from '../auth/requests';
import Notifs from './Notifs'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {Badge, ListItemIcon, ListItemText, ListItem, Button, Modal, Popover, IconButton, List, Toolbar, AppBar, CssBaseline, Drawer} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  nobg:{
    background:'transparent'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#6F35A5',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  Padding: {
    marginLeft: theme.spacing(2),
  },
}));

//function ListItemLink(props) {
//  return <ListItem button component="a" {...props} />;
//}

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const history = useHistory();

  let notifs_delay = 5000

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notifopen, setnotifopen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifs, setnotifs] = useState([])
  const [notifanchor, setnotifanchor] = useState(null)
  const bull = <span className={classes.bullet}>•</span>;


  const isMenuOpen = Boolean(anchorEl);

  const handleChange = (event) => { setAuth(event.target.checked); };
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };
  const handleProfileMenuOpen = (event) => {  setAnchorEl(event.currentTarget); };

  const navigateToEpitech = () => history.push('/Area');
  const navigateToLogin = () => history.push('/');
  const navigateToProfile = () => history.push('/Profile');
  const navigateToAddArea = () => history.push('/Addarea');
  const navigateToArea = () => history.push('/Area');
  

  const menuId = 'primary-search-account-menu';
  //Profile drop down menu

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
    </Menu>
  );
  useEffect(()  => {
    async function CheckLogin() {
      if (await API.isAuth() == false)
        navigateToLogin()
    }
    CheckLogin()
    fetchNotifs()
  }, []);


  const disconnectFront = () => {
    API.logout();
    navigateToLogin();
  }

  const fetchNotifs = () => {
    API.getNotifs().then(
      res=>{
        console.log('notifs', res)
        setnotifs(res)
      }
    ).catch(
      e=>{
        console.log(e)
      }
    )
  }

  const readNotifs = () => {
    API.readNotifs()
    .then(res=>{
      console.log('notifications read')
    })
    .catch(e=>{
      console.log(e)
    })
  }

  const handleNotifsOpen = () => {
    setnotifopen(true);
    readNotifs()
  }

  const handleNotifsClose = () => {
    setnotifopen(false); 
    setnotifanchor(null)
  }

  useEffect(() => {
    const interval = setInterval(() => {
        console.log("update notifs")
        if (!notifopen){
          fetchNotifs();
        }
    }, notifs_delay);
    return () => clearInterval(interval);
  }, [fetchNotifs, notifs_delay]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Button onClick={navigateToArea} style={{ fontSize: 25 }} color="inherit">
          <b>AREA</b>
          </Button>
          <div className={classes.toolbarButtons}>
            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"
              onClick={navigateToEpitech}
              color="inherit"
            >
              <Widgets style={{ fontSize: 40 }} />
            </IconButton>
            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"
              onClick={navigateToProfile}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 40 }} />
            </IconButton>
            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"
              onClick={navigateToAddArea}
              color="inherit"
            >
              <AddCircleIcon style={{ fontSize: 40 }} />
            </IconButton>
            <Button color="inherit" onClick={handleNotifsOpen}>
            <PopupState popupId="demo-popup-popover2" style={{background: 'none', opacity: 0.5}} onClos>
              {(popupState) => (
                <div style={{background: 'none'}}>
                  <IconButton variant="contained" color="inherit" {...bindTrigger(popupState)}>
                    <Badge badgeContent={notifs.length > 0?notifs.length:''} color="primary">
                      <NotificationsIcon style={{ fontSize: 40 }}/>
                    </Badge>
                  </IconButton>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    PaperProps={{
                      style: {
                        backgroundColor: 'rgba(111, 53, 165, 0.8)',//255, 255, 255, 0.7',
                        boxShadow: 'none',
                      },
                    }}
                    onclose={handleNotifsClose}
                    // style={{backgroundColor: 'transparent', opacity: 0.5}}
                  >
                    <Notifs notifs={notifs || []} />
                  </Popover>
                </div>
              )}
            </PopupState>
            </Button>
            <Button className={classes.Padding} variant="outlined" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"
              onClick={disconnectFront}
              color="inherit"
            >
              Log Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={navigateToEpitech} >
          <ListItemIcon> <ImLibrary /> </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={navigateToProfile} >
          <ListItemIcon> <SettingsIcon /> </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
  
      </List>
      </Drawer>
    </div>
  );
}