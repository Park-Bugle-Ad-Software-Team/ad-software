import { Button, FormControl, TextField, 
            Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';

import InviteUserForm from './InviteUserForm';


export default function UsersPage() {
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const openInvite = () => {
        setIsInviteOpen(true);
    }

    return (
        <>
            <h1>Users Page</h1>
            <Button variant="contained" color="primary" onClick={openInvite}>Invite new user</Button>
            {isInviteOpen &&
            <>
                <InviteUserForm />
            </>
            }
        </>
    )
}