import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { purple } from '@material-ui/core/colors';

import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AreaToggle from './AreaList';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    padding: {
      margin: theme.spacing(2),
      
    },
    popup: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: "#4285F4",
      '&:hover': {
        backgroundColor: "#0E62ED",
      },
    },
  }));


export default function PopoverPopupState() {
    const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Fab className={classes.popup} variant="contained" {...bindTrigger(popupState)}>
          <AddIcon/>
          ADD AREA
          </Fab>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
              <AreaToggle/>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}