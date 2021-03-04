import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,Card, ListSubheader,IconButton, CardActions,Menu,MenuItem, TextField, Select} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PurpleSwitch, AddButton} from './Buttons';
import {SignInButton, LoginTextField} from './Buttons';
import MenuListComposition from './MenuAction';
import MenuListCompositionREACTION from './MenuReaction';
import API from '../auth/requests';
import {useHistory} from 'react-router-dom'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  padding: {
    margin: theme.spacing(2),
  },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function AreaList(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reaction, setreaction] = useState('')
  const [a_params, seta_params] = useState({})
  const [r_params, setr_params] = useState({})
  const [action, setaction] = useState('')
  const [name, setname] = useState('')
  const [activated, setactivated] = useState(true)
  const [actions, setactions] = useState([])
  const [reactions, setreactions] = useState([])
  const history = useHistory();

  const [checked, setChecked] = React.useState(['wifi']);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const submit = async () => {
    console.log('test')
    let res;
    try {
      if (props.update) {
        res = await API.updateScript(props.id, name, action._id, reaction._id, a_params, r_params, activated)  
        if (res) {
          props.update()
        }    
      } else {
        res = await API.createScript(name, action._id, reaction._id, a_params, r_params, activated)
        if (res) {
          history.push('/Area')
        }
      } 
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }  

  useEffect(()=> {
    async function fetchAPI() {
        console.log("Fetching Login...")
        API.getActions().then(res=>{
            console.log(res)
            if (res) {
                setactions(res)
                if (res[0]) {
                  setaction(res[0])
                }
            }
        }).catch(e=>{
            console.log(e)
        })
        API.getReactions().then(res=>{
          console.log(res)
          if (res) {
              setreactions(res)
              if (res[0]) {
                setreaction(res[0])
              }
          }
        }).catch(e=>{
            console.log(e)
        })
    };
    console.log("print 2")
    fetchAPI()
}, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeParams = (key, value, a) => {
    if (a) {
      a_params[key] = value
    } else {
      r_params[key] = value
    }
  }

  return (
    <Card>
        <ListSubheader>ADD AREA </ListSubheader>
          <CardActions>
          <LoginTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Area name"
              name="name"
              autoComplete="Area"
              autoFocus
              onChange={(e)=>{setname(e.target.value)}} 
              value={name}
            />
          <PurpleSwitch edge="end"
                        onChange={(e)=>{setactivated(e.target.checked)}}
                        checked={activated}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }} >
          </PurpleSwitch>
          </CardActions>
          <CardActions>
            <MenuListComposition title={'Action'} items={actions} item={action} handleChangeItem={(value)=>{setaction(value)}} handleChangeParams={(key, value)=> handleChangeParams(key, value, 1)}/>
          </CardActions>
          <CardActions>
            <MenuListComposition title={'Reaction'} items={reactions} item={reaction} handleChangeItem={(value)=>{setreaction(value)}} handleChangeParams={(key, value)=> handleChangeParams(key, value, 0)}/>
          </CardActions>
          <AddButton className={classes.padding} onClick={()=>{submit()}} >SUBMIT</AddButton>
    </Card>
  );
}