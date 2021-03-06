import * as React from 'react';
import { useEffect, useState } from "react";

// material-ui imports
import { FormControl, FormLabel, Box, Grid, TextField, Button, Container, Checkbox } from '@mui/material';

// react-redux imports
import { useDispatch, useSelector } from "react-redux";

// react-router imports
import { useHistory, useParams } from "react-router";

// import styling
import './AdCard.css';

// Import all our subcomponents
import AdSize from "./AdSize";
import ImageUploader from '../ImageUploader/ImageUploader';
import ActualSizes from "../SubComponents/SelectActualSizes";
import SelectAdvertiser from "../SubComponents/SelectAdvertiser";
import SelectAdRep from "../SubComponents/SelectAdRep";
import SelectDesigner from "../SubComponents/SelectDesigner";
import SelectStartMonth from "../SubComponents/SelectStartMonth";
import SelectContractLength from "../SubComponents/SelectContractLength";
import SelectAdType from "../SubComponents/SelectAdType";
import SelectColorType from "../SubComponents/SelectColorType";
import ContractNotes from "../SubComponents/ContractNotes";
import BillingCalculation from "../SubComponents/BillingCalculation";

export default function AdCard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const contractId = params.id;
    
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;
    const advertisers = store.advertisers;
    const adReps = store.adReps;
    const designers = store.designers;

    const [newImage, setNewImage] = useState(null)

    useEffect(() => {
        if (contractId === 'undefined') {
            return;
        } else if (contractId === undefined) {
            return;
        }
        console.log('contractId', contractId);
        dispatch({
            type: 'FETCH_CONTRACT_TO_EDIT',
            payload: contractId
        })
    }, [contractId])

    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES'
        });
        dispatch({
            type: 'FETCH_ADVERTISERS'
        });
        dispatch({
            type: 'FETCH_AD_REPS'
        });
        dispatch({
            type: 'FETCH_DESIGNERS'
        });
    }, [])

    // We break this up into separate use cases in order to handle special properties that aren't as simple as 
    // re-assigning a value
    const handleChange = (event, property) => {
        if (property === "colorId") {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: Number(event.target.value)
                }
            })
        } else if (property === 'isApproved') {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: event.target.checked
                }
            })
        } else if (property === "startMonth") {
            let newDate = new Date(`${event.target.value}-01`);

            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: newDate
                }
            });
        } else if (property === "advertiserId") {
            console.log('companyName', event.target.value);
            let advertiserId;
            for (let user of advertisers) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    advertiserId = user.id;
                    console.log('userId for advertiser', advertiserId)
                }
            }
            console.log('advertiser id', advertiserId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: advertiserId,
                    companyName: event.target.value
                }
            })
        } else if (property === "adRepId") {
            console.log('ad Rep name', event.target.value);
            let adRepId;
            for (let user of adReps) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    adRepId = user.id;
                }
            }
            console.log('adRepId id', adRepId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: adRepId,
                    adRepName: event.target.value
                }
            })
        } else if (property === "designerId") {
            console.log('designer name', event.target.value);
            let designerId;
            for (let user of designers) {
                if (Object.values(user).indexOf(event.target.value) > -1) {
                    designerId = user.id;
                }
            }
            console.log('designer id', designerId);
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: designerId,
                    designerName: event.target.value
                }
            })
        } else {
            dispatch({
                type: 'UPDATE_CONTRACT_TO_EDIT',
                payload: {
                    ...contractToEdit,
                    [property]: event.target.value
                }
            });
        }
    }

    const approveContract = () => {
        dispatch({
            type: 'UPDATE_CONTRACT_FOR_APPROVAL'
        })
    }

    const submitContract = () => {
        if (!contractToEdit.colorId || !contractToEdit.companyName || !contractToEdit.adSizeId) {
            alert('Please make sure the following fields are selected: Color Type, Company Name');
            return;
        } else {
            console.log('saving contract changes');
            contractToEdit.imageUrl = newImage
            if (contractToEdit.id === undefined) {
                // submit post new contract
                dispatch({
                    type: 'CREATE_NEW_CONTRACT',
                    payload: contractToEdit
                });
            } else {
                // put an existing contract
                dispatch({
                    type: 'UPDATE_CONTRACT',
                    payload: contractToEdit // update once we have a the user passed via a prop
                });
            }
            clearContractFields();
            history.push('/home');
        }
    }

    const clearContractFields = () => {
        dispatch({
            type: 'UNSET_CONTRACT_TO_EDIT'
        });
    }

    const returnToHome = () => {
        history.goBack();
    }

    const uploadComplete = (fileUrl) => {
        console.log('fileUrl upload complete', fileUrl);
        setNewImage(fileUrl)
    }

    return(
        <>
            <Container>
                <Button 
                    id="backBtn" 
                    variant="contained" 
                    color="primary" 
                    onClick={returnToHome}
                >
                    Back
                </Button>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <SelectAdvertiser 
                                contractId={contractId}
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <SelectAdRep
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <SelectDesigner
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <SelectStartMonth
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <SelectContractLength
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <SelectAdType
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <ActualSizes
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel>Image Upload (Drag and Drop)</FormLabel>
                                    <div className="imageUploaderDiv">
                                        <ImageUploader 
                                            uploadComplete={uploadComplete}
                                        />
                                    </div>
                                </FormControl>
                            </Grid>
                            <div className="spacer">
                            </div>
                            <Grid item xs={12}>
                                <FormLabel>Image Bank</FormLabel>
                                <div className="imageBank">
                                    {contractToEdit.image &&
                                        <>
                                            {contractToEdit.image.map((image, i) => (
                                                <>
                                                    {image.imageUrl !== '{}' ? 
                                                        <div key={i} className="imageDiv">
                                                            <a href={image.imageUrl} target="_blank">
                                                                <img src={image.imageUrl}/>
                                                            </a>
                                                        </div> :
                                                        null
                                                    }
                                                </>
                                            ))}
                                        </>
                                    }
                                    {newImage && (
                                        <div key="newImage" className="imageDiv">
                                            <a href={newImage} target="_blank">
                                                <img src={newImage}/>
                                            </a>
                                        </div>
                                    )}
                                </div>      
                            </Grid>
                            <div className="spacer">
                            </div>
                            <SelectColorType
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            <ContractNotes
                                handleChange={handleChange}
                            />
                            <div className="spacer">
                            </div>
                            {user.authLevel === "admin" &&
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel>Commission Percentage</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            type="number"
                                            sx={{width: '70px'}}
                                            value={contractToEdit.commissionPercentage || ''} 
                                            onChange={(event) => handleChange(event, "commissionPercentage")}
                                        />
                                    </FormControl>
                                </Grid>
                            }
                            <div className="spacer">
                            </div>
                            <BillingCalculation
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <AdSize />
                        </Grid>
                        <div className="spacer">
                        </div>
                        <Grid item xs={6}>
                            <div style={{textAlign: 'center'}}>
                                <Button variant="contained" color="primary" onClick={submitContract}>Save</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <FormLabel>Approve: </FormLabel>
                                <Checkbox
                                    checked={contractToEdit.isApproved || false}
                                    onChange={(event) => handleChange(event, "isApproved")}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </> 
    );
}