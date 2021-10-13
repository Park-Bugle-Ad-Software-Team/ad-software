import { Container, Grid, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



export default function PricingPage() {
    const dispatch = useDispatch();

    const store = useSelector(store => store);
    const rates = store.ratesToEdit;

    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES_TO_EDIT'
        })
    }, [])

    const handleChange = (event, property) => {
        console.log('event value and property changing is', event, property);
    }

    return (
        <Container>
            <Grid container style={{textAlign: 'center'}}>
                <Grid item xs={12}>
                    <h1>Edit Default Rates</h1>
                </Grid> 
                <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Contract Length</TableCell>
                                    <TableCell>less than 8"</TableCell>
                                    <TableCell>8" to 11.5"</TableCell>
                                    <TableCell>12" to 19.5"</TableCell>
                                    <TableCell>20" +</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rates.length !== 0 &&
                                    <>
                                        {rates.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{item.rateName}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isLessThanEight || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, "isLessThanEight")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isEightToTwelve || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, "isEightToTwelve")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isTwelveToTwenty || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, "isTwelveToTwenty")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isTwentyPlus || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, "isTwentyPlus")}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
        
    )
}