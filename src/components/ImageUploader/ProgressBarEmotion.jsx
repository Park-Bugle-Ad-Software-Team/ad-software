/*import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react';
export default function ProgressBarEmotion({progress, setProgress}) {

const [image, setImage] = useState('') 
useEffect(() => {
    if (contractToEdit.image) 
    {
     setImage(contractToEdit.image)   
    }
}) 
const contractToEdit = useSelector(store => store.contractToEdit);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
      
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [image]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
*/