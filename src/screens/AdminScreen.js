import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import {useStyles} from '../styles';
import { Store } from '../Store';
import { listOrders } from '../actions';
import axios from 'axios';

export default function AdminScreen() {

    const styles = useStyles();
    const {state, dispatch} = useContext(Store);
    //ir buscar os states das orders etc...
    const {loading, orders, error} = state.orderList;
    //novo
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        listOrders(dispatch);
    }, [dispatch]);

    //novo
    const ProductHandler = (order,p) => {
        setProduct(p);
        setQuantity(p.quantity);
        setCurrentQuantity(p,"add",p.quantity);
        setOrderStateHandler(order, 'cancel')
    };
    const setOrderStateHandler = async (order, action) => {
        try{
            await axios.put('api/orders/' + order._id,{
                action: action,
            })
            //pede-se para listar orders pois se houver mudanças nos pedidos da-se o refresh
            listOrders(dispatch);
        }catch(err)
        {
            alert(err.message);
        }

    }

    //novo
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
    
    return (
    <Box className ={[styles.root]}>
        <Box className = {[styles.main]}>

            {loading ? (
                <CircularProgress/>
            ): error ?(
                <Alert severity = "error">{error}</Alert>
            ): (
                <TableContainer component = {Paper}>
                    <Table aria-label = 'Orders'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Number</TableCell>
                                <TableCell align="right">Price&nbsp;(€)</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">Items</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Payment</TableCell>
                                <TableCell align="right">State</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order)=>(
                                <TableRow key={order.name}>
                                    <TableCell component ="th" scope="row">{order.number}</TableCell>
                                    <TableCell align="right">{order.totalPrice}</TableCell>
                                    <TableCell align="right">{order.orderItems.length}</TableCell>
                                    <TableCell align="right">{order.orderItems.map((item)=>(
                                        <Box>
                                            {item.name} x {item.quantity} 
                                        </Box>
                                    ))}
                                    </TableCell>
                                    <TableCell align="right">{order.orderType}</TableCell>
                                    <TableCell align="right">{order.paymentType}</TableCell>
                                    <TableCell align="right">
                                        {order.inProgress 
                                            ? 'In Progress' 
                                            : order.isReady 
                                            ? 'Ready'
                                            : order.isDelivered
                                            ? 'Delivered' : 'Unknown'
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" onClick={() => setOrderStateHandler(order, 'ready')}  color="secondary">
                                            Ready
                                        </Button>
                                        <Button variant="contained" onClick={() => {order.orderItems.map((item)=>(ProductHandler(order,item)))}}  color="primary">
                                            Cancel
                                        </Button>
                                        <Button variant="contained" onClick={() => setOrderStateHandler(order, 'deliver')}>
                                           Deliver
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    </Box>
    );
}