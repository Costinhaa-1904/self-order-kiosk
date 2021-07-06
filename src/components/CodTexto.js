import { Box, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import {useStyles} from '../styles'

export default function CodTexto(props) {
    const styles = useStyles();
    const[codigo, setCodigo] = useState("")

    return (
        <Box>  
            <Typography  component ="h8"variant="h8">
               <h1><input  value={codigo} name="textbox" type="text" placeholder="Only 4 numbers are allowed"/></h1>
            </Typography>

            <Box className={[styles.center, styles.space]}>  
                <Button onClick={() => setCodigo(codigo + '1')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    1
                </Button>
                <Button onClick={() => setCodigo(codigo + '2')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    2
                </Button>
                <Button onClick={() => setCodigo(codigo + '3')} disabled = {codigo.length  > 3}  style={{ marginRight: '.5rem' }}  variant="contained">
                    3
                </Button>
            </Box>
            <Box className={[styles.center, styles.space]}>  
                <Button onClick={() => setCodigo(codigo + '4')} disabled = {codigo.length  > 3}  style={{ marginRight: '.5rem' }}  variant="contained">
                    4
                </Button>
                <Button onClick={() => setCodigo(codigo + '5')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    5
                </Button>
                <Button onClick={() => setCodigo(codigo + '6')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    6
                </Button>
            </Box>
            <Box className={[styles.center, styles.space]}>  
                <Button onClick={() => setCodigo(codigo + '7')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    7
                </Button>
                <Button onClick={() => setCodigo(codigo + '8')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    8
                </Button>
                <Button onClick={() => setCodigo(codigo + '9')} disabled = {codigo.length  > 3} style={{ marginRight: '.5rem' }}  variant="contained">
                    9
                </Button>
            </Box>
            <Box className={[styles.center, styles.space]}>  
                <Button onClick={() => setCodigo('')} style={{ marginRight: '.5rem' }}  variant="contained">
                    C
                </Button>
                <Button onClick={() => setCodigo(codigo + '0')} disabled = {codigo.length  > 3}style={{ marginRight: '.5rem' }} variant="contained">
                    0
                </Button>
                <Button onClick={() => setCodigo(codigo.slice(0,-1))} style={{ marginRight: '.5rem' }}  variant="contained">
                   Apg
                </Button>
            </Box>
        </Box>
    )
}