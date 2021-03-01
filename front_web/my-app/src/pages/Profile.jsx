import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {CssBaseline,Typography,ListItem,Button,MenuItem,Menu,Grid,Card,CardContent,CardActions, Box} from '@material-ui/core';
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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const isMenuOpen = Boolean(anchorEl);
  
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };

  const menuId = 'primary-search-account-menu';
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
        <Grid container
              direction="column"
              spacing={2}
              style={{ minHeight: '100vh' }}>
          <Grid item xs={3} spacing={3}>
              <Card  className={classes.root}>
                <CardContent>
                  <Typography  variant="h5" color="textSecondary" gutterBottom>
                    Profile 
                  </Typography>
                  <Typography variant="body1" component="h2">
                    Name Here
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Username Here
                  </Typography>
                  <Typography variant="body2" component="p">
                    Email here.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Change settings</Button>
                </CardActions>
              </Card>
          </Grid>
          <Grid item xs={3} spacing={3}>
              <Card className={classes.root}>
                <CardActions>
                  <Button size="small">Login to google</Button>
                </CardActions>
              </Card>
          </Grid>
          <Grid item xs={3} spacing={3}>
              <Card className={classes.root}>
                <CardActions>
                  <Button size="small">Login to Discord</Button>
                </CardActions>
              </Card>
          </Grid>
          <Grid item xs={3} spacing={3}>
              <Card className={classes.root}>
                <CardActions>
                  <Button size="small">Login to Facebook</Button>
                </CardActions>
              </Card>
          </Grid>
      </Grid>
      </main>
    </div>
  );
}