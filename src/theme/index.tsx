import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#354655',
            light: '#0EA5E9',
            dark: '#021322',
        },
        secondary: {
            light: '#087E8B',
            main: '#087E8B',
            dark: '#06656f',
        },
        success: {
            main: '#10B981',
        },
        error: {
            dark: '#840103',
            main: '#A50104',
            light: '#b73436',
        },
        warning: {
            light: '#fdc836',
            main: '#FCBA04',
            dark: '#ca9503',
        },
        background: {
            default: '#F4FFF8',
        },
        text: {
            primary: '#111827',
        },
        grey: {
            100: '#f4fff8',
            200: '#dce6df',
            300: '#c3ccc6',
            400: '#abb3ae',
            500: '#929995',
            600: '#7a807c',
            700: '#626663',
            800: '#494c4a',
            900: '#313332',
        },
    },
    typography: {
        fontFamily: 'Manrope-Light',
        button: {
            fontSize: '14px',
            fontFamily: 'Manrope-Bold',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
        },
        body1: {
            fontSize: '14px',
            fontFamily: 'Manrope-Regular',
        },
        body2: {
            fontSize: '12px',
            fontFamily: 'Manrope-Regular',
        },
        caption: {
            fontSize: '10px',
            fontFamily: 'Manrope-Regular',
        },
        subtitle1: {
            fontSize: '16px',
            fontFamily: 'Manrope-Regular',
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: '14px',
            fontFamily: 'Manrope-Regular',
            fontWeight: 600,
        },
        overline: {
            fontSize: '12px',
            fontFamily: 'Manrope-Regular',
        },
        h1: {
            fontSize: '24px',
            fontFamily: 'Manrope-Regular',
        },
        h2: {
            fontSize: '20px',
            fontFamily: 'Manrope-Regular',
        },
        h3: {
            fontSize: '18px',
            fontFamily: 'Manrope-Regular',
        },
        h4: {
            fontSize: '16px',
            fontFamily: 'Manrope-Regular',
        },
        h5: {
            fontSize: '14px',
            fontFamily: 'Manrope-Regular',
        },
        h6: {
            fontSize: '12px',
            fontFamily: 'Manrope-Regular',
        },
    },

    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                },
            },
        },
    },
});

export default theme;
