import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl, Paper, Box, Grid, Select, InputLabel, MenuItem, TextField,
    Card, CardActions, CardContent, Button
} from '@mui/material';
import AdSize from "./AdSize";

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

export default function AdCard() {
    // testing data
    let advertiser = {name: 'Chroma Zone'};

    return(
        <>
            {/* 
                select month/year combo
                select advertiser
                select length of contract
                select ad type: print or web
                // conditionally render based on type of ad:
                    // WebView.jsx
                    // PrintView.jsx
                save button
                approve button
            */}
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
                        <select>
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
                                {/* <Typography variant="p">
                                    Color Type
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel>Select</InputLabel>
                                    <Select
                                        // value
                                        label="Color Type"
                                        // onChange
                                    >
                                        <MenuItem>Black and White</MenuItem>
                                        <MenuItem>Spot</MenuItem>
                                        <MenuItem>Full Color</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <label for="color">Color Type</label>
                                <select name="color">
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