import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const dropStyles = {
  width: "300px",
  height: "200px",
  
}




const Uploader = ({uploadComplete}) => {


    const [progress, setProgress] = useState(0);
    const [progressTitle, setProgressTitle] = useState('')

    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const dispatch = useDispatch();

    const handleFinishedUpload = info => {
      
      console.log(info);
      console.log('Access at', info.fileUrl);
      uploadComplete(info.fileUrl);
      if(contractToEdit.image) {
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_CONTRACT_TO_EDIT',
            payload: {
              ...contractToEdit,
              image: [
                ...contractToEdit.image,
                {
                  imageUrl: info.fileUrl,
                  contractId: contractToEdit.id
                },
              ] 
            }
          })
        }, 4000);
      }else {
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_CONTRACT_TO_EDIT',
            payload: {
              ...contractToEdit,
              image: [
                {
                  imageUrl: info.fileUrl,
                  contractId: contractToEdit.id
                },
              ] 
            }
          })
        }, 4000);
      }
    }

    const onProgress = () => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
    
    const uploadOptions = {
    server: 'http://localhost:5000'
    }
    const s3Url = 'https://snippetsbucket.s3.amazonaws.com';
    
    
    
    const innerElement = (
        <div
            style={{

                    paddingTop: '4em', 
                    paddingLeft: '1.5em', 
                    paddingRight: '1.5em'

                  }}
          
            >
            <Button variant="outlined" 
                    style={{

                      color: '#EBEBEB', 
                      paddingLeft: '3em', 
                      paddingRight: '3em', 
                      border: '1px dashed'

                      }}
                  >Click Here or Drag File to Upload</Button>
            </div>
    )
  return (
    <div style={{ paddingTop: '2em'}}>
      
    <ProgressBar progress={progress} progressTitle={progressTitle} />

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