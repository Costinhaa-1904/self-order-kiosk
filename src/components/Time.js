import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useStyles} from '../styles'

export default function Time(props){
    //isto vai transformar o tempo e a data numa string
    const[cTime,setTime]=useState(new Date().toLocaleTimeString());
    const [cor,mcor]= useState("");
    const styles = useStyles();

    useEffect(() =>
    {
        setInterval(() =>{
            var d = new Date();
            setTime(d.toLocaleTimeString())
            var secs= d.getSeconds();

            if(secs % 3 === 0 && secs % 5 === 0)
            {
                mcor("primary");
            }
            else if(secs % 3 === 0)
            {
                mcor("secondary")
            }
            else if(secs % 5 === 0)
            {
                mcor("error")
            }
            else{ mcor("") }

        },1000)
    })

    return(
        <Typography color = {cor} component ="h5"variant="h5">
            <h1>{cTime}</h1>  
        </Typography>
    );  
}
