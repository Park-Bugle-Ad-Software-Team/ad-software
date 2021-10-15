import { Button, Typography, List,  
            ListItemButton, ListItemText, Grid,
                Table, TableBody, TableCell, TableContainer,
                    TableRow, TableHead, Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './UsersPage.css';

export default function UsersPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const allUsers = store.allUsers;

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_USERS'
        });
        dispatch({
            type: 'UNSET_CONTRACT_TO_EDIT'
        });
    }, []);

    const goToEditUser = (userId) => {
        history.push(`/users/edit/${userId}`);
    }

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="h2">Users Page</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button id="inviteUserBtn" variant="contained" color="primary" onClick={() => goToEditUser()}>Invite new user</Button>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>

                            <Typography variant="h3">Employee List</Typography>
                        
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers.map(user => (
                                    <TableRow 
                                        key={user.id} 
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className="userTableRow"
                                        onClick={() => goToEditUser(user.id)}
                                    >
                                        <TableCell component="th" scope='row'>{user.name}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                        <TableCell align="right">
                                            <Button 
                                                variant="contained" 
                                                color="primary"
                                                onClick={() => goToEditUser(user.id)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}