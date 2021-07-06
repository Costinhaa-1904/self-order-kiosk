import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Dialog, DialogTitle, Grid, List, ListItem, TextField, Typography,} from '@material-ui/core';
import React, { useContext, useEffect, useState,} from 'react'
import {Alert} from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addToOrder, clearOrder, listCategories, listProducts, removeFromOrder } from '../actions';
import Logo from '../components/Logo';
import { useStyles } from '../styles'
import { Store } from '../Store';
import axios from 'axios';

export default function OrderScreen(props) {
    const styles = useStyles();
    const [categoryName, setCategoryName] = useState('');
    const [quantity, setQuantity] = useState(1);

    //state function initialstate
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState({});
    const closeHandler = () => {
        setIsOpen (false);
    };
    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen (true); 
        setQuantity(1);
    };
    const addToOrderHandler = () => {

        addToOrder(dispatch, { ...product, quantity});
        setIsOpen (false);
        
    };
    const cancelOrRemoveFromOrder = (p) => {
        removeFromOrder(dispatch, product);
        setIsOpen (false);
    };
    const {state, dispatch} = useContext(Store);
    const{categories, loading, error} = state.categoryList;
    const{products, loading:loadingProducts , error:errorProducts,} = state.productList;
    const{orderItems, itemsCount, taxPrice, totalPrice, orderType,} = state.order;

    useEffect(() => {
        if(!categories){
            listCategories(dispatch);
        }
        else{
            listProducts(dispatch,categoryName)
        }
        
    },[dispatch, categories, categoryName]);

    const categoryClickHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch,categoryName)
    }
    const previewOrderHandler = () => {
        props.history.push(`/review`);
    }

    return (
        <div>
            <Box className = {styles.root}>
                <Dialog maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeHandler} >

                    <DialogTitle className={styles.center}>
                        Add{product.Name}
                    </DialogTitle>
                    <Box className={[styles.row, styles.center]}>  
                        <Button variant="contained" color="primary"  onClick={(e) => quantity> 1 && setQuantity(quantity-1)}>
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
                        <Button variant="contained" color="primary" disabled={quantity === product.current_quantity} onClick={(e) => setQuantity(quantity+1)}>
                            <AddIcon/>
                        </Button>
                    </Box>
                    <Box className={[styles.row, styles.around]}>  
                        <Button onClick={cancelOrRemoveFromOrder} variant="contained" color="primary" size="large" className={styles.largeButton} >
                            {orderItems.find((x)=> x.name === product.name,)? 'Remove From Order': 'Cancel'}
                        </Button>
                        <Button onClick={addToOrderHandler} variant="contained" color="primary" size="large" className={styles.largeButton}>
                            Add To Order
                        </Button>
                    </Box>
                </Dialog>  
                <Box className = {styles.main}>
                    <Grid container>
                        <Grid item md = {2}>
                            <List>
                                {loading ?(<CircularProgress />
                                ): error ?(
                                    <Alert severity = "error">{error}</Alert>
                                ):(
                                    <>
                                    <ListItem onClick={() => categoryClickHandler('')} button>
                                        <Logo large></Logo>
                                    </ListItem>

                                    {categories.map((category)=>(
                                       <ListItem button key = {category.name}
                                            onClick={() => categoryClickHandler(category.name)}
                                       >
                                           <Avatar alt = {category.name} src={category.image}/>
                                       </ListItem> 
                                    ))}
                                    </>
                                )}
                            </List>
                        </Grid>
                        <Grid item md = {10}>
                            <Typography 
                                gutterBottom
                                className = {styles.title}
                                variant = "h2"
                                component = "h2"
                            >
                                {categoryName || 'Main Menu' } 
                            </Typography>
                            <Grid container spacing = {1}>
                            {loadingProducts ?(
                                <CircularProgress />
                                    ): errorProducts ?(
                                        <Alert severity = "error">{errorProducts}</Alert>
                                    ):(
                                        products.map((product)=>(
                                            <Grid item md ={6}>
                                                <Card className = {styles.card} onClick={() => productClickHandler(product)}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component = "img"
                                                            alt={product.name}
                                                            image={product.image}
                                                            className = {styles.media}
                                                        />
                                                        <CardContent>

                                                            <Typography 
                                                                gutterBottom
                                                                variant = "body2"
                                                                color = "textPrimary"
                                                                component = "p"
                                                            >
                                                                {product.name}
                                                            </Typography>
                                                            <Box className = {styles.cardFooter}>
                                                                <Typography 
                                                                    variant = "body2"
                                                                    color = "textSecondary"
                                                                    component = "p"
                                                                >
                                                                    {product.calorie} Cal
                                                                </Typography>
                                                                <Typography 
                                                                    variant = "body2"
                                                                    color = "textSecondary"
                                                                    component = "p"
                                                                >
                                                                   Quant Disponivel: {product.current_quantity}
                                                                </Typography>
                                                                <Typography 
                                                                    variant = "body2"
                                                                    color = "textPrimary"
                                                                    component = "p"
                                                                >
                                                                    {product.price} €
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>
                                                    </CardActionArea> 
                                                </Card>
                                            </Grid>
                                        ))
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Box>
                        <Box className = {[styles.bordered, styles.space]}>
                            My Order: {orderType} | TAX: {taxPrice}€ | Total: {totalPrice}€ | Items: {itemsCount}
                        </Box>
                        <Box className={[styles.row, styles.around]}>  
                            <Button onClick={() => {clearOrder(dispatch); props.history.push(`/choose`);}} variant="contained" color="primary" className={styles.largeButton}>
                                Cancel Order
                            </Button>
                            <Button onClick={previewOrderHandler} variant="contained" color="secondary" disabled={orderItems.length === 0} className={styles.largeButton}>
                                Done
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
