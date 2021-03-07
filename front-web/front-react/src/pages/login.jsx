import React, { useState, useEffect } from "react";
import './App.css';
import { FormControlLabel, Paper, Avatar, Checkbox, Box, Link, Typography, Grid , TextField, CssBaseline , Button, makeStyles, Popover, Modal } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import mainlogo from "../Components/Area.png"
import {SignInButton, LoginTextField} from '../Components/Buttons';
import { ImGoogle, ImFacebook, ImGithub, ImTwitch, ImTrello } from "react-icons/im";
import { FaDiscord } from "react-icons/fa";
import {DiscordButton, FacebookButton, TrelloButton,GithubButton,TwitchButton} from '../Components/Buttons';
import GoogleButton from 'react-google-button';

import API from '../auth/requests'
let url2 = "http://localhost:8080"
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Cardheader: {
    width: "100px",
    height: "100px"
  },
  Padding: {
    margin: theme.spacing(1),
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [open, setopen] = useState(false)

  const navigateTo = () => history.push('/register');
  const navigateToHome = () => history.push('/Area');

  function displayError(on, errortext="ERROR") {
    var elem = document.getElementById('error')
    elem.style.color = 'red'
    if (on) {
      elem.innerText = "WRONG EMAIL OR PASSWORD"
    }
    else
    {
      elem.innerText = ''
    }
  }
  const signin = async () => {
  console.log(username, password)
    let res = await API.login(username, password)
    console.log("FETCH LOGIN");
    console.log(res);
    if (res) {
      navigateToHome()
    }
    else {
      displayError(true, "WRONG EMAIL OR PASSWORD")
    }
  }

  
const openInNewTab = (url) => {
  // const popupWindow = window.open(
  //   url,
  //   "_blank",
  //   "width=800, height=600",
  // );
  let w = window.open(url + '/?react=true')
  // if (newWindow) newWindow.opener = null
  if (window.focus) {
    w.focus()
  }
  console.log(w)
}

useEffect(()  => {
  async function fetchData() {
  if (await API.isAuth() == true)
    navigateToHome()
  }
  window.addEventListener("message", event => {
    // console.log('test')
    // console.log(event.data, event.origin)
    localStorage.setItem('userID', event.data.userID)
    if (event.origin === 'https://area.gen-host.fr' || event.origin === 'http://localhost:8080') {
      localStorage.setItem('userID', event.data.user_id)
      navigateToHome()
      console.log(event.data)
    }
    // const { token, ok } = event.data;
  });
  fetchData()
}, []);

  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img  src={mainlogo} className={classes.Cardheader} alt="fireSpot"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <h3 id='error'></h3>
            <LoginTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setUsername(e.target.value)}}
            />
            <LoginTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <SignInButton
              // type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              // onClick={navigateToHome}
              onClick={()=> {signin()}}
            >
              Sign In
            </SignInButton>
            <GoogleButton className={classes.Padding} color="contained" variant="extended" onClick={() => openInNewTab( process.env.REACT_APP_SERVER_URL + '/auth/go-login' + '/' + 'test' )} size="small" >
              <ImGoogle className={classes.extendedIcon} />
              Login to google
            </GoogleButton>
            <GithubButton className={classes.Padding} color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/gh-login' + '/' + 'test' )} size="small">
              <ImGithub className={classes.extendedIcon} />
              Login to Github</GithubButton>
              <FacebookButton className={classes.Padding} color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/fb-login' + '/' + 'test')} size="small">
              <ImFacebook className={classes.extendedIcon} />
              Login to Facebook</FacebookButton>
            {/* <Modal open={open} onClose={()=>{setopen(false)}}>
              <iframe src={process.env.REACT_APP_SERVER_URL + '/auth/go-login' + '/' + 'test'} />
            </Modal> */}
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={navigateTo}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

