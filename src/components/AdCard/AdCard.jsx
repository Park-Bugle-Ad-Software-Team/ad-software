import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl, FormLabel, FormControlLabel, Paper, Box, Grid, Select, InputLabel, MenuItem, TextField,
    Card, CardActions, CardContent, Button, Radio, RadioGroup
} from '@mui/material';
import AdSize from "./AdSize";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdCard() {
    // testing data
    let advertiser = {name: 'Chroma Zone'};

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const contractId = params.id;
    const contractToEdit = useSelector(store => store.contractToEdit);
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

    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="h4">{advertiser.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={3}>
                        <label for="start">Start month:</label>
                        <input type="month" id="start" name="start"
                            min="2021-09" value="2021-09" />
                    </Grid>
                    <Grid item xs={3}>
                        <label for="length">Contract Length</label>
                        <select name="length">
                            <option value={1}>1 Month</option>
                            <option value={2}>2 Months</option>
                            <option value={4}>4 Months</option>
                            <option value={8}>8 Months</option>
                            <option value={12}>12 Months</option>
                        </select>
                    </Grid>

                    {/* row */}

                    <Grid item xs={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Ad Type</FormLabel>
                            <RadioGroup
                                aria-label="colorType"
                                value={contractToEdit.contractType}
                                onChange={(event) => handleChange(event, "contractType")}
                                name="contract-type-radio-button-group"
                            >
                                <FormControlLabel value="Print" control={<Radio />} label="Print" />
                                <FormControlLabel value="Web" control={<Radio />} label="Web" />
                            </RadioGroup>
                        </FormControl>
                        {/* <Select
                            value={contractToEdit.contractType}
                            onChange={(event) => handleChange(event, "contractType")}
                        >
                            <MenuItem value={"Print"}>Print</MenuItem>
                            <MenuItem value={"Web"}>Web</MenuItem>
                        </Select> */}
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
                                {/* drag and drop zone for uploading images */}
                            </Grid>
                            <Grid item xs={12}>
                                {/* <label for="color">Color Type</label>
                                <select name="color" onChange={(event) => handleChange(event, "colorId")}> 
                                    <option value={contractToEdit.Color.id}>{contractToEdit.Color.colorType}</option>
                                    <option value={1}>Black and White</option>
                                    <option value={2}>Spot</option>
                                    <option value={3}>Full Color</option>
                                </select> */}
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Color Type</FormLabel>
                                    <RadioGroup
                                        aria-label="colorType"
                                        value={contractToEdit.colorId}
                                        onChange={(event) => handleChange(event, "colorId")}
                                        name="color-radio-button-group"
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="Black and White" />
                                        <FormControlLabel value={2} control={<Radio />} label="Spot" />
                                        <FormControlLabel value={3} control={<Radio />} label="Full Color" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="p">
                                    Notes
                                </Typography>
                                <TextField
                                    label="Notes"
                                    multiline
                                    rows={6}
                                    variant="filled"
                                />
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
        </> 
    );
}