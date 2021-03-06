import {withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import {Button, TextField,Switch} from '@material-ui/core';

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

const SignInButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    borderRadius: "20px"
  },
}))(Button);

const RegisterButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const LoginTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'purple',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'purple',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'purple',
      },
      '&:hover fieldset': {
        borderColor: 'purple',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
})(TextField);

const AddButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#0C6291",
    '&:hover': {
      backgroundColor: "#0C6291",
    },
    borderRadius: "40px"
  },
}))(Button);

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#50409A",
    '&$checked': {
      color:  "#50409A",
    },
    '&$checked + $track': {
      backgroundColor: "#50409A",
    },
  },
  checked: {},
  track: {},
})(Switch);


const OtherSwitch = withStyles({
  switchBase: {
    color: "#50409A",
    '&$checked': {
      color:  "#50409A",
    },
    '&$checked + $track': {
      backgroundColor: "#50409A",
    },
  },
  checked: {},
  track: {},
})(Switch);

export {GoogleButton, DiscordButton, FacebookButton, TrelloButton,GithubButton,TwitchButton, SignInButton,RegisterButton,LoginTextField, AddButton, PurpleSwitch  } ;