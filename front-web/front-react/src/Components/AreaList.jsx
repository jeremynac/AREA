import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {ListItem,Card, ListSubheader, CardActions} from '@material-ui/core';
import {PurpleSwitch, AddButton} from './Buttons';
import { LoginTextField} from './Buttons';
import MenuListComposition from './MenuAction';
import API from '../auth/requests';

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

  function displayADDarea(on, errortext="ERROR", color='red') {
    var elem = document.getElementById('error')
    elem.style.color = color
    if (on) {
      elem.innerText = errortext
    }
    else
    {
      elem.innerText = "Area not Added" 
    }
  }

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
        if (res.status == 200) {
          displayADDarea(true, "Area submited", 'black')
        }
        else {
          displayADDarea(true, "Error in you submission")
        }
      } 
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }  

  const fetchScript = async () => {
    try {
      let res3 = await API.getScript(props.id)
        console.log(res3)
        if (res3) {
          console.log(actions)
            // console.log(res.script.action == actions[0]._id)
            let i = 0, a, r;
            for (i in actions) {
              if (actions[i]._id == res3.script.action) {
                a = actions[i]

              }
            }
            for (i in reactions) {
              if (reactions[i]._id == res3.script.reaction) {
                r = reactions[i]
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
          }
      } catch(e) {
          console.log(e)
      }
  }

  useEffect(()=> {
    async function fetchAPI() {
        console.log("Fetching Login...")
        try {
        let res1 = await API.getActions()
            console.log(res1)
            if (res1) {
                setactions(res1)
                if (res1[0]) {
                  setaction(res1[0])
                }
            }
        let res2 = await API.getReactions()
          console.log(res2)
          if (res2) {
              setreactions(res2)
              if (res2[0]) {
                setreaction(res2[0])
              }
          }
        }  catch(e) {
          console.log(e)
        }
      }
    console.log("print 2")
    fetchAPI()
      // .then(r=>{
      //   fetchScript()
      // })
      // .catch(
      //   e=>{}
      // )
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
    <Card >
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
            <MenuListComposition

              title={'Action'} 
              items={actions} 
              item={action}
              handleChangeItem={(value)=>{setaction(value)}} 
              handleChangeParams={(key, value)=> handleChangeParams(key, value, 1)}
            />
            <MenuListComposition 
              title={'Reaction'} 
              items={reactions}
              item={reaction}
              handleChangeItem={(value)=>{setreaction(value)}} 
              handleChangeParams={(key, value)=> handleChangeParams(key, value, 0)}
            />
          </CardActions>
          <AddButton className={classes.padding} onClick={()=>{submit() }} >SUBMIT</AddButton>
          <h3 id="error" ></h3>

    </Card>

  );
}