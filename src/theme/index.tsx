import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3B82F6',
            light: '#0EA5E9',
        },
        secondary: {
            main: '#A855F7',
        },
        success: {
            main: '#10B981',
        },
        warning: {
            main: '#F59E0B',
        },
        background: {
            default: '#F9FAFB',
        },
        text: {
            primary: '#111827',
        },
    },
    typography: {
        fontFamily: 'Manrope-Light',
        button: {
            fontSize: '14px',
            fontFamily: 'Manrope-Medium',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
        },
    },
});

export default theme;
