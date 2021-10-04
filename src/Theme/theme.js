import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#7E0001',
            contrastText: '#FFFFFF'
        },
        default: {
            main: '#dcf5ef'
        },
        common: {
            black: '#333333'
        },
        background: {
            paper: '#f3f3f3'
        }
    }
})

export default theme;