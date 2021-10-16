import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl, FormLabel, FormControlLabel, Paper, Box, Grid, Select, InputLabel, MenuItem, TextField,
    Card, CardActions, CardContent, Button, Radio, RadioGroup, Container, Input
} from '@mui/material';
import AdSize from "./AdSize";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ImageUploader from '../ImageUploader/ImageUploader';
import './AdCard.css';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ActualSizes from "../SubComponents/ActualSizes";
import SelectAdvertiser from "../SubComponents/SelectAdvertiser";
import SelectAdRep from "../SubComponents/SelectAdRep";
import SelectDesigner from "../SubComponents/SelectDesigner";
import SelectStartMonth from "../SubComponents/SelectStartMonth";
import SelectContractLength from "../SubComponents/SelectContractLength";

export default function AdCard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const contractId = params.id;
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;
    const advertisers = store.advertisers;
    const rates = store.rates;
    const allUsers = store.allUsers;
    const adReps = store.adReps;
    const designers = store.designers;
    const adSize = contractToEdit.AdSize;
    const color = contractToEdit.Color;
    const minDate = new Date('2021-01-01T00:00:00.000');
    const maxDate = new Date('2034-01-01T00:00:00.000');

    const [newImage, setNewImage] = useState({})

    useEffect(() => {
        if (contractId === 'undefined') {
            return;
        } else if (contractId === undefined) {
            return;
        }
        console.log('contractId', contractId);
        dispatch({
            type: 'FETCH_CONTRACT_TO_EDIT',
            payload: contractId
        })
    }, [contractId])

    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES'
        });
        dispatch({
            type: 'FETCH_ADVERTISERS'
        })
    }, [])

    const handleChange = (event, property) => {
        if (property === "colorId") {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: Number(event.target.value)
                }
            })
        } else if (property === 'isApproved') {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: event.target.checked
                }
            })
        } else if (property === "startMonth") {
            let newDate = new Date(`${event.target.value}-01`);

            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: newDate
                }
            });
        } else if (property === "advertiserId") {
            console.log('companyName', event.target.value);
            let advertiserId;
            for (let user of advertisers) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    advertiserId = user.id;
                    console.log('userId for advertiser', advertiserId)
                }
            }
            console.log('advertiser id', advertiserId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: advertiserId,
                    companyName: event.target.value
                }
            })
        } else if (property === "adRepId") {
            console.log('ad Rep name', event.target.value);
            let adRepId;
            for (let user of adReps) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    adRepId = user.id;
                }
            }
            console.log('adRepId id', adRepId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: adRepId,
                    adRepName: event.target.value
                }
            })
        } else if (property === "designerId") {
            console.log('designer name', event.target.value);
            let designerId;
            for (let user of designers) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    designerId = user.id;
                }
            }
            console.log('designer id', designerId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: designerId,
                    designerName: event.target.value
                }
            })
        }
        
        else {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: event.target.value
                }
            });
        }
    }

    const approveContract = () => {
        dispatch({
            type: 'UPDATE_CONTRACT_FOR_APPROVAL'
        })
    };

    const submitContract = () => {
        console.log('saving contract changes');
        contractToEdit.imageUrl = newImage
        if (contractToEdit.id === undefined) {
            // submit post new contract
            dispatch({
                type: 'CREATE_NEW_CONTRACT',
                payload: contractToEdit
            });
        } else {
            // put an existing contract
            dispatch({
                type: 'UPDATE_CONTRACT',
                payload: contractToEdit // update once we have a the user passed via a prop
            });
        }
        clearContractFields();
        history.push('/home');
    }


    const clearContractFields = () => {
        dispatch({
            type: 'UNSET_CONTRACT_TO_EDIT'
        });
    };

    const returnToHome = () => {
        history.goBack();
    }

    

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
                throw new Error(`contractToEdit months has no value ${contractToEdit.months}`);
        }
    }

    const addColorTypePrice = () => {
        let additionalCost = 0;
        switch (contractToEdit.colorId) {
            case 1:
                return additionalCost;
            case 2:
                return additionalCost += 100.00;
            case 3:
                return additionalCost += 250.00;
            default:
                throw new Error(`contractToEdit colorId has no value ${contractToEdit.colorId}`);
        }
    }

    const grabSize = () => {
        return contractToEdit.actualColumns * contractToEdit.actualInches;
    }

    const uploadComplete = (fileUrl) => {
        console.log('fileUrl upload complete', fileUrl);
        setNewImage(fileUrl)
    }

    return(
        <>
                <Container>
                <Button 
                id="backBtn" 
                variant="contained" 
                color="primary" 
                onClick={returnToHome}
            >
                Back
            </Button>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <SelectAdvertiser 
                                    contractId={contractId}
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                <SelectAdRep
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                <SelectDesigner
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                <SelectStartMonth
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                <SelectContractLength
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel>Ad Type</FormLabel>
                                            <Select
                                                value={contractToEdit.contractType || ''}
                                                onChange={(event) => handleChange(event, "contractType")}
                                            >
                                                <MenuItem value="Print">Print</MenuItem>
                                                <MenuItem value="Web">Web</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {contractToEdit.contractType === "Print" &&
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Page Number</FormLabel>
                                                <TextField
                                                    variant="outlined"
                                                    type="number"
                                                    sx={{width: '70px'}}
                                                    value={contractToEdit.page || ''}
                                                    onChange={(event) => handleChange(event, "page")}
                                                />
                                            </FormControl>
                                        }
                                    </Grid> :
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel>Ad Type</FormLabel>
                                            <Select
                                                disabled
                                                value={contractToEdit.contractType || ''}
                                                onChange={(event) => handleChange(event, "contractType")}
                                            >
                                                <MenuItem value="Print">Print</MenuItem>
                                                <MenuItem value="Web">Web</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {contractToEdit.contractType === "Print" &&
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Page Number</FormLabel>
                                                <TextField
                                                    disabled
                                                    variant="outlined"
                                                    type="number"
                                                    sx={{width: '70px'}}
                                                    value={contractToEdit.page || ''}
                                                    onChange={(event) => handleChange(event, "page")}
                                                />
                                            </FormControl>
                                        }
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                <ActualSizes
                                    handleChange={handleChange}
                                />
                                <div className="spacer">
                                </div>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel>Image Upload (Drag and Drop)</FormLabel>
                                        <div className="imageUploaderDiv">
                                            <ImageUploader 
                                                uploadComplete={uploadComplete}
                                            />
                                        </div>
                                    </FormControl>
                                </Grid>
                                <div className="spacer">
                                </div>
                                <Grid item xs={12}>
                                    <FormLabel>Image Bank</FormLabel>
                                    <div className="imageBank">
                                        {contractToEdit.image &&
                                            <>
                                                {contractToEdit.image.map((image, i) => (
                                                    <>
                                                        {image.imageUrl !== '{}' ? 
                                                            <div key={i} className="imageDiv">
                                                                <a href={image.imageUrl} target="_blank">
                                                                    <img src={image.imageUrl}/>
                                                                </a>
                                                            </div> :
                                                            null
                                                        }
                                                    </>
                                                ))}
                                            </>
                                        }
                                    </div>      
                                </Grid>
                                <div className="spacer">
                                </div>
                                {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Color Type</FormLabel>
                                            <Select
                                                value={contractToEdit.colorId || ''}
                                                onChange={(event) => handleChange(event, "colorId")}
                                            >
                                                <MenuItem value={1}>Black and White</MenuItem>
                                                <MenuItem value={2}>Spot</MenuItem>
                                                <MenuItem value={3}>Full Color</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> :
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Color Type</FormLabel>
                                            <Select
                                                disabled
                                                value={contractToEdit.colorId || ''}
                                                onChange={(event) => handleChange(event, "colorId")}
                                            >
                                                <MenuItem value={1}>Black and White</MenuItem>
                                                <MenuItem value={2}>Spot</MenuItem>
                                                <MenuItem value={3}>Full Color</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Notes</FormLabel>
                                            <TextField
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                sx={{width: 300}}
                                                value={contractToEdit.notes || ''}
                                                onChange={(event) => handleChange(event, "notes")}
                                            />
                                        </FormControl>
                                    </Grid> :
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Notes</FormLabel>
                                            <TextField
                                                multiline
                                                disabled
                                                rows={6}
                                                variant="outlined"
                                                sx={{width: 300}}
                                                value={contractToEdit.notes || ''}
                                                onChange={(event) => handleChange(event, "notes")}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                {user.authLevel === "admin" || user.authLevel === "ad rep" &&
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Commission Percentage</FormLabel>
                                            <TextField
                                                variant="outlined"
                                                type="number"
                                                sx={{width: '70px'}}
                                                value={contractToEdit.commissionPercentage || ''} 
                                                onChange={(event) => handleChange(event, "commissionPercentage")}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                <Grid item xs={12}>
                                    {/* {contractToEdit.AdSize && contractToEdit.months && rates.length > 0 &&
                                        <>
                                            <FormLabel>Commission Percentage</FormLabel>
                                            <Typography>${calculateBill().toFixed(2)}</Typography>
                                        </>
                                    }
                                    <div className="spacer">
                                    </div> */}
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
                            </Grid>
                            <div className="spacer">
                            </div>
                            {/* sectioning out a new container for the ad size selection since it will be quite large*/}
                            <Grid item xs={8}>
                                <AdSize />
                            </Grid>
                            <div className="spacer">
                            </div>
                            <Grid item xs={6}>
                                <div style={{textAlign: 'center'}}>
                                    <Button variant="contained" color="primary" onClick={submitContract}>Save</Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormLabel>Approve: </FormLabel>
                                    <Checkbox
                                        checked={contractToEdit.isApproved}
                                        onChange={(event) => handleChange(event, "isApproved")}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
        
        </> 
    );
}