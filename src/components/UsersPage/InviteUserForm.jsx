/*
This component is going to be used for rendering both the user creation and user edit features
*/

import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel,
                Switch, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function InviteUserForm() {
    const dispatch = useDispatch()
    // const [isInviteOpen, setIsInviteOpen] = useState(false);
    // const [isAchSwitchChecked, setIsAchSwitchChecked] = useState(true);
    // const [isDoNotDisturbChecked, setIsDoNotDisturbChecked] = useState(true);
    
    const params = useParams();
    const userId = params.id;

    // test data - all fields will normally be blank or false on new user creation
    const [newUser, setNewUser] = useState({name: ''});
    const userToEdit = useSelector(store => store.userToEdit);

    console.log('user to edit', userToEdit);

    useEffect(() => {
        if (userId === undefined) {
            return;
        }

        dispatch({
            type: 'FETCH_USER_TO_EDIT',
            payload: userId
        });
    }, [userId]);

    // const checkUser = () => {
    //     if (user) {
    //         setNewUser(user);
    //     } else {
    //         // this is test data - should be set to empty strings for demoing
    //         setNewUser({
    //             name: 'Garrett',
    //             email: 'gharty@live.com',
    //             authLevel: 'advertiser',
    //             contactPreference: '',
    //             acceptAchPayment: isAchSwitchChecked,
    //             companyName: '',
    //             doNotDisturb: isDoNotDisturbChecked,
    //             advertiserUrl: '',
    //             address: '',
    //             primaryName: '',
    //             primaryTitle: '',
    //             primaryEmail: '',
    //             primaryDirectPhone: '',
    //             primaryMobilePhone: '',
    //             secondaryName: '',
    //             secondaryTitle: '',
    //             secondaryEmail: '',
    //             secondaryDirectPhone: '',
    //             secondaryMobilePhone: '',
    //             notes: '',
    //         });
    //     }
    // }
    

    const openInvite = () => {
        setIsInviteOpen(true);
    }

    const submitNewUser = () => {
        console.log('submitting new user', newUser);
        dispatch({
            type: 'CREATE_NEW_USER',
            payload: newUser
        });
    }

    const updateUser = () => {
        console.log(`submitting changes to user someone`, newUser); // update test to format in the user we are editing
        dispatch({
            type: 'UPDATE_USER',
            payload: newUser // update once we have a the user passed via a prop
        });
    }

    // const flipAchSwitch = (event) => {
    //     setIsAchSwitchChecked(!event.target.isAchSwitchChecked)
    // }

    // const flipDoNotDisturbSwitch = (event) => {
    //     setIsDoNotDisturbChecked(!event.target.setIsDoNotDisturbChecked);
    // }

    return (
        <>
        <h2>
            {userId === undefined ?
                "Create User" :
                "Edit User"
            }
        </h2>
        <FormControl>
            <TextField 
                id="name-input"
                label="Name" 
                variant="outlined" 
                value={newUser.name}
                onChange={(event) => setNewUser({...newUser, name: event.target.value})}
            />
            <TextField 
                id="email-input"
                label="Email" 
                variant="outlined" 
                value={userToEdit.email}
                onChange={(event) => setNewUser({...newUser, email: event.target.value})}
            />
            <FormControl>
                <InputLabel id="authLevel-select-label">Auth Level</InputLabel>
                <Select
                    labelId="authLevel-select-label"
                    id="authLevel-select"
                    defaultValue=''
                    onChange={(event) => setNewUser({...newUser, authLevel: event.target.value})}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="ad rep">Ad Rep</MenuItem>
                    <MenuItem value="advertiser">Advertiser</MenuItem>
                    <MenuItem value="web designer">Web Designer</MenuItem>
                    <MenuItem value="print ad designer">Print Ad Designer</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                </Select>
            </FormControl>
            {userToEdit.authLevel === "advertiser" &&
                <>
                    <h1>Advertiser Info Field</h1>
                    <Grid container width="800px">
                        {/* <Grid item xs={6}>
                            <Typography variant="p">Accepts ACH Payments</Typography>
                            <Switch checked={isAchSwitchChecked} onChange={flipAchSwitch} inputProps={{ 'aria-label': 'controlled' }}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="p">Do Not Disturb</Typography>
                            <Switch checked={isDoNotDisturbChecked} onChange={flipDoNotDisturbSwitch} inputProps={{ 'aria-label': 'controlled' }}/>
                        </Grid> */}
                        <Grid item xs={6}>
                            <TextField
                                label="Contact Preference"
                                variant="filled"
                                value={userToEdit.contactPreference}
                                onChange={(event) => setNewUser({...newUser, contactPreference: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Company Name"
                                variant="filled"
                                value={userToEdit.companyName}
                                onChange={(event) => setNewUser({...newUser, companyName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Advertiser URL"
                                variant="filled"
                                value={userToEdit.advertiserUrl}
                                onChange={(event) => setNewUser({...newUser, advertiserUrl: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                variant="filled"
                                value={userToEdit.address}
                                onChange={(event) => setNewUser({...newUser, address: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Name"
                                variant="filled"
                                value={userToEdit.primaryName}
                                onChange={(event) => setNewUser({...newUser, primaryName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Name"
                                variant="filled"
                                value={userToEdit.secondaryName}
                                onChange={(event) => setNewUser({...newUser, secondaryName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Title"
                                variant="filled"
                                value={userToEdit.primaryTitle}
                                onChange={(event) => setNewUser({...newUser, primaryTitle: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Title"
                                variant="filled"
                                value={userToEdit.secondaryTitle}
                                onChange={(event) => setNewUser({...newUser, secondaryTitle: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Email"
                                variant="filled"
                                value={userToEdit.primaryEmail}
                                onChange={(event) => setNewUser({...newUser, primaryEmail: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={userToEdit.secondaryEmail}
                                onChange={(event) => setNewUser({...newUser, secondaryEmail: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Direct Phone"
                                variant="filled"
                                value={userToEdit.primaryDirectPhone}
                                onChange={(event) => setNewUser({...newUser, primaryDirectPhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Direct Phone"
                                variant="filled"
                                value={userToEdit.secondaryDirectPhone}
                                onChange={(event) => setNewUser({...newUser, secondaryDirectPhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Mobile Phone"
                                variant="filled"
                                value={userToEdit.primaryMobilePhone}
                                onChange={(event) => setNewUser({...newUser, primaryMobilePhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={userToEdit.secondaryMobilePhone}
                                onChange={(event) => setNewUser({...newUser, secondaryMobilePhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Notes"
                                variant="filled"
                                multiline
                                rows={4}
                                value={userToEdit.notes}
                                onChange={(event) => setNewUser({...newUser, notes: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                </>
            }
            {/* {style === "invite" ?
                <Button variant="contained" color="primary" onClick={submitNewUser}>Submit</Button> :
                <Button variant="contained" color="primary" onClick={updateUser}>Save Changes</Button>
            } */}
            
        </FormControl>  
        </>
    )
}