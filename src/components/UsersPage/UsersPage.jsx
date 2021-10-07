import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel, 
                Typography, List, ListItem, 
                    ListItemButton, ListItemText, Link } from '@mui/material';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import InviteUserForm from './InviteUserForm';


export default function UsersPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const allUsers = store.allUsers;

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_USERS'
        });
    }, []);

    const goToEditUser = (userId) => {
        history.push(`/users/edit/${userId}`);
    }

    return (
        <>
            <Typography variant="h2">Users Page</Typography>
            <Button variant="contained" color="primary" onClick={() => goToEditUser()}>Invite new user</Button>
            <Typography variant="h2">Users List</Typography>
            <List>
                {allUsers.map(user => (
                    <ListItemButton key={user.id} onClick={() => goToEditUser(user.id)}>
                        <ListItemText>
                            {user.id}
                            {user.email}
                            {user.authLevel}
                        </ListItemText>
                        <ListItemText>
                            Edit
                        </ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}