import React from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';
import Typography from "@mui/material/Typography";
// import { black } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            //dark grey
            main: "#3D3D3D",
        },
          secondary: {
            //lighter grey
            main: '#b2b3b7',
          },
    },
});

const ProgressBar = ({ progress, progressTitle }) => {
    //const { root } = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                {progress > 0 &&
                    <>
                        <Typography>
                            {progressTitle}
                        </Typography>
                        <div >
                            <CircularProgress variant="determinate" value={progress} color="primary" />
                        </div>
                    </>
                }
            </ThemeProvider>
        </>
    )
}

export default ProgressBar
