// Component is deprecated

import { ListItemButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export default function AdCardListView() {
    // testing data
    let contract = {
        startMonth: 'November 2021',
        contractLength: 12,
        isWebTile: false,
        size: 'Quarter Page',
        page: 2,
        colorType: 'Spot',
        totalCost: 500.00,
    }

    const [isPending, setIsPending] = useState(true);

    const openChat = () => {
        console.log('Opening Chat');
    }

    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText>
                    {contract.startMonth} 
                    {contract.contractLength} 
                    {contract.isWebTile} 
                    {contract.size}
                    {contract.page}
                    {contract.colorType}
                    {contract.totalCost}
                    <IconButton variant="contained" onClick={() => openChat()}>
                        <ChatIcon />
                    </IconButton>
                    {isPending &&
                        <Button 
                            variant="contained"
                            color="default"
                        >
                            Approve
                        </Button>
                    }
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}