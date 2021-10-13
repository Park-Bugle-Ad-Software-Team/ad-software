import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl, FormLabel, FormControlLabel, Paper, Box, Grid, Select, InputLabel, MenuItem, TextField,
    Card, CardActions, CardContent, Button, Radio, RadioGroup, Container
} from '@mui/material';
import AdSize from "./AdSize";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ImageUploader from '../ImageUploader/ImageUploader';

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
    const adSize = contractToEdit.AdSize;
    const color = contractToEdit.Color;

    useEffect(() => {
        if (contractId === 'undefined') {
            return;
        }
        console.log(params.id);
        dispatch({
            type: 'FETCH_CONTRACT_TO_EDIT',
            payload: contractId
        })
    }, [contractId])

    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES'
        });
    }, [])

    const handleChange = (event, property) => {
        console.log('property we are updating is', property);
        console.log('value we are updating to is', event.target.value);
        if (property === "colorId") {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: Number(event.target.value)
                }
            })
        } else if (property === "startMonth") {
            console.log('value is ', (event.target.value));
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

    const submitContract = () => {
        console.log('saving contract changes');
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

        
    
    

    const [newImage, setNewImage] = useState({})

    const uploadComplete = (fileUrl) => {
        console.log('fileUrl upload complete', fileUrl);
          setNewImage({src: fileUrl})
      }

    return(
        <>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {contractId !== 'undefined' ?
                            <Grid item xs={4}>
                                <Typography variant="h4">{advertiser.name}</Typography>
                            </Grid> :
                            <Grid item xs={4}>
                                <Typography variant="h4">Select Advertiser</Typography>
                                <Select
                                    value={''}
                                    onChange={(event) => handleChange(event, "userId")}
                                >
                                    {/* map through advertisers */}
                                    {advertisers.map((advertiser,i) => (
                                        <MenuItem key={i} value={advertiser.id}>{advertiser.companyName}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        }
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Start Month:</FormLabel>
                            <input type="month" id="start" name="start"
                                min="2021-09" value={yyyy + '-' + mm} onChange={(event) => handleChange(event, "startMonth")}/>
                        </Grid>
                        <Grid item xs={3}>
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
                        </Grid>

                        {/* row */}

                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>

                        {/* row */}

                        <Grid item xs={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="p">
                                        Image Upload
                                    </Typography>
                                    <ImageUploader 
                                        uploadComplete={uploadComplete}
                                    />
                                </Grid>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel>Notes</FormLabel>
                                        <TextField
                                            multiline
                                            rows={6}
                                            variant="filled"
                                            value={contractToEdit.notes || ''}
                                            onChange={(event) => handleChange(event, "notes")}
                                        />
                                    </FormControl>
                                </Grid>
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
                                <Grid item xs={12}>
                                    <Typography>Calculated Bill</Typography>
                                    <Typography>${contractToEdit.calculatedBill}.00</Typography>
                                    <Typography>Final Bill</Typography>
                                    <Typography>${contractToEdit.actualBill}.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* sectioning out a new container for the ad size selection since it will be quite large*/}
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <AdSize />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={submitContract}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </> 
    );
}