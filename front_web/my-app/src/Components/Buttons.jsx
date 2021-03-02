import React from 'react';
import clsx from 'clsx';
import { makeStyles,withStyles, useTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import {Button} from '@material-ui/core';

const GoogleButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#4285F4",
      '&:hover': {
        backgroundColor: "#0E62ED",
      },
      borderRadius: "20px"
    },
}))(Button);

const DiscordButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#7289da",
      '&:hover': {
        backgroundColor: "#405FCD",
      },
      borderRadius: "20px"
    },
}))(Button);

const FacebookButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#3B5998",
      '&:hover': {
        backgroundColor: "#30487B",
      },
      borderRadius: "20px"
    },
}))(Button);

const TrelloButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#0079bf",
      '&:hover': {
        backgroundColor: "#00629B",
      },
      borderRadius: "20px"
    },
}))(Button);

const GithubButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#4078c0",
      '&:hover': {
        backgroundColor: "#33619C",
      },
      borderRadius: "20px"
    },
}))(Button);

const TwitchButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#6441a5",
      '&:hover': {
        backgroundColor: "#513586",
      },
      borderRadius: "20px"
    },
}))(Button);


export {GoogleButton, DiscordButton, FacebookButton, TrelloButton,GithubButton,TwitchButton  } ;