import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,Card, ListSubheader,IconButton, CardActions,Menu,MenuItem, TextField, Select,Grid, Button, Container} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PurpleSwitch, AddButton} from './Buttons';
import {SignInButton, LoginTextField} from './Buttons';
import MenuListComposition from './MenuAction';
import MenuListCompositionREACTION from './MenuReaction';
import API from '../auth/requests';
import {useHistory} from 'react-router-dom';


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
  const [loaded, setloaded] = useState(false)

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

  //const fetchScript() {}

  const fetchScript = async (as, rs) => {
    try {
      let res3 = await API.getScript(props.id)
        console.log(res3)
        if (res3) {
          console.log(as, rs)
            // console.log(res.script.action == actions[0]._id)
            let i = 0, a, r;
            for (i in as) {
              if (as[i]._id == res3.script.action) {
                a = as[i]

              }
            }
            for (i in rs) {
              if (rs[i]._id == res3.script.reaction) {
                r = rs[i]
              }
            }
            if (a) {
              setaction(a)
              seta_params(res3.script.action_parameters)
            }
            if (r) {
              setreaction(r)
              setr_params(res3.script.reaction_parameters)
            }
            // setaction(actions.find(a => res.script.action == a._id))
            // console.log(action)
            // setreaction(reactions.find(r => res.script.reaction == r._id))
            // reactions.find(r => res.script.reaction == r._id)
            // console.log(reaction)
            setname(res3.script.name)
            setactivated(res3.script.activated)
            setloaded(true)
          }
      } catch(e) {
          console.log(e)
      }
  }

  useEffect(()=> {
    async function fetchAPI() {
        console.log("Fetching actions/reactions...")
        let actions_temp, reactions_temp;
        try {
        API.getActions().then(
          res=>{
              if (res) {
                setactions(res)
                actions_temp = res
                if (res[0]) {
                  setaction(res[0])
                }
                API.getReactions().then(
                  res=>{
                    if (res) {
                      setreactions(res)
                      reactions_temp = res
                      if (res[0]) {
                        setreaction(res[0])
                      }
                    }
                    fetchScript(actions_temp, reactions_temp)
                  }
                ).catch()
              }
            }
          ).catch()
        }  catch(e) {
          console.log(e)
        }
      }
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
  if (loaded) {
    return (
    <Card>
      <ListSubheader>ADD AREA </ListSubheader>
          <CardActions>
          <LoginTextField
              variant="outlined"
              margin="normal"
              id="name"
              label="Area name"
              name="name"
              autoComplete="Area"
              fullWidth="true"
              // autoFocus
              size="large"
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
            <MenuListComposition title={'Action'} params={a_params} items={actions} item={action} handleChangeItem={(value)=>{setaction(value)}} handleChangeParams={(key, value)=> handleChangeParams(key, value, 1)}/>
            <MenuListComposition title={'Reaction'} params={r_params} items={reactions} item={reaction} handleChangeItem={(value)=>{setreaction(value)}} handleChangeParams={(key, value)=> handleChangeParams(key, value, 0)}/>
          </CardActions>
          <AddButton className={classes.padding} onClick={()=>{submit()}} >SUBMIT</AddButton>
        </Card>
        )
  }
  else {
        return (
            <h4>loading</h4>
        )
    }
}