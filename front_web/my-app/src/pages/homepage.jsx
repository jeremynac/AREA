import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {CssBaseline,Typography,Button,MenuItem,Menu,Grid,Card,CardContent,CardActions} from '@material-ui/core';
import NavigationBar from "../Components/navbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const isMenuOpen = Boolean(anchorEl);
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };
  const handleClick = (url) => {
    window.open(process.env.REACT_APP_SERVER_URL + url + '/' + localStorage.user_id)
  }
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
              <Button size="small" onClick={()=>{handleClick('/auth/go-login')}}>Google</Button>
              <Button size="small" onClick={()=>{handleClick('/auth/fb-login')}}>Facebook</Button>
              <Button size="small" onClick={()=>{handleClick('/auth//di-login')}}>Dicord</Button>
              <Button size="small" onClick={()=>{handleClick('/auth/twitch-login')}}>Twitch</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      </main>
    </div>
  );
}