import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, Drawer, Box, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

export default function PendingContracts( {item} ) {
    const dispatch = useDispatch();

    // to style the drawer nicely
    // const classes = useStyles();

    // to format the DATE startMonth
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // local state to handle opening of drawer
    let [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // global state from redux
    const store = useSelector((store) => store);
    const chat = store.chat;
    const user = store.user;

    function viewContract() {
        console.log('in viewContract');
    }

    function openChat() {
        // console.log('in openChat');
        dispatch({type: 'FETCH_CHAT', payload: item.id});
        setIsDrawerOpen(true);
    }

    function advertiserApprove() {
        console.log('in advertiserApprove');
    }

    return (
        <>
            <td className="uTd">{formatDate(item.startMonth)}</td>
            <td className="uTd">{item.AdSize.months}</td>
            <td className="uTd">{item.contractType}</td>
            <td className="uTd">{item.AdSize.adType}</td>
            <td className="uTd">{item.page}</td>
            <td className="uTd">{item.Color.colorType}</td>
            <td className="uTd">${item.actualBill}</td>
            <td className="uTd"><Button onClick={viewContract}>View</Button></td>
            <td className="uTd"><Button onClick={openChat}>Chat</Button></td>
            <td className="uTd"><Button onClick={advertiserApprove}>Approve</Button></td>
            <Drawer
                variant="temporary"
                anchor="right"
                open={isDrawerOpen}
            >
                <Box
                    sx={{ width: 300, padding: 5 }}
                >
                    <center>
                        <h1>Chat</h1>
                    </center>

                    <Grid container>
                        {chat.map((item, i) => (
                            <Grid item xs={12}>
                                {user.id === item.userId ?
                                    <ListItemText align="right" primary={item.message}></ListItemText> :
                                    <ListItemText align="left" secondary={item.message}></ListItemText> 
                                }
                            </Grid>
                        ))}
                    </Grid>

                    <center>
                        <Button className="btn" onClick={() => setIsDrawerOpen(false)}>Close</Button>
                    </center>
                </Box>
            </Drawer>
        </>
    );
}