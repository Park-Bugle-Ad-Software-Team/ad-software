import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

export default function AdvertiserHomePage() {
    let advertiser = {
        name: 'Chroma Zone'
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h1">Advertiser Home Page</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2">{advertiser.name}</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Pending Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    {/* Pending Contracts component */} 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Active Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    {/* Active Contracts component */} 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">Closed Contracts</Typography>  
                </Grid>
                <Grid item xs={12}>
                    {/* Closed Contracts component */} 
                </Grid>
            </Grid>
        </>
    )
}

