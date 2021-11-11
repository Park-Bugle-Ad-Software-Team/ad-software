import React, { useState } from 'react';
import { Button } from '@mui/material';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const dropStyles = {
  width: "300px",
  height: "200px",
  
}

const Uploader = ({uploadComplete}) => {


    const [progress, setProgress] = useState(0);
    const [progressTitle, setProgressTitle] = useState('');

    const [isLoading, setIsLoading] = useState(false);

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

    const onFileSelect = (evt) => {
      setIsLoading(true);

      // Grab file from <input type="file" /> element
      let file = evt.target.files[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      axios.post('/api/file', formData)
        .then((res) => {
          setIsLoading(false)
          uploadComplete(res.data.location)
        })
        .catch(err => {
          setIsLoading(false);
          alert('File upload failed. Try again later.')
          console.error(err);
        })
    }
    
    const uploadOptions = {
      server: 'http://localhost:5000',
    }
    //const s3Url = `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com`;
    const s3Url = `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.amazonaws.com`;
    
    
    
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

      {isLoading && <ProgressBar />}
      
      <input type="file" onChange={onFileSelect} />
    </div>
  );
}

export default Uploader;