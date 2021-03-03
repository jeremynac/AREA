import React, {Component} from 'react';
import { green } from '@material-ui/core/colors';
import {Button, Typography, Fab} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
class LoginCheck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }
    
    render() {
            return this.state.isLoggedIn &&  <CheckCircleIcon style={{ color: green[500] }}/> 
    }
}


export {LoginCheck } ;