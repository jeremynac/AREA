import React, { useState } from "react";
import './App.css';
import { FormControlLabel, Paper, Checkbox, Link, Typography, Grid , CssBaseline, makeStyles } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {SignInButton, LoginTextField} from '../Components/Buttons';
import mainlogo from "../Components/Area.png"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    padding: theme.spacing(6),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('')

  // const register = async () => {
  //   console.log(username, password)
  //   let res = await API.login(username, password)
  //   if (res) {
  //     navigateToHome()
  //   }
  // }

  const navigateTo = () => history.push('/');
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img  src={mainlogo} className={classes.Cardheader} alt="fireSpot"/>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          {/* <form className={classes.form} noValidate> */}
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
            />
            <Grid container spacing={2}>
              <Grid item xs >
                  <LoginTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="First Name"
                  label="First Name"
                  type="First Name"
                  id="First Name"
                  autoComplete="First Name"
                />
              </Grid>

              <Grid item xs>
                <LoginTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Last Name"
                  label="Last Name"
                  type="Last Name"
                  id="Last Name"
                  autoComplete="Last Name"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
              <SignInButton
                // type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                // onClick={}
                // className={classes.submit}
              >
                Sign In
              </SignInButton>
              <Grid container>
              <Grid item >
                <Link href="#" variant="body2" onClick={navigateTo}>
                  Login Page
                </Link>
              </Grid>
            </Grid>
          {/* </form> */}
        </div>
      </Grid>
    </Grid>
  );
}

