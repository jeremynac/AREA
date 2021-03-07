import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Paper, CssBaseline,Typography,ListItem,Button,MenuItem,Menu,Grid,Card,CardContent,CardActions} from '@material-ui/core';
import NavigationBar from "../Components/navbar";
import Axios from 'axios';
import AreaToggle from "../Components/AreaToggleList";
import AreaList from "../Components/AreaList";
import {AddButton } from "../Components/Buttons";
import { green, purple } from '@material-ui/core/colors';
import mainlogo from "../Components/Area.png";
import {useHistory} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#F1E6FF',
    height: '100vh',
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
  Cardheader: {
    width: "100px",
    height: "100px"
  },
  ButtonDownload: {
    minWidth: "100px",
    marginTop: theme.spacing(1),
  },
  ButtonProfile: {
    minWidth: "100px",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
const FileDownload = require('js-file-download');

const downloadfile = () => {
  Axios({
    url: 'https://filebin.net/98p2l0mizf076qns',
    method: 'GET',
    responseType: 'blob', // Important  
  }).then((response) => {
      FileDownload(response.data, 'report.csv');
  });
}
export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const history = useHistory();

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
  //Profile drop down menu
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
        <Grid justify="center"
          container item spacing={3}>
          <Grid item xs={7}>
            <AreaList/>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}