import PrintView from "./PrintView";
import WebView from "./WebView";
import { Typography, FormControl } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
                        <Typography variant="h2">{advertiser.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={3}>
                        {/* start month picker */}
                    </Grid>
                    <Grid item xs={3}>
                        {/* start year picker */}
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Ad Type</InputLabel>
                            <Select
                                // value
                                label="Ad Type"
                                // onChange
                            >
                                <MenuItem>Print</MenuItem>
                                <MenuItem>Web</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Length of Contract</InputLabel>
                            <Select
                                // value
                                label="Ad Type"
                                // onChange
                            >
                                <MenuItem>1 month</MenuItem>
                                <MenuItem>2 months</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="p">
                                    Image Upload
                                </Typography>
                                {/* drag and drop zone for uploading images */}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="p">
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
                                </FormControl>
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
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            {/* new component for ad size selector */}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </> 
    );
}