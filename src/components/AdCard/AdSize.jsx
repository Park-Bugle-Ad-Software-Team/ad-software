import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './AdSize.css';

// importing images for display
import fullSize from './images/full-size.jpg';
import halfColumn from './images/half-page.PNG';
import halfHorizontal from './images/half-page-horizontal.PNG';
import quarterPage from './images/quarter-page.PNG';
import eigthPage from './images/eigth-page.PNG';
import column from './images/column.PNG';
import businessCard from './images/bus-card.PNG';
import feature from './images/feature.PNG';


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
    const displayImageSource = [
        fullSize,
        halfColumn,
        halfHorizontal,
        quarterPage,
        eigthPage,
        column,
        businessCard,
        feature,
    ];

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

    const handleChange = (index, property) => {
        dispatch({
            type: 'UPDATE_CONTRACT_TO_EDIT',
            payload: {
                ...contractToEdit,
                [property]: index + 1
            }
        })
    }
    
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

    const round = (num) => {
        return num;
    }


    const checkSize = (size) => {
        if ((size.columns * size.inches) >= 20) {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        1-3 month rate = ${round(rates[0].isTwentyPlus * (size.columns * size.inches)).toFixed(2)}/month
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        4-11 month rate = ${round(rates[1].isTwentyPlus * (size.columns * size.inches)).toFixed(2)}/month
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
        } else if ((size.columns * size.inches) < 8 && (size.columns * size.inches) >= 1) {
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
        } else {
            return (
                <>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        12 month rate = $275/month
                    </Typography> 
                </>
            )
        }
    }
    
    

    return (
        <>
            <h1>Select Size</h1>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 1, md: 22 }} columns={{ xs: 3, sm: 6, md: 16}}>
                    {adSizes.map((size, index) => (
                        <>
                            {size.id === contractToEdit.adSizeId ?
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <Card className="adSizeCardSelected" sx={{ minWidth: 220, maxWidth: 300}}>
                                        <CardActionArea onClick={() => handleChange(index, "adSizeId")}>
                                            <CardContent>
                                                <div style={{textAlign: 'center', border: 5}}>
                                                    <img src={displayImageSource[index]} style={{width: '100%'}}/>
                                                    <Typography sx={{ fontSize: 12, color: '#7E0001', fontWeight: 900 }} color="text.secondary" gutterBottom>
                                                        {size.adType}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                        {size.desc}
                                                    </Typography>
                                                    {rates.length !== 0 &&
                                                        checkSize(size)
                                                    }
                                                </div>     
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid> :
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <Card className="adSizeCard" sx={{ minWidth: 220, maxWidth: 300 }}>
                                        <CardActionArea onClick={() => handleChange(index, "adSizeId")}>
                                            <CardContent>
                                                <div style={{textAlign: 'center'}}>
                                                    <img src={displayImageSource[index]} style={{width: '100%'}}/>
                                                    <Typography sx={{ fontSize: 12, color: '#7E0001', fontWeight: 900 }} color="text.secondary" gutterBottom>
                                                        {size.adType}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                        {size.desc}
                                                    </Typography>
                                                    {rates.length !== 0 &&
                                                        checkSize(size)
                                                    }
                                                </div>     
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            } 
                        </>
                    ))}
                </Grid>
            </Box>
            
        </>
    )
}