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
import { MonthPicker, YearPicker } from "@mui/lab";
import ActualSizes from "../SubComponents/ActualSizes";
import SelectAdvertiser from "../SubComponents/SelectAdvertiser";

export default function AdCard() {
    // testing data
    let advertiser = {name: 'Chroma Zone'};

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const contractId = params.id;
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;
    const advertisers = store.advertisers;
    const rates = store.rates;
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
        } else if (property === "startMonth") {
            // this only works sometimes. will need some help to figure it out properly
            let newDate = new Date(event.target.value);
            newDate.setMonth(newDate.getMonth() + 1);

            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: newDate
                }
            });
        } else {
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

    // this formats our month and year from contractToEdit.startMonth for use in the month picker component
    let startDate = new Date(contractToEdit.startMonth);
    let yyyy = startDate.getFullYear();
    let mm = String(startDate.getMonth() + 1).padStart(2, '0');
    console.log('test', (yyyy + '-' + mm));

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
                return grabRate(grabSize(), 0);
            case 4:
                return grabRate(grabSize(), 1);
            case 12:
                return grabRate(grabSize(), 2);
            default:
                throw new Error(`contractToEdit months has no value ${contractToEdit.months}`);
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <SelectAdvertiser 
                                    contractId={contractId}
                                />
                                <div className="spacer">
                                </div>
                                {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel id="startMonthLabel">Start Month:</FormLabel>
                                            <Input
                                                label="Start Month"
                                                labelId="startMonthLabel"
                                                type="month"
                                                min="2021-09"
                                                value={(yyyy + '-' + mm)}
                                                onChange={(event) => handleChange(event, "startMonth")}
                                            />
                                        </FormControl>
                                    </Grid> :
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormControlLabel id="startMonthLabel">Start Month:</FormControlLabel>
                                            <Input
                                                label="Start Month"
                                                labelId="startMonthLabel"
                                                type="month"
                                                disabled
                                                min="2021-09"
                                                value={(yyyy + '-' + mm)}
                                                onChange={(event) => handleChange(event, "startMonth")}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                {user.authLevel === ("admin" || "ad rep") ?
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Contract Length</FormLabel>
                                            <Select
                                                value={contractToEdit.months || ''}
                                                onChange={(event) => handleChange(event, "months")}
                                            >
                                                <MenuItem value={1}>1 Month</MenuItem>
                                                <MenuItem value={2}>2 Months</MenuItem>
                                                <MenuItem value={4}>4 Months</MenuItem>
                                                <MenuItem value={12}>12 Months</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> :
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Contract Length</FormLabel>
                                            <Select
                                                value={contractToEdit.months || ''}
                                                onChange={(event) => handleChange(event, "months")}
                                                disabled
                                            >
                                                <MenuItem value={1}>1 Month</MenuItem>
                                                <MenuItem value={2}>2 Months</MenuItem>
                                                <MenuItem value={4}>4 Months</MenuItem>
                                                <MenuItem value={12}>12 Months</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                }
                                <div className="spacer">
                                </div>
                                {user.authLevel === ("admin" || "ad rep") ?
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
                                        <FormLabel>Image Upload</FormLabel>
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
                                                            <div className="imageDiv">
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
                                {user.authLevel === ("admin" || "ad rep") ?
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
                                {user.authLevel === ("admin" || "ad rep") ?
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
                                {user.authLevel === ("admin" || "ad rep") &&
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
                                            <Typography>${calculateBill().toFixed(2)}</Typography>
                                        </>
                                    }
                                    <div className="spacer">
                                    </div>
                                    <FormControl>
                                        {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                                            <>
                                                <FormLabel>
                                                    Final Bill
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
                                                <FormLabel sx={{fontWeight: 1000}}>
                                                    Final Bill
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
                                <div style={{textAlign: 'center'}}>
                                    <Button variant="contained" color="primary" onClick={approveContract}>Approve</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
        
        </> 
    );
}