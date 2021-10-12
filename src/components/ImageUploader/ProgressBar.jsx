import React from 'react';
// import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";
// import { black } from '@material-ui/core/colors';
import { createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

// const useStyles = makeStyles({
//     root: {
//         width: '100%',
//         marginBottom: '2em'
//     },
// });

const theme = createTheme({
    palette: {
        primary: {
            //dark grey
            main: "#3D3D3D",
        },
          secondary: {
            //lighter grey
            main: '#858585',
          },
    },
});

const ProgressBar = ({ progress, progressTitle }) => {
    // const { root } = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                {progress > 0 &&
                    <>
                        <Typography>
                            {progressTitle}
                        </Typography>
                        <div>
                            <LinearProgress variant="determinate" value={progress} color="primary" />
                        </div>
                    </>
                }
            </ThemeProvider>
        </>
    )
}

export default ProgressBar
