import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Typography,Card,CardContent} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function AreaList() {
  const classes = useStyles();
  const theme = useTheme();

  return (
      <Card> 
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                AREA List
            </Typography>
            </CardContent>
      </Card>
  );
}