import {  Card, CardContent, Divider, CardActions, List, ListItem, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, {useState} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
    //   width: '100%',
    //   backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      background:'none',
      margin: 'none'
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    card2:{
        margin_bottom: '2px',
    },
    // nobg: {
    //     background:'none',
    //     justify_content: 'center'
    // }
  }));

export default function Notifs(props) {
    const [notifopen, setnotifopen] = useState(false)
    const [notifanchor, setnotifanchor] = useState(null)

    const classes = useStyles();

    const handleNotifsOpen = (event) => {
        console.log(event.currentTarget)
        setnotifopen(true); 
        setnotifanchor(event.currentTarget);
      }
    
    const handleNotifsClose = () => {
    setnotifopen(false); 
    setnotifanchor(null)
    }

    const timestampToDate = (UNIX_timestamp) => {
            var a = new Date(UNIX_timestamp);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
    }
    return (
        <Box style={{background: 'none'}}>
            <Box justifyContent="center" display="flex">
                <Typography variant="h4" style={{color: "rgba(255, 255, 255, 1)"}}>
                    Notifications
                </Typography>
            </Box>
            <Box justifyContent="center" display="flex">
                <List style={{maxHeight: 200, overflow: 'auto', background: 'none'}} m="0" p="0">
                {
                    props.notifs.map((n)=>(
                            <ListItem>
                            <Card m="0" p="0">
                                <CardContent>
                                    <Typography>
                                    {n.message}
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    {timestampToDate(n.date)}
                                </CardActions>
                            </Card>
                            <Divider />
                            </ListItem>
                    ))
                }
                </List>
            </Box>
            </Box>
    )
}