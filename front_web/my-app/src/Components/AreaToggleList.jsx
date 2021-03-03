import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,Divider,Card} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function AreaToggle() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card>
        <List className={classes.root} subheader={<li />}>
            {[0, 1, 2, 3, 4].map((sectionId) => (
                    <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        {[0].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                            <ListItemText primary={`Item ${item}`} />
                        </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    </Card>
  );
}