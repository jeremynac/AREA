import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,Card, ListSubheader,IconButton,Divider} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {PurpleSwitch,AddButton} from './Buttons';
import API from '../auth/requests';
import PopoverPopupEDIT from './PopupAreaEditlist';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  padding: {
    margin: theme.spacing(2),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function AreaToggle() {
  const classes = useStyles();
  const theme = useTheme();

  const [reload, setReload] = useState(false);
  const [checked, setChecked] = useState(['wifi']);
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

  const [myscripts, setScripts] = useState([]);
  const refetchAPI = async () => {
      console.log("Fetching Login...")
      API.getUserScripts().then(res=>{
          console.log(res)
          if (res) {
              setScripts(res)
          }
      }).catch(e=>{
          console.log(e)
      })
  };
  useEffect(()=> {
      async function fetchAPI() {
          console.log("Fetching Login...")
          API.getUserScripts().then(res=>{
              console.log(res)
              if (res) {
                  setScripts(res)
              }
          }).catch(e=>{
              console.log(e)
          })
      };
      console.log("print 2")
      fetchAPI()
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleActivateScript = (id, activated) => {
    API.activateScript(id, activated).then(
      res=>{console.log(res)
      refetchAPI()}
    ).catch(
      e=>console.log(e)
    )
  }

  const handleDeleteScript = (id) => {
    API.deleteScript(id).then(
      res=>{console.log(res)
        refetchAPI()}
        ).catch(
      e=>console.log(e)
    )
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateScripts = () => {
    refetchAPI()
  }
  return (
    <Card>
        <ListSubheader>AREA HUB </ListSubheader>
            {myscripts[0] ? myscripts.map((script) => (
                    <List key={script._id} className={classes.listSection}>
                        <ListItem>
                            <ListItemText>
                              {script.name}
                            </ListItemText>
                            <PurpleSwitch edge="end"
                                onClick={() => {console.log('test'); handleActivateScript(script._id, !(script.activated))}}
                                checked={script.activated}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }} >
                            </PurpleSwitch>
                            <PopoverPopupEDIT id={script._id} update={updateScripts}/>
                            <IconButton aria-label="delete" onClick={()=>{handleDeleteScript(script._id)}}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                        <Divider/>

                </List>
            )) : ""}
    </Card>
  );
}