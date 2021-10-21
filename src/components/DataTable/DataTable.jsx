import { Box, Drawer, Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import './DataTable.css';

export default function DataTable( { tableData }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const rows = tableData;

    // local state
    let [isDrawerOpen, setIsDrawerOpen] = useState(false);
    let [messageToSend, setMessageToSend] = useState('');

    // global state from redux
    const store = useSelector((store) => store);
    const chat = store.chat;
    const contractChatId = store.contractChatId;
    const user = store.user;
    const userId = user.id;

    // to format the time of chat messages
    const formatChatTimestamp = (dateString) => {
        let date = new Date(dateString);
        return (`
            ${(date.getMonth()+1)}/${date.getDay()}/${date.getFullYear()}
            ${date.getHours() <= 12 ? 
                date.getHours() : 
                (date.getHours()-12)
            }:${date.getMinutes()}
            ${date.getHours() <= 12 ? `AM` : `PM`}
        `);
    }

    // to format the time of a contract's start month
    const formatStartMonthTimestamp = (dateString) => {
        const options = { year: "numeric", month: "long"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // button rendered by viewContract renderCell
    const renderViewButton = (params) => {
        const contractId = params.row.id;
        return (
            <button
                className="btn"
                onClick={() => {
                    history.push(`/contracts/edit/${contractId}`);
                }}
            >
                View
            </button>
        );
    }

    // button rendered by contractChat renderCell
    const renderChatButton = (params) => {
        const contractId = params.row.id;
        return (
        <>
            <button className="btn"
                onClick={() => {
                    dispatch({type: 'FETCH_CHAT', payload: contractId});
                    dispatch({type: 'SET_CONTRACT_CHAT_ID', payload: contractId});
                    setIsDrawerOpen(true);;
                }}
            >
                Chat
            </button>
        </>
        );
    }

    // columns for the DataGrid
    const columns = [
        {field: 'companyName', headerName: 'Company', width: 180},
        {field: 'startMonth', headerName: 'Start Month', width: 180,
            valueFormatter: (params) => {
                return formatStartMonthTimestamp(params.row.startMonth);
            },
            // valueGetter is needed to filter properly
            valueGetter: (params) => {
                return formatStartMonthTimestamp(params.row.startMonth);
            }
        },
        {field: 'months', headerName: 'Length', width: 120,
            valueFormatter: (params) => {
                if (params.row.months === null) {
                    return `-pending-`
                }else {
                    return `${params.row.months} months`
                }
            },
            valueGetter: (params) => {
                if (params.row.months === null) {
                    return `0 months`
                }else {
                    return `${params.row.months} months`
                }
            }
        },
        {field: 'contractType', headerName: 'Type', width: 120,
            valueFormatter: (params) => {
                if (params.row.months === null) {
                    return `-pending-`
                }else {
                    return params.row.contractType
                }
            },
            valueGetter: (params) => {
                if (params.row.months === null) {
                    return `-pending-`
                }else {
                    return params.row.contractType
                }
            }
        },
        {field: 'adType', headerName: 'Size', width: 180},
        {field: 'page', headerName: 'Page', width: 120,
            valueFormatter: (params) => {
                if (params.row.contractType === 'Web') {
                    return `N/A`
                }else {
                    return params.row.page
                }
            },
            valueGetter: (params) => {
                if (params.row.contractType === 'Web') {
                    return `N/A`
                }else {
                    return params.row.page
                }
            }
        },
        {field: 'colorType', headerName: 'Color', width: 180},
        {field: 'actualBill', headerName: 'Cost', width: 120,
            valueFormatter: (params) => {
                if (params.row.actualBill === null) {
                    return (`$0`);
                } else {
                    return (`$${params.row.actualBill}`);
                }
            },
            valueGetter: (params) => {
                if (params.row.actualBill === null) {
                    return (`$0`);
                } else {
                    return (`$${params.row.actualBill}`);
                }
            }
        },
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
            align: 'left',
            renderCell: renderChatButton
        },
        {field: 'assignedPeople', headerName: 'Users', width: 400}
    ];

    function customToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
            </GridToolbarContainer>
        )
    }

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
                    {user.authLevel !== 'admin' ?
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection={false}
                            components={{
                                Toolbar: customToolbar,
                            }}
                            // start filtered by user if NOT an admin
                            filterModel={{
                                items: [{
                                    columnField: 'assignedPeople',
                                    operatorValue: 'contains',
                                    value: `${user.name}`
                                }]
                            }}
                        />
                        :
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection={false}
                            components={{
                                Toolbar: customToolbar,
                            }}
                        />
                    }
                </div>
            </div>

            {/* For Chat */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={isDrawerOpen}
            >
                <Box
                    sx={{ width: 400, padding: 5 }}
                >
                    <center>
                        <h1>Chat</h1>
                    </center>

                    <Grid container>
                        {chat.map((item, i) => (
                            <Grid key={i} item xs={12}>
                                {user.id === item.userId ?
                                <>
                                    <p className="myChatTimeStamp">{formatChatTimestamp(item.timeStamp)}</p>
                                    <div className="myChat">
                                        <p className="chatContext">{item.message}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <p className="theirName">{item.Users.name}</p>
                                    <p className="theirChatTimeStamp">{formatChatTimestamp(item.timeStamp)}</p>
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
                            <input
                                placeholder="Send Message"
                                className="chatBar"
                                value={messageToSend}
                                onChange={(event) => setMessageToSend(event.target.value)}
                            />
                        </form>
                        <div>
                            <button className="btn" onClick={() => setIsDrawerOpen(false)}>Close</button>
                        </div>
                    </center>
                </Box>
            </Drawer>
        </>
    );
}