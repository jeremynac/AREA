import React, {Component, useState, useEffect, useStyles} from 'react';
import { green } from '@material-ui/core/colors';
import {Button, Typography, Fab} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import API from '../auth/requests'


const LoginCheck = () => {
    
    const [myservices, setServices] = useState([]);
    useEffect(()=> {
        async function fetchAPI() {
            console.log("Fetching Login...")
            API.getServiceAllStatus().then(res=>{
                console.log(res)
                if (res.tournaments !== undefined) {
                    setServices(res.services)
                }
            }).catch(e=>{
                console.log(e)
            })
        };
        console.log("print 2")
        fetchAPI()
    }, []);
    return (myservices[1] && myservices[1].connected ? "myservices[1].connected && <CheckCircleIcon style={{ color: green[500] }}/> " : "")
};

export default LoginCheck;

