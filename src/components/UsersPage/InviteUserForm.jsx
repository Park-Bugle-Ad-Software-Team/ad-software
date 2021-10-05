import { Button, FormControl, TextField, 
    Select, MenuItem, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function InviteUserForm() {
    const dispatch = useDispatch()
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        authLevel: '',
    });

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
            <Button variant="contained" color="primary" onClick={submitNewUser}>Submit</Button>
        </FormControl>  
    )
}