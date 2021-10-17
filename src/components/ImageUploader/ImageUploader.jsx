import React, { useState } from 'react';
import { Button } from '@mui/material';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react';

const dropStyles = {
  width: "300px",
  border: "1px hover #d8d8d8",
  borderRadius: "3px",
  height: "150px",
   
}




const Uploader = ({uploadComplete}) => {

    //const contractToEdit = useSelector(store => store.contractToEdit);
    const [progress, setProgress] = useState(0);
    const [progressTitle, setProgressTitle] = useState('')

    const handleFinishedUpload = info => {
      
      console.log(info);
      console.log('Access at', info.fileUrl);
      uploadComplete(info.fileUrl);

  }


    const onProgress = (percent, event) => {
      setProgress(percent);
      setProgressTitle(event);
    }

    
    const uploadOptions = {
    server: 'http://localhost:5000'
    }
    const s3Url = 'https://snippetsbucket.s3.amazonaws.com';
    
    
    
    const innerElement = (
        <div
            style={{
                    fontSize: 10,
                    paddingTop: '1.5em', 
                    paddingLeft: '1.5em', 
                    paddingRight: '1.5em'


                  }}
          
            >
            <Button variant="outlined" 
                    style={{

                      color: 'maroon', 
                      paddingLeft: '3em', 
                      paddingRight: '3em', 
                      border: '1px dashed'

                      }}
                  >Click Here or Drag File to Upload</Button>
            </div>
    )
  return (
    <div style={{ paddingTop: '2em'}}>
    {/*{contractToEdit.image &&  */}
    <ProgressBar progress={progress} /*setProgress={setProgress}*/ progressTitle={progressTitle} />
     
    <DropzoneS3Uploader

      onError={(error) => console.log('upload failed', error)}
      onProgress={onProgress}
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      style={dropStyles}
      maxSize={1024 * 1024 * 100}
      upload={uploadOptions}
      accept="image/*"
      children={innerElement} 
      
    />
    </div>
  );
}

export default Uploader;