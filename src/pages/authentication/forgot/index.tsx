import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Collapse, Fade, FormHelperText, InputLabel, Paper, TextField, Typography, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ForgotPage = () => {
    //----------------------------------------------------------------------------------------------
    // Hooks
    //----------------------------------------------------------------------------------------------
    const theme = useTheme();
    const { authenticated, setAuthenticated, setAccessToken } = useAuthentication();
    const { loading, performRequest } = useApi();
    const navigate = useNavigate();
    //----------------------------------------------------------------------------------------------
    // State
    //----------------------------------------------------------------------------------------------
    const [payload, setPayload] = useState({
        email: '',
    });
    const [error, setError] = useState({
        email: {
            state: false,
            message: '',
        },
    });
    //----------------------------------------------------------------------------------------------
    // Handlers
    //----------------------------------------------------------------------------------------------
    const onTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }, []);
    //----------------------------------------------------------------------------------------------
    // Validators
    //----------------------------------------------------------------------------------------------
    const validateEmailWithRegex = useCallback((email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const validateEmail = useCallback((email: string) => {
        if (email.length === 0) {
            setError((prev) => ({ ...prev, name: { state: true, message: 'Email is required.' } }));
            return false;
        }
        const isEmailValid = validateEmailWithRegex(email);
        if (!isEmailValid) {
            setError((prev) => ({
                ...prev,
                name: { state: true, message: '' },
            }));
            return false;
        }
        setError((prev) => ({ ...prev, email: { state: false, message: '' } }));
        return true;
    }, []);
    //----------------------------------------------------------------------------------------------
    // Asyncronous Handlers
    //----------------------------------------------------------------------------------------------
    const onSubmit = useCallback(
        async (data: typeof payload) => {
            const isEmailValid = validateEmail(data.email);
            if (!isEmailValid) return;
            const body = JSON.stringify({
                email: data.email,
            });
            const response = await performRequest<any>(Endpoint.Login, {
                method: 'POST',
                body,
            });

            if (response && response.ok) {
                const text = await response.text();
                const json = JSON.parse(text);
                setAuthenticated(true);
                setAccessToken(json.accessToken);
            }
        },
        [performRequest, validateEmail],
    );
    //----------------------------------------------------------------------------------------------
    // Callbacks
    //----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (authenticated) navigate(ApplicationRoutesEnum.Home);
    }, [authenticated]);
    //----------------------------------------------------------------------------------------------
    // Render
    //----------------------------------------------------------------------------------------------
    return (
        <Box
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            height={'100vh'}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    onSubmit(payload);
                }
            }}
            sx={{
                background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }}
        >
            <Fade in={true} timeout={1000}>
                <Paper sx={{ boxShadow: 3 }}>
                    <Box display={'flex'} flexDirection={'column'} p={4} minWidth={400}>
                        <Typography variant="body1">Welcome to AIBPA</Typography>
                        <Typography variant="body2">Please provide credentials to access the platform</Typography>
                        <InputLabel sx={{ mt: 1 }}>
                            <Typography variant="caption">Email</Typography>
                        </InputLabel>
                        <TextField
                            error={error.email.state}
                            type="email"
                            onChange={onTextFieldChange}
                            value={payload.email}
                            name="email"
                            size="small"
                        />
                        <Collapse in={error.email.state}>
                            <FormHelperText error={error.email.state}>{error.email.message}</FormHelperText>
                        </Collapse>
                        <Button
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="primary"
                            onClick={() => onSubmit(payload)}
                            loading={loading}
                            disabled={loading}
                        >
                            Send
                        </Button>

                        <Button
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate(ApplicationRoutesEnum.Login)}
                        >
                            Return
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default memo(ForgotPage);