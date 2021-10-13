import { Box, Button, Drawer, Grid, ListItemText, TextField } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';

export default function DataTable( { tableData }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const rows = tableData;

    // to format the time of chat messages
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // local state
    let [isDrawerOpen, setIsDrawerOpen] = useState(false);
    let [messageToSend, setMessageToSend] = useState('');

    // global state from redux
    const store = useSelector((store) => store);
    const chat = store.chat;
    const contractChatId = store.contractChatId;
    const user = store.user;
    const userId = user.id;

    // button rendered by viewContract renderCell
    const renderViewButton = (params) => {
        const contractId = params.row.id;
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    history.push(`/contracts/edit/${contractId}`);
                }}
            >
                View
            </Button>
        );
    }

    // button rendered by contractChat renderCell
    const renderChatButton = (params) => {
        const contractId = params.row.id;
        return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    dispatch({type: 'FETCH_CHAT', payload: contractId});
                    dispatch({type: 'SET_CONTRACT_CHAT_ID', payload: contractId});
                    setIsDrawerOpen(true);;
                }}
            >
                Chat
            </Button>
        </>
        );
    }

    // columns for the DataGrid
    const columns = [
        {field: 'startMonth', headerName: 'Start Month', width: 180},
        {field: 'months', headerName: 'Length', width: 120},
        {field: 'contractType', headerName: 'Type', width: 120},
        {field: 'adType', headerName: 'Size', width: 180},
        {field: 'page', headerName: 'Page', width: 120},
        {field: 'colorType', headerName: 'Color', width: 180},
        {field: 'actualBill', headerName: 'Cost', width: 120},
        {
            field: 'viewContract',
            headerName: 'Details',
            width: 180,
            renderCell: renderViewButton
        },
        {
            field: 'contractChat',
            headerName: 'Chat',
            width: 180,
            renderCell: renderChatButton
        }
    ];

    function sendMessage(event) {
        event.preventDefault();

        axios.post('/api/chat', {
            messageToSend, userId, contractChatId
        })
        .then(() => {
            // reload chat after message sends to appear real-time
            dispatch({ type: 'FETCH_CHAT', payload: contractChatId })
        });

        // clear the chat input field after message sends
        setMessageToSend('');
    }

    return (
        <>
            <div className="dataTable">
                <div>
                    <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection={false}
                    />
                </div>
            </div>

            {/* For Chat */}
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
                            <Grid key={i} item xs={12}>
                                <p className="chatTimeStamp">{formatDate(item.timeStamp)}</p>
                                {user.id === item.userId ?
                                <>
                                    <p className="myName">{item.Users.name}</p>
                                    <div className="myChat">
                                        <p className="chatContext">{item.message}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <p className="theirName">{item.Users.name}</p>
                                    <div className="theirChat">
                                        <p className="chatContext">{item.message}</p>
                                    </div>
                                </>
                                }
                            </Grid>
                        ))}
                    </Grid>
                    <br/>
                    <center>
                        <form onSubmit={sendMessage}>
                            <TextField className="chatBar"
                                id="outlined-multiline-flexible"
                                label="Message"
                                value={messageToSend}
                                onChange={(event) => setMessageToSend(event.target.value)}
                            />
                        </form>
                        <div>
                            <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
                        </div>
                    </center>
                </Box>
            </Drawer>
        </>
    );
}