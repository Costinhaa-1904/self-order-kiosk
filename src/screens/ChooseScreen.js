import {Box, Fade, Typography, CardActionArea, CardMedia, CardContent, Card, Button} from '@material-ui/core';
import React, { useContext } from 'react';
import { clearOrder, setOrderType } from '../actions';
import Logo from '../components/Logo';
import { Store } from '../Store';
import {useStyles} from '../styles';

export default function ChooseScreen(props) {
    const styles = useStyles();
    //Basicamente ele aproveita os valores anteriormente dados na store para depois renova-los sendo que o default é o inicial state(o dispatch serve para mudar o estado do store)
    const {dispatch} = useContext(Store);

    const chooseHandler = (orderType) => {
        setOrderType(dispatch, orderType);
        props.history.push('/order');
    };

    return (
        <Fade in = {true}>
            <Box className ={[styles.root, styles.navy]}> 
                <Box className ={[styles.main, styles.center]}>
                    <Logo></Logo>
                    <Typography component="h3" variant="h3" className ={styles.center} gutterBottom>
                        Where will you be eating today?
                    </Typography>  
                    <Box className ={styles.cards}>
                        <Card className ={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => chooseHandler('Eat In')}>
                                <CardMedia component= "img" alt= "Eat In" image ="/images/eating.png" className ={styles.media}/> 
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" color= "textPrimary"component="p">
                                            Eat In
                                        </Typography>
                                    </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className ={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => chooseHandler('Take Out')}>
                                <CardMedia component= "img" alt= "Take Out" image ="/images/takeout.png" className ={styles.media}/> 
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" color= "textPrimary"component="p">
                                            Take Out
                                        </Typography>
                                    </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box> 
                    <Box>
                            <Box>
                                <Box className={[styles.row, styles.around]}>  
                                    <Button onClick={() => {clearOrder(dispatch); props.history.push(`/`);}} variant="contained" color="primary" className={styles.largeButton}>
                                        Cancel 
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                </Box>
            </Box>
        </Fade>
    );
}