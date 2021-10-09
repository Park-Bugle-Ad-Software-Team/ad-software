import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl, Paper, Box, Grid, Select, InputLabel, MenuItem, TextField,
    Card, CardActions, CardContent, Button
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
        dispatch({
            type: 'UPDATE_CONTRACT_TO_EDIT',
            payload: {
                ...contractToEdit,
                [property]: event.target.value
            }
        });
    }

    const submitContract = () => {
        console.log('submitting contract changes');
        // if (contractToEdit.id === undefined) {
        //     // submit post new contract
        //     dispatch({
        //         type: 'CREATE_NEW_CONTRACT',
        //         payload: contractToEdit
        //     });
        // } else {
        //     // put an existing user
        //     dispatch({
        //         type: 'UPDATE_CONTRACT',
        //         payload: contractToEdit // update once we have a the user passed via a prop
        //     });
        // }
        // clearContractFields();
        // history.push('/home');
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
                        {/* <FormControl fullWidth>
                            <InputLabel>Ad Type</InputLabel>
                            <Select
                                // value
                                label="Ad Type"
                                // onChange
                            >
                                <MenuItem>Print</MenuItem>
                                <MenuItem>Web</MenuItem>
                            </Select>
                        </FormControl> */}
                        <label>Ad Type</label>
                        <select onChange={(event) => handleChange(event, "contractType")}>
                            <option value="print">Print</option>
                            <option value="web">Web</option>
                        </select>
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
                                <label for="color">Color Type</label>
                                <select name="color" onChange={(event) => handleChange(event, "colorType")}> {/* will need to setup a new handlechange for this one as the "property" is going to be a json object. */}
                                    <option value="blackAndWhite">Black and White</option>
                                    <option value="spot">Spot</option>
                                    <option value="fullColor">Full Color</option>
                                </select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="p">
                                    Sponsorship
                                </Typography>
                                {/* switch for selecting yes or no. maybe just a checkbox or radial buttons */}
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
                </Grid>
            </Box>
        </> 
    );
}