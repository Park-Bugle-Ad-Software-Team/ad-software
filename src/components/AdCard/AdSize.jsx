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

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function AdSize() {

    const adSizes = [1,2,3,4,5,6,7,8]
    return (
        <>
            <h1>Select Size</h1>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 0 }} columns={{ xs: 3, sm: 6, md: 16}}>
                {adSizes.map((size, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card className="adSizeCard" sx={{ minWidth: 10, maxWidth: 250 }}>
                        <CardActionArea>
                            <CardContent>
                                <div style={{textAlign: 'center'}}>
                                    <img src={fullSize} style={{width: '50%'}}/>
                                    <Typography sx={{ fontSize: 12, color: '#7E0001' }} color="text.secondary" gutterBottom>
                                        Full Page
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                        5 columns x 15.66"
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                        1-3 month rate = $1,870/month
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                        4-11 month rate = $1,560/month
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                        12 month rate = $1,400/month
                                    </Typography>
                                </div>     
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Box>
        </>
    )
}