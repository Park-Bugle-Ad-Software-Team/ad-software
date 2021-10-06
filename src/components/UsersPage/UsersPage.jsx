import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel } from '@mui/material';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import InviteUserForm from './InviteUserForm';


export default function UsersPage() {
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const dispatch = useDispatch();

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

    return (
        <>
            <h1>Users Page</h1>
            <Button variant="contained" color="primary" onClick={openInvite}>Invite new user</Button>
            <Button variant="contained" color="primary" onClick={editUser}>Edit Existing user</Button>
            {isInviteOpen &&
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
            }
        </>
    )
}