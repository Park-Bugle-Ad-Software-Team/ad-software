import { Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function EmployeeHomePage() {
    // test data 
    let sonia = {
        firstName: 'Sonia',
        lastName: 'Becerra'
    };

    let advertisers = [
        {
            name: 'Chroma Zone'
        },
        {
            name: 'Ace Hardware'
        },
        {
            name: 'Park Bugle'
        }
    ];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let years = [2020, 2021, 2022, 2023];


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h1">Admin Home Page</Typography>  
                </Grid>
                <Grid item xs={8}>
                    User: {sonia.firstName} {sonia.lastName}
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        // onClick
                    >
                        Export
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        // onClick
                    >
                        Create New Ad Contract
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="advertiser-select-label">Advertiser</InputLabel>
                        <Select
                            labelId="advertiser-select-label"
                            id="advertiser-select"
                            label="Advertiser"
                            // onChange
                        >
                            {advertisers.map(advertiser => (
                                <MenuItem value={advertiser.name}>{advertiser.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select
                            labelId="month-select-label"
                            id="month-select"
                            label="Month"
                            // onChange
                        >
                            {months.map(month => (
                                <MenuItem value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            label="Year"
                            // onChange
                        >
                            {years.map(year => (
                                <MenuItem value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {/* component for listing out pending contracts */}
                </Grid>
                <Grid item xs={12}>
                    {/* component for listing out approved contracts */}
                </Grid>
            </Grid>
        </>
    )
}

