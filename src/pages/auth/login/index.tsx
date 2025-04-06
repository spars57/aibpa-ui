import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import {
    Box,
    Checkbox,
    Collapse,
    Fade,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    Link,
    Paper,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
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
        rememberMe: false,
    });
    const [error, setError] = useState({
        email: {
            state: false,
            message: '',
        },
        password: {
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

    const onCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, rememberMe: event.target.checked }));
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
                name: { state: true, message: 'Provided email address is not valid.' },
            }));
            return false;
        }
        setError((prev) => ({ ...prev, email: { state: false, message: '' } }));
        return true;
    }, []);

    const validatePassword = useCallback((password: string) => {
        if (password.length === 0) {
            setError((prev) => ({ ...prev, password: { state: true, message: 'Password is required.' } }));
            return false;
        }
        setError((prev) => ({ ...prev, password: { state: false, message: '' } }));
        return true;
    }, []);
    //----------------------------------------------------------------------------------------------
    // Asyncronous Handlers
    //----------------------------------------------------------------------------------------------
    const onSubmit = useCallback(
        async (data: typeof payload) => {
            const isEmailValid = validateEmail(data.email);
            const isPasswordValid = validatePassword(data.password);
            if (!isEmailValid || !isPasswordValid) return;
            const body = JSON.stringify({
                email: data.email,
                password: data.password,
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
        [performRequest, validateEmail, validatePassword],
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
                        <InputLabel>
                            <Typography variant="caption">Password</Typography>
                        </InputLabel>
                        <TextField
                            color="secondary"
                            error={error.password.state}
                            onChange={onTextFieldChange}
                            value={payload.password}
                            name="password"
                            size="small"
                            type="password"
                        />
                        <Collapse in={error.password.state}>
                            <FormHelperText error={error.password.state}>{error.password.message}</FormHelperText>
                        </Collapse>
                        <Link variant="caption" color="primary" href="/forgot-password">
                            Forgot your password?
                        </Link>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        size="small"
                                        value={payload.rememberMe}
                                        onChange={onCheckboxChange}
                                    />
                                }
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onSubmit(payload)}
                            loading={loading}
                            disabled={loading}
                        >
                            Login
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={() => navigate(ApplicationRoutesEnum.Register)}
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default memo(LoginPage);
