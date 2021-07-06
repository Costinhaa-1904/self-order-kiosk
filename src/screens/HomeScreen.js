import React, { useState } from 'react'
import {Box, Card, CardActionArea, Typography} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import {useStyles} from '../styles'
import Logo from '../components/Logo';
import axios from 'axios';
import Time from '../components/Time';

export default function HomeScreen(props) {
    const styles = useStyles();
    const [temperature,setTemperature] = useState("11");
    const city = useState("Lisbon");
    const country = useState("PT");

    const getWeatherData = (city) =>
    {
        axios({
            method : 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=Lisbon,PT&APPID=86568e8cbba45e2818789f2bb325394b'
        })

        .then((response) => {
            console.log(response.data.main.temp);
            setTemperature(response.data.main.temp - 273.15)
        });
    };
    getWeatherData(city);

    return (
        <Card>
            <CardActionArea onClick={() =>props.history.push('/choose')}>
                <Box className ={[styles.root, styles.red]} > 
                    <Box className ={[styles.navy, styles.center]}>
                        <Typography component ="h5"variant="h5">
                            <Time></Time>
                            {city} Temperature - {Math.round(temperature*100)/100} C
                        </Typography> 
                    </Box>
                    <Box className ={[styles.main, styles.center]} >
                        <Typography component="h6" variant="h6">
                            Fast & Easy
                        </Typography> 
                        <Typography component="h1" variant="h1">
                            Fast & Easy
                            Order <br/> & pay<br /> here
                        </Typography> 
                        <TouchAppIcon fontSize = "large"></TouchAppIcon>
                    </Box>
                    <Box className ={[styles.navy, styles.center]}>
                        <Logo></Logo>
                        <Typography component = "h5"variant="h5">
                            Touch to Start
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
