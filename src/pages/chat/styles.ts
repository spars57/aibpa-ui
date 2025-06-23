import { Box, CircularProgress, Fade, styled, TextField } from '@mui/material';

export const MainBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 50px)',
    width: '100%',
}));

export const LoadingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    height: 'calc(100vh - 50px)',
}));

export const LoadingFade = styled(Fade)(({ in: inProp }) => ({
    display: inProp ? 'flex' : 'none',
    transition: 'all 0.3s ease',
}));

export const MessagesWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    alignItems: 'top',
    height: '100%',
    width: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const StyledTextField = styled(TextField)(() => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
}));

export const MessageBoxWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const LoadingCircularProgress = styled(CircularProgress)(() => ({
    color: 'white',
    width: '20px',
}));
