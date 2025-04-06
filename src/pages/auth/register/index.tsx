import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Fade, InputLabel, Paper, TextField, Typography, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
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
        password: '',
        username: '',
        country: '',
        city: '',
        firstName: '',
        lastName: '',
    });
    //----------------------------------------------------------------------------------------------
    // Handlers
    //----------------------------------------------------------------------------------------------
    const onTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }, []);
    //----------------------------------------------------------------------------------------------
    // Asyncronous Handlers
    //----------------------------------------------------------------------------------------------
    const onSubmit = useCallback(
        async (data: typeof payload) => {
            const response = await performRequest<any>(Endpoint.Register, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (response && response.ok) {
                const loginResponse = await performRequest<any>(Endpoint.Login, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                });
                if (loginResponse && loginResponse.ok) {
                    const text = await loginResponse.text();
                    const json = JSON.parse(text);
                    setAuthenticated(true);
                    setAccessToken(json.accessToken);
                }
            }
        },
        [performRequest, setAuthenticated, setAccessToken],
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
                        <Typography variant="body1">Register new account to AIBPA</Typography>
                        <Typography variant="body2">Please fill the form below to create an account</Typography>

                        <InputLabel>
                            <Typography variant="caption">First Name</Typography>
                        </InputLabel>
                        <TextField
                            onChange={onTextFieldChange}
                            value={payload.firstName}
                            name="firstName"
                            size="small"
                        />

                        <InputLabel>
                            <Typography variant="caption">Last Name</Typography>
                        </InputLabel>
                        <TextField onChange={onTextFieldChange} value={payload.lastName} name="lastName" size="small" />

                        <InputLabel>
                            <Typography variant="caption">Username</Typography>
                        </InputLabel>
                        <TextField onChange={onTextFieldChange} value={payload.username} name="username" size="small" />

                        <InputLabel>
                            <Typography variant="caption">Email</Typography>
                        </InputLabel>
                        <TextField onChange={onTextFieldChange} value={payload.email} name="email" size="small" />

                        <InputLabel>
                            <Typography variant="caption">Country</Typography>
                        </InputLabel>
                        <TextField onChange={onTextFieldChange} value={payload.country} name="country" size="small" />

                        <InputLabel>
                            <Typography variant="caption">City</Typography>
                        </InputLabel>
                        <TextField onChange={onTextFieldChange} value={payload.city} name="city" size="small" />

                        <InputLabel>
                            <Typography variant="caption">Password</Typography>
                        </InputLabel>
                        <TextField
                            color="secondary"
                            onChange={onTextFieldChange}
                            value={payload.password}
                            name="password"
                            size="small"
                            type="password"
                        />

                        <Button
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="primary"
                            onClick={() => onSubmit(payload)}
                            loading={loading}
                            disabled={loading}
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default memo(RegisterPage);
