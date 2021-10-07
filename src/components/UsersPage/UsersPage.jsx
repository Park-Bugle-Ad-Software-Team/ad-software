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
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const allUsers = store.allUsers;

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_USERS'
        });
    }, []);

    const openInvite = () => {
        setIsInviteOpen(true);
        setIsEditOpen(false);
    }

    const editUser = () => {
        setIsEditOpen(true);
        setIsInviteOpen(false);
    }

    const goToEditUser = (userId) => {
        history.push(`/users/edit/${userId}`);
    }

    return (
        <>
            <Typography variant="h2">Users Page</Typography>
            <Button variant="contained" color="primary" onClick={openInvite}>Invite new user</Button>
            {/* <Button variant="contained" color="primary" onClick={editUser}>Edit Existing user</Button> */}
            {/* {isInviteOpen &&
            <>
                <InviteUserForm 
                    style="invite"
                />
            </>
            }
            {isEditOpen &&
            <>
                <InviteUserForm 
                    style="edit"
                    userToEdit="some user"
                />
            </>
            } */}
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