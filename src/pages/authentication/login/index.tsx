import useAuthenticationApi from '@/api/authentication';
import { LoginRequest } from '@/api/authentication/request';
import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
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
    const { setAuthenticated, setAccessToken, authenticated, accessToken, loading: authLoading } = useAuthentication();
    const navigate = useNavigate();
    const authenticationApi = useAuthenticationApi();
    //----------------------------------------------------------------------------------------------
    // State
    //----------------------------------------------------------------------------------------------
    const [payload, setPayload] = useState<LoginRequest>({
        email: '',
        password: '',
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
    const onSubmit = useCallback(async () => {
        const isEmailValid = validateEmail(payload.email);
        const isPasswordValid = validatePassword(payload.password);
        if (!isEmailValid || !isPasswordValid) return;
        const response = await authenticationApi.login(payload);
        if (response && !response.statusCode) {
            setAuthenticated(true);
            setAccessToken(response.accessToken);
            navigate(ApplicationRoutesEnum.Home);
        }
    }, [authenticationApi.login, validateEmail, validatePassword, setAuthenticated, setAccessToken, payload]);
    //----------------------------------------------------------------------------------------------
    // Render
    //----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (authenticated && accessToken && !authLoading && window.location.pathname === ApplicationRoutesEnum.Login)
            navigate(ApplicationRoutesEnum.Home);
    }, [authenticated, accessToken, authLoading]);
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
                    onSubmit();
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
                                control={<Checkbox color="secondary" size="small" />}
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            loading={authenticationApi.loading.login}
                            disabled={authenticationApi.loading.login}
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
