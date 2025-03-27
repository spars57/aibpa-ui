import { Alert, AlertColor, AlertTitle, Snackbar, Typography } from '@mui/material';
import { createContext, useState } from 'react';

type NotifyContextType = {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
};

export const NotifyContext = createContext<NotifyContextType>({
    success: () => {},
    error: () => {},
    info: () => {},
    warning: () => {},
});

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const success = (title: string, message?: string) => {
        setOpen(true);
        setMessage(message || '');
        setTitle(title || 'Success');
        setSeverity('success');
    };

    const error = (title: string, message?: string) => {
        setOpen(true);
        setMessage(message || '');
        setTitle(title || 'Error');
        setSeverity('error');
    };

    const info = (title: string, message?: string) => {
        setOpen(true);
        setMessage(message || '');
        setTitle(title || 'Info');
        setSeverity('info');
    };

    const warning = (title: string, message?: string) => {
        setOpen(true);
        setMessage(message || '');
        setTitle(title || 'Warning');
        setSeverity('warning');
    };

    return (
        <NotifyContext.Provider value={{ success, error, info, warning }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity={severity}>
                    {title && (
                        <AlertTitle>
                            <Typography variant="subtitle2">{title}</Typography>
                        </AlertTitle>
                    )}
                    {message && <Typography variant="body2">{message}</Typography>}
                </Alert>
            </Snackbar>
            {children}
        </NotifyContext.Provider>
    );
};

export default NotifyProvider;
