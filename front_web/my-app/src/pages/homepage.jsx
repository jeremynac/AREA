import React from "react";
import { createMuiTheme, MuiThemeProvider, Container, makeStyles, Typography, Grid, CssBaseline, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const THEME = createMuiTheme({
  typography: {
   fontFamily: "Arial",
   fontSize: 14,
  }
});

THEME.typography.h3 = {
  fontSize: '2.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  fontFamily: 'Helvetica Neue',
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
  },
  logoHorizontallyCenter: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));


export default function Homepage(props) {
  const classes = useStyles();
  const history = useHistory();

  function handleLoginClick() {
    history.push("/login");
  }
  function handleCreateAccountClick() {
    history.push("/register");
  }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <MuiThemeProvider theme={THEME} >
         <Typography variant="h3">
           AREA
          </Typography>
        </MuiThemeProvider>
        <form className={classes.form} noValidate>
        <Grid container spacing={2}> 
          <Grid item xs={12}>
            <Button
              type="Login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {handleLoginClick}
            >
              LOGIN
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="Login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {handleCreateAccountClick}

            >
              Create Account
            </Button>
          </Grid>
        </Grid>
        </form>
      </div>
    </Container>
  );
}