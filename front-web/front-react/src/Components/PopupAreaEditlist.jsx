import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AreaToggle from './AreaList';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {IconButton,Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';


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
    },
  }));


export default function PopoverPopupEDIT(props) {
    const classes = useStyles();

  return (
    <PopupState  variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton variant="contained" color="primary" {...bindTrigger(popupState)}>
            <EditIcon />
          </IconButton>
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
              <AreaToggle create={true} id={props.id} update={()=> {props.update()}} /> 
          </Popover>
        </div>
      )}
    </PopupState>
  );
}