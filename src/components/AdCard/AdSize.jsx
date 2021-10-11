import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import fullSize from './images/full-size.jpg';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function AdSize() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const adSizes = store.adSize;
    const rates = store.rates;
    const contractToEdit = store.contractToEdit;
    const [rateRow, setRateRow] = useState({});

    useEffect(() => {
        dispatch({
            type: 'FETCH_AD_SIZES'
        })
    }, []);

    // useEffect(() => {
    //     for (const rate of rates) {
    //         if (contractToEdit.pricingSchemaId === rate.id){
    //             console.log('matching rate row is ', rate);
    //         }
            
    //     }
    // }, [rates])
    
    let currentLength = 0;


    useEffect(() => {
        currentLength = contractToEdit.months; // should be 1
        console.log('currentLength', currentLength);
        for (let rate of rates) {
            if (currentLength <= rate.maxDuration && currentLength >= rate.minDuration) {
                setRateRow(rate);
            }
        }
        
    }, [contractToEdit, rates, adSizes])

    // const getRate = () => {
    //     for (let rate of rates) {
    //         if (currentLength <= rate.maxDuration && currentLength >= rate.minDuration) {
    //             rateRow = rate;
    //         }
    //     }
    //     return rateRow;
    // }

    const checkSize = (size) => {
        if ((size.columns * size.inches) >= 20) {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        1-3 month rate = ${rates[0].isTwentyPlus * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        4-11 month rate = ${rates[1].isTwentyPlus * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        12 month rate = ${rates[2].isTwentyPlus * (size.columns * size.inches)}/month
                    </Typography> 
                </>
            )
        } else if ((size.columns * size.inches) < 20 && (size.columns * size.inches) >= 12) {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        1-3 month rate = ${rates[0].isTwelveToTwenty * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        4-11 month rate = ${rates[1].isTwelveToTwenty * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        12 month rate = ${rates[2].isTwelveToTwenty * (size.columns * size.inches)}/month
                    </Typography> 
                </>
            )
        } else if ((size.columns * size.inches) < 12 && (size.columns * size.inches) >= 8) {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        1-3 month rate = ${rates[0].isEightToTwelve * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        4-11 month rate = ${rates[1].isEightToTwelve * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        12 month rate = ${rates[2].isEightToTwelve * (size.columns * size.inches)}/month
                    </Typography> 
                </>
            )
        } else {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        1-3 month rate = ${rates[0].isLessThanEight * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        4-11 month rate = ${rates[1].isLessThanEight * (size.columns * size.inches)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        12 month rate = ${rates[2].isLessThanEight * (size.columns * size.inches)}/month
                    </Typography> 
                </>
            )
        } 
    }
    

    return (
        <>
            <h1>Select Size</h1>
            {(rates !== null && adSizes !== null) &&
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 1, md: 0 }} columns={{ xs: 3, sm: 6, md: 16}}>
                    {adSizes.map((size, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card className="adSizeCard" sx={{ minWidth: 10, maxWidth: 210 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <div style={{textAlign: 'center'}}>
                                            <img src={fullSize} style={{width: '50%'}}/>
                                            <Typography sx={{ fontSize: 12, color: '#7E0001' }} color="text.secondary" gutterBottom>
                                                {size.adType}
                                            </Typography>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                {size.desc}
                                            </Typography>
                                            {checkSize(size)}
                                        </div>     
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            }
        </>
    )
}