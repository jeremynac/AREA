import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Parameters from './Params'
import {Modal, Select, Card} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null);
  const [item, setitem] = useState(props.item)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleChangeItem = (e) => {
    console.log(e.target.value)
    setitem(e.target.value)
    props.handleChangeItem(e.target.value)
  } 



  return (
    <Card className={classes.root}>
      <div>
        <h1>
        {props.title}
        </h1>
        {/* <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
            {props.title}
        </Button>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={()=>{console.log(props.item.parameters)}}
        >
            test
        </Button> */}
        {/* <Modal open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal> */}
          {/* {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper> */}
                {/* <ClickAwayListener onClickAway={handleClose}> */}
                  <div>

                  <Parameters handleChange={props.handleChangeParams} params={props.item.parameters || []} param={props.params}/>
                  {/* <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}> */}
                    </div>
                  {/* </MenuList> */}
                {/* </ClickAwayListener> */}
              {/* </Paper>
            </Grow>
          )} */}
        {/* </Modal> */}

        <Select
          variant="outlined"
          color="primary"
          labelId="action"
          id="demo-simple-select"
          fullWidth
          value={item.name}
          onChange={handleChangeItem} 
        >
          {
            props.items.map((item)=>( 
            <MenuItem  key={item.name} value={item}>{item.name}</MenuItem>
            ))
          } 
        </Select>
        {
          <p>
            {item.description}
          </p>
        }
      </div>
    </Card>
  );
}