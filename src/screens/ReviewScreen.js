import {Box, Button, Card, CardActionArea, CardContent, Dialog, DialogTitle, Grid, TextField, Typography,} from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { addToOrder, removeFromOrder } from '../actions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Store } from '../Store';
import { useStyles } from '../styles'
import Logo from '../components/Logo';
import axios from 'axios';

export default function ReviewScreen(props) {

    //O closeHandler serve para informar o computador que a Dialog Box foi fechada sendo que usa a funçao setisOpen(false) ou seja isOpen=false
    //O productClickHandler é utilizado quando o utilizador decide editar um produto (aumentar ou diminuir a quantidade) este vai guardar o producto com o setproduct
    //e dizer que a dialogbox esta aberta

    //o que é o dispatch 
    /*/
    function dispatch(action) {
  check that the action argument is an object
  
  
  if (typeof action !== 'object' || obj === null) {
    throw new Error('actions must be plain object.');
  }

  // check that the action object has a 'type' property
  
  
  if (typeof action.type === 'undefined') {
    throw new Error('Actions may not have an undefined "type" property.');
  }

  // call the reducer and pass in currentState and action
  // capture the new state object in currentState, thus updating the state
  
  
  currentState = reducer(currentState, action);
} /*/


    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState({});
    const styles = useStyles();

    const closeHandler = () => {
        setIsOpen (false);
    };
    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen (true); 
        setQuantity(p.quantity);
    };
    const addToOrderHandler = () => {
        addToOrder(dispatch, { ...product, quantity});
        setIsOpen (false);
    };
    const cancelOrRemoveFromOrder = (p) => {
        removeFromOrder(dispatch, product);
        setIsOpen (false);
    };
    const procedToCheckoutHandler = (p) => {
  
        setProduct(p);
        setQuantity(p.quantity);
        setCurrentQuantity(p,"sub",p.quantity);
    
        props.history.push(`/select-payment`);
    };

    const setCurrentQuantity= async (product, action, quantity) => {
        try{
            await axios.put('api/products/' + product._id,{
                action: action,
                quantity: quantity,
            })
        }catch(err)
        {
            alert(err.message);
        }
    }
    const {state, dispatch} = useContext(Store);
    const{
        orderItems,
        itemsCount,
        totalPrice,
        taxPrice,
        orderType,
    } = state.order; 

    return (
        <Box className = {[styles.root]}>
            <Box className = {[styles.main,styles.center,styles.navy]}>
                <Dialog maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeHandler}>

                    <DialogTitle className={styles.center}>
                        Add{product.Name}
                    </DialogTitle>
                    <Box className={[styles.row, styles.center]}>  
                        <Button variant="contained" color="primary" disabled={quantity === 1} onClick={(e) => quantity> 1 && setQuantity(quantity-1)}>
                            <RemoveIcon/>
                        </Button>
                        <TextField
                        inputProps={{className: styles.largeInput}}
                        InputProps={{bar: true, inputProps: {className: styles.largeInput,}, }}
                        className={styles.largeNumber}
                        type="number"
                        variant="filled"
                        min={1}
                        value={quantity}   
                        />
                       
                        <Button variant="contained" color="primary" onClick={(e) => setQuantity(quantity+1)}>
                            <AddIcon/>
                        </Button>
                    </Box>
                    <Box className={[styles.row, styles.around]}>  
                        <Button onClick={cancelOrRemoveFromOrder} variant="contained" color="primary" size="large" className={styles.largeButton}>
                            {orderItems.find((x)=> x.name === product.name,)? 'Remove From Order': 'Cancel'}
                        </Button>
                        <Button onClick={addToOrderHandler} variant="contained" color="primary" size="large" className={styles.largeButton}>
                            Change Order
                        </Button>
                    </Box>
                </Dialog>
                <Box className = {[styles.center,styles.column]}>
                    <Logo></Logo>
                    <Typography gutterBottom className = {styles.title} variant = "h3" component = "h3">Review my {orderType} order</Typography>
                </Box>
                <Grid container>
                {orderItems.map((orderItem)=>(
                    <Grid item md={12} key={orderItem.name}>
                        <Card className={styles.card} onClick={() => productClickHandler(orderItem)}>
                        <CardActionArea>
                        <CardContent>
                            <Box  className={[styles.row,styles.between]}>
                                <Typography gutterBottom variant = "body2" color="textPrimary" component = "p">{orderItem.name}</Typography>
                                <Button variant="contained"> Edit</Button>
                            </Box>
                            <Box  className={[styles.row,styles.between]}>  
                                <Typography gutterBottom variant = "body2" color="textSecondary" component = "p">{orderItem.calorie} Cal</Typography>
                                <Typography gutterBottom variant = "body2" color="textPrimary" component = "p">{orderItem.quantity} * {orderItem.price}€</Typography>
                            </Box>
                        </CardContent>
                        </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
            <Box>
                <Box>
                    <Box className = {[styles.bordered, styles.space]}>
                        My Order: {orderType} | TAX: {taxPrice}€ | Total: {totalPrice}€ | Items: {itemsCount}
                    </Box>
                    <Box className={[styles.row, styles.around]}>  
                        <Button onClick={() => {props.history.push(`/order`);}}  variant="contained" color="primary" className={styles.largeButton}>
                            Back
                        </Button>
                           <Button onClick={() => {orderItems.map((orderItem)=>(procedToCheckoutHandler(orderItem)))}} variant="contained" color="secondary" disabled={orderItems.length === 0} className={styles.largeButton}>
                            Proceed To Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
