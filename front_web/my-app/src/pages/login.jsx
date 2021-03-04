import React, { useState } from "react";
import './App.css';
import { FormControlLabel, Paper, Avatar, Checkbox, Box, Link, Typography, Grid , TextField, CssBaseline , Button, makeStyles } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import mainlogo from "../Components/Area.png"
import {SignInButton, LoginTextField} from '../Components/Buttons';
import { ImGoogle, ImFacebook, ImGithub, ImTwitch, ImTrello } from "react-icons/im";
import { FaDiscord } from "react-icons/fa";
import {GoogleButton, DiscordButton, FacebookButton, TrelloButton,GithubButton,TwitchButton} from '../Components/Buttons';

import API from '../auth/requests'

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
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigateTo = () => history.push('/register');
  const navigateToHome = () => history.push('/Area');
  const signin = async () => {
    console.log(username, password)
    let res = await API.login(username, password)
    console.log("FETCH LOGIN");
    console.log(res);
    if (res) {
      navigateToHome()
    }
  }

  
    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }





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
            <GoogleButton color="contained" variant="extended" onClick={() => openInNewTab((process.env.REACT_APP_SERVER_URL) + '/auth/go-login' + '/' + 'test' )} size="small" >
              <ImGoogle className={classes.extendedIcon} />
              Login to google
            </GoogleButton>
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

