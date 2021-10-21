import { FormLabel, FormControl, MenuItem, Grid, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function ContractNotes({ handleChange }) {
    const store = useSelector(store => store);
    const contractToEdit = store.contractToEdit;
    const user = store.user;

    return (
        <>
            {user.authLevel === "admin" || user.authLevel === "ad rep" ?
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Notes</FormLabel>
                        <TextField
                            multiline
                            rows={6}
                            variant="outlined"
                            sx={{width: 300}}
                            value={contractToEdit.notes || ''}
                            onChange={(event) => handleChange(event, "notes")}
                        />
                    </FormControl>
                </Grid> :
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Notes</FormLabel>
                        <TextField
                            multiline
                            disabled
                            rows={6}
                            variant="outlined"
                            sx={{width: 300}}
                            value={contractToEdit.notes || ''}
                            onChange={(event) => handleChange(event, "notes")}
                        />
                    </FormControl>
                </Grid>
            }
        </>
    )
}