// Component is deprecated
import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, Drawer, Box, ListItemText, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';

export default function ActiveContracts( {item} ) {
    const dispatch = useDispatch();
    const history = useHistory();

    // to format the DATE startMonth
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // local state
    let [isDrawerOpen, setIsDrawerOpen] = useState(false);
    let [messageToSend, setMessageToSend] = useState('');

    // global state from redux
    const store = useSelector((store) => store);
    const chat = store.chat;
    const user = store.user;

    // properties to pass for contract viewing and sending messages via chat
    const contractId = item.id;
    const userId = user.id;

    const viewContract = (contractId) => {
        console.log('in viewContract');
        history.push(`/contracts/edit/${contractId}`);
    }

    function openChat() {
        dispatch({type: 'FETCH_CHAT', payload: contractId});
        setIsDrawerOpen(true);
    }

    function sendMessage(event) {
        event.preventDefault();

        axios.post('/api/chat', {
            messageToSend, userId, contractId
        })
        .then(() => {
            // reload chat after message sends to appear real-time
            dispatch({ type: 'FETCH_CHAT', payload: contractId })
        });

        // clear the chat input field after message sends
        setMessageToSend('');
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
        </>
    );
}