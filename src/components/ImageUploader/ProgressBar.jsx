import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";
// import { black } from '@material-ui/core/colors';



const ProgressBar = ({ progress, progressTitle }) => {
    //const { root } = useStyles();

    return (
        <>
            
                {progress > 0 &&
                    <>
                        <Typography>
                            {progressTitle}
                        </Typography>
                        <div >
                            <LinearProgress variant="determinate" value={progress} color="primary" />
                        </div>
                    </>
                }
            
        </>
    )
}

export default ProgressBar
