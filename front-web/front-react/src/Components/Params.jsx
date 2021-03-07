import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,Card, ListSubheader,IconButton, CardActions,Menu,MenuItem, TextField, Select, Divider} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PurpleSwitch, AddButton} from './Buttons';
import {SignInButton, LoginTextField} from './Buttons';
import MenuListComposition from './MenuAction';
import MenuListCompositionREACTION from './MenuReaction';


const useStyles = makeStyles((theme) => ({
  padding: {
    margin: theme.spacing(2),
    
  },
}));
function Param(props) {
    const classes = useStyles();
    const [value, setvalue] = useState('')
    const handleChange = (e) => {
      setvalue(e.target.value)
      props.handleChange(props.name, value)
    }
    switch(props.type){
      case 'String':
        return (
            <CardActions className={classes.padding}>
            {props.name}
            <LoginTextField fullWidth variant="outlined" className={classes.padding} onChange={handleChange} value={value} placeholder={props.name}/>
            </CardActions>
        )
      case 'Boolean':
        return (
            <CardActions className={classes.padding}>
            {props.name}
            <PurpleSwitch className={classes.padding} onChange={handleChange} value={value} />
            </CardActions>
        )
      default: 
          return (
            <h1>error</h1>
          )
    }
  
  }
    
export default function Parameters(props) {
    const handleChange = (key, value) => {
      props.handleChange(key, value)
    }
    return (
      <div>
      {
        props.params.map((p)=>(
          <Param handleChange={handleChange} name={p.name} type={p.type} key={p.name}/>
      ))
      }
    </div>)
  }