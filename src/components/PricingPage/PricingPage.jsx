import { Container, Button, Grid, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function PricingPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const store = useSelector(store => store);
    const ratesToEdit = store.ratesToEdit;
    console.log(ratesToEdit);
    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES_TO_EDIT'
        })
        dispatch({
            type: 'UNSET_CONTRACT_TO_EDIT'
        });
    }, [])

    const handleChange = (event, i, property) => {
        console.log('event value and property changing is', event.target.value, property);
        ratesToEdit[i] = {...ratesToEdit[i], [property]: Number(event.target.value)};
        dispatch({
            type: 'UPDATE_RATES_TO_EDIT',
            payload: [...ratesToEdit]
        });
    }

    const updateRates = () => {
        console.log('updating permanent rates');
        dispatch({
            type: 'UPDATE_RATES',
            payload: ratesToEdit
        });
        history.push('/home');
    }

    return (
        <Container>
            <Grid container spacing={4} style={{textAlign: 'center'}}>
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
                                {ratesToEdit.length !== 0 &&
                                    <>
                                        {ratesToEdit.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{item.rateName}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isLessThanEight || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, i, "isLessThanEight")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isEightToTwelve || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, i, "isEightToTwelve")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isTwelveToTwenty || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, i, "isTwelveToTwenty")}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        value={item.isTwentyPlus || ''}
                                                        sx={{width: 80}}
                                                        onChange={(event) => handleChange(event, i, "isTwentyPlus")}
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
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={updateRates}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
        
    )
}