import {Box, Typography, CardActionArea, CardMedia, CardContent, Card,} from '@material-ui/core';
import React, { useContext } from 'react';
import {useStyles} from '../styles';
import Logo from '../components/Logo';
import { setPaymentType } from '../actions';
import { Store } from '../Store';

export default function SelectPaymentScreen(props) {
    const styles = useStyles();
    const {dispatch} = useContext(Store);

    const selectHandler = (paymentType) => {
        //mudar pagina para tipo de pagamento
        setPaymentType(dispatch, paymentType);
        if(paymentType === 'Pay Here')
        {
            props.history.push('/payment');
        }
        else
        {
            props.history.push('/complete');
        }
    };

    return (
        <Box className = {[styles.root, styles.navy]}>
            <Box className = {[styles.main, styles.center]}>
                <Logo large></Logo>
                <Typography  className = {styles.center} gutterBottom variant= "h3" component= "h3">
                    Select Payment Type
                </Typography>
            </Box>
            <Box className = {styles.cards}>
                <Card className ={[styles.card, styles.space]}> 
                    <CardActionArea onClick={() => selectHandler('Pay Here')}>
                        <CardMedia component= "img" alt= "Pay Here" image ="/images/payhere.png" className ={styles.media}/> 
                            <CardContent>
                                <Typography gutterBottom variant="h4" color= "textPrimary"component="p">
                                    Pay Here
                                </Typography>
                            </CardContent>
                    </CardActionArea>
                </Card>
                <Card className ={[styles.card, styles.space]}> 
                    <CardActionArea onClick={() => selectHandler('At Counter')}>
                        <CardMedia component= "img" alt= "At Counter" image ="/images/atcounter.png" className ={styles.media}/> 
                            <CardContent>
                                <Typography gutterBottom variant="h4" color= "textPrimary"component="p">
                                    At Counter
                                </Typography>
                            </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    );
}