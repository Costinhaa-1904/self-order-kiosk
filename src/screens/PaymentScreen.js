import { Box, Typography, Button, } from '@material-ui/core';
import React from 'react';
import CodTexto from '../components/CodTexto';
import Logo from '../components/Logo';
import {useStyles} from '../styles';

export default function PaymentScreen(props) {
    const styles = useStyles();
    return (
        <Box className = {[styles.root, styles.navy]}>
            <Box className = {[styles.main, styles.center]}>
                <Box>
                    <Logo large></Logo>
                    <Typography  className = {styles.title} gutterBottom variant= "h5" component= "h5">
                        Please follow the instruction on the PIN pad
                    </Typography>
                    <CodTexto></CodTexto>
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>  
                <Button onClick={() => {props.history.push(`/complete`);}} variant="contained" color="secondary" className={styles.largeButton}>
                    Complete Order
                </Button>
            </Box> 
        </Box>
        
    );   
}