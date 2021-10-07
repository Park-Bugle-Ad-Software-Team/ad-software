/*
This component is going to be used for rendering both the user creation and user edit features
*/

import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel,
                Switch, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

export default function InviteUserForm({ style, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isAchSwitchChecked, setIsAchSwitchChecked] = useState(true);
    const [isDoNotDisturbChecked, setIsDoNotDisturbChecked] = useState(true);
    // test data - all fields will normally be blank or false on new user creation
    const [newUser, setNewUser] = useState({name: ''});
    const editUser = useSelector(store => store.editUser);

    // Grab user ID from URL
    // /users/edit/:id
    // /users/edit/3
    // { id: 3 }
    const params = useParams();
    const userId = params.id;


    useEffect(() => {
        if (userId === undefined) {
            return;
        } 

        axios.get(`/users/${userId}`)
            .then(res => {
                dispatch({
                    type: 'SET_USER_TO_EDIT',
                    payload: res.data
                });
            });
    }, [userId]);

    function handleChange(event) {
        event.preventDefault();

        if (editUser.id === undefined) {
            dispatch({
                type: 'CREATE_NEW_USER',
                payload: editUser
            });
            history.push('/users');
        } else {
            dispatch({
                type: 'UPDATE_USER',
                payload: editUser
            });
            dispatch({
                type: 'EDIT_USER_CLEAR'
            });
            history.push('/users')
        };
    }

    // const checkUser = () => {
    //     if (user) {
    //         setNewUser(user);
    //     } else {
    //         // this is test data - should be set to empty strings for demoing
    //         setNewUser({
    //             name: 'Garrett',
    //             email: 'gharty@live.com',
    //             authLevel: 'advertiser',
    //             contactPreference: 'email',
    //             acceptAchPayment: isAchSwitchChecked,
    //             companyName: 'Practice Makes Profit',
    //             doNotDisturb: isDoNotDisturbChecked,
    //             advertiserUrl: 'www.garrettharty.com',
    //             address: '8485 Heights Rd, Golden Valley, MN 55060',
    //             primaryName: 'Garrett',
    //             primaryTitle: 'Student',
    //             primaryEmail: 'gharty@live.com',
    //             primaryDirectPhone: '555-555-5555',
    //             primaryMobilePhone: '',
    //             secondaryName: 'Dan St. Aubin',
    //             secondaryTitle: 'Student',
    //             secondaryEmail: 'staubind@gmail.com',
    //             secondaryDirectPhone: '666-666-6666',
    //             secondaryMobilePhone: '',
    //             notes: 'something here',
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

    const flipAchSwitch = (event) => {
        setIsAchSwitchChecked(!event.target.isAchSwitchChecked)
    }

    const flipDoNotDisturbSwitch = (event) => {
        setIsDoNotDisturbChecked(!event.target.setIsDoNotDisturbChecked);
    }

    return (
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
                value={newUser.email}
                onChange={(event) => setNewUser({...newUser, email: event.target.value})}
            />
            <FormControl>
                <InputLabel id="authLevel-select-label">Auth Level</InputLabel>
                <Select
                    labelId="authLevel-select-label"
                    id="authLevel-select"
                    defaultValue=""
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
            {newUser.authLevel === "advertiser" &&
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
                                value={newUser.contactPreference}
                                onChange={(event) => setNewUser({...newUser, contactPreference: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Company Name"
                                variant="filled"
                                value={newUser.companyName}
                                onChange={(event) => setNewUser({...newUser, companyName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Advertiser URL"
                                variant="filled"
                                value={newUser.advertiserUrl}
                                onChange={(event) => setNewUser({...newUser, advertiserUrl: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                variant="filled"
                                value={newUser.address}
                                onChange={(event) => setNewUser({...newUser, address: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Name"
                                variant="filled"
                                value={newUser.primaryName}
                                onChange={(event) => setNewUser({...newUser, primaryName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Name"
                                variant="filled"
                                value={newUser.secondaryName}
                                onChange={(event) => setNewUser({...newUser, secondaryName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Title"
                                variant="filled"
                                value={newUser.primaryTitle}
                                onChange={(event) => setNewUser({...newUser, primaryTitle: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Title"
                                variant="filled"
                                value={newUser.secondaryTitle}
                                onChange={(event) => setNewUser({...newUser, secondaryTitle: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Email"
                                variant="filled"
                                value={newUser.primaryEmail}
                                onChange={(event) => setNewUser({...newUser, primaryEmail: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={newUser.secondaryEmail}
                                onChange={(event) => setNewUser({...newUser, secondaryEmail: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Direct Phone"
                                variant="filled"
                                value={newUser.primaryDirectPhone}
                                onChange={(event) => setNewUser({...newUser, primaryDirectPhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Direct Phone"
                                variant="filled"
                                value={newUser.secondaryDirectPhone}
                                onChange={(event) => setNewUser({...newUser, secondaryDirectPhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Primary Mobile Phone"
                                variant="filled"
                                value={newUser.primaryMobilePhone}
                                onChange={(event) => setNewUser({...newUser, primaryMobilePhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Secondary Email"
                                variant="filled"
                                value={newUser.secondaryMobilePhone}
                                onChange={(event) => setNewUser({...newUser, secondaryMobilePhone: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Notes"
                                variant="filled"
                                multiline
                                rows={4}
                                value={newUser.notes}
                                onChange={(event) => setNewUser({...newUser, notes: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                </>
            }
            {style === "invite" ?
                <Button variant="contained" color="primary" onClick={submitNewUser}>Submit</Button> :
                <Button variant="contained" color="primary" onClick={updateUser}>Save Changes</Button>
            }
            
        </FormControl>  
    )
}