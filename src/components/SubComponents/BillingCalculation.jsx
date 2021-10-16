import { FormLabel, Select, FormControl, MenuItem, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function BillingCalculation({ handleChange }) {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const allUsers = store.allUsers;
    const user = store.user;
    const adReps = store.adReps;
    const rates = store.rates;

    const grabRate = (size, row) => {
        if (size < 8) {
            return rates[row].isLessThanEight * size;
        } else if (size >= 8 && size < 12) {
            return rates[row].isEightToTwelve * grabSize();
        } else if (size >= 12 && size < 20) {
            return rates[row].isTwelveToTwenty * grabSize();
        } else {
            return rates[row].isTwentyPlus * grabSize();
        }
    }

    const calculateBill = () => {
        switch (contractToEdit.months) {
            case 1:
            case 2:
                return grabRate(grabSize(), 0) + addColorTypePrice();
            case 4:
                return grabRate(grabSize(), 1) + addColorTypePrice();
            case 12:
                return grabRate(grabSize(), 2) + addColorTypePrice();
            default:
                return 0;
        }
    }

    const addColorTypePrice = () => {
        let additionalCost = 0;
        if (contractToEdit.colorId) {
            switch (contractToEdit.colorId) {
                case 1:
                    return additionalCost;
                case 2:
                    return additionalCost += 100.00;
                case 3:
                    return additionalCost += 250.00;
                default:
                    return additionalCost;
            }
        } else {
            return additionalCost;
        }
    }

    const grabSize = () => {
        return contractToEdit.actualColumns * contractToEdit.actualInches;
    }

    return (
        <>
            <Grid item xs={12}>
                {contractToEdit.AdSize && contractToEdit.months && rates.length > 0 &&
                    <>
                        <FormLabel>Calculated Monthly Bill</FormLabel>
                        <Typography variant="h6"><strong>${calculateBill().toFixed(2)}</strong></Typography>
                    </>
                }
                <div className="spacer">
                </div>
                <FormControl>
                    {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                        <>
                            <FormLabel>
                                Final Adjusted Bill
                            </FormLabel>
                            <TextField
                                // label="Final Bill"
                                sx={{width: 100}}
                                variant="outlined"
                                value={contractToEdit.actualBill || ''}
                                onChange={(event) => handleChange(event, "actualBill")}
                            />
                        </>:
                        <>
                            <FormLabel>
                                Final Adjusted Bill
                            </FormLabel>
                            <Input
                                type="number"
                                disabled
                                value={contractToEdit.actualBill || ''}
                                onChange={(event) => handleChange(event, "actualBill")}
                            >
                            </Input>
                        </>
                    }   
                </FormControl> 
            </Grid>

        </>
    )
}