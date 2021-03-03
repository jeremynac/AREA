import React from 'react';
import clsx from 'clsx';
import './App.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {CssBaseline,Typography,Button,MenuItem,Menu,Grid,Card,CardContent,CardActions} from '@material-ui/core';
import NavigationBar from "../Components/navbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
    
    </div>
  );
}