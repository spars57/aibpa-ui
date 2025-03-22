import Button from '@/components/button';
import { useAuth } from '@/context/auth-provider';
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
    const theme = useTheme();
    const { authenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [error, setError] = useState({
        username: {
            state: false,
            message: '',
        },
        password: {
            state: false,
            message: '',
        },
    });

    const onTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }, []);

    const onCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, rememberMe: event.target.checked }));
    }, []);

    const validateEmail = useCallback((email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const validateUsername = useCallback(() => {
        if (payload.username.length === 0) {
            setError((prev) => ({ ...prev, username: { state: true, message: 'Username is required.' } }));
            return false;
        }
        if (payload.username.includes('@')) {
            const isEmailValid = validateEmail(payload.username);
            if (!isEmailValid) {
                setError((prev) => ({
                    ...prev,
                    username: { state: true, message: 'Provided email address is not valid.' },
                }));
                return false;
            }
        }
        setError((prev) => ({ ...prev, username: { state: false, message: '' } }));
        return true;
    }, [payload.username]);

    const validatePassword = useCallback(() => {
        if (payload.password.length === 0) {
            setError((prev) => ({ ...prev, password: { state: true, message: 'Password is required.' } }));
            return false;
        }
        if (payload.password.length < 8) {
            setError((prev) => ({
                ...prev,
                password: { state: true, message: 'Password must be at least 8 characters long.' },
            }));
            return false;
        }
        setError((prev) => ({ ...prev, password: { state: false, message: '' } }));
        return true;
    }, [payload.password]);

    const onSubmit = useCallback(() => {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        if (!isUsernameValid || !isPasswordValid) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [payload]);

    useEffect(() => {
        if (authenticated) navigate('/');
    }, [authenticated]);

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
                    <Box display={'flex'} flexDirection={'column'} p={4} minWidth={300}>
                        <Typography variant="body1">Welcome to AIBPA</Typography>
                        <Typography variant="body2">Please provide credentials to access the platform</Typography>
                        <InputLabel sx={{ mt: 1 }}>
                            <Typography variant="caption">Email or username</Typography>
                        </InputLabel>
                        <TextField
                            error={error.username.state}
                            onChange={onTextFieldChange}
                            value={payload.username}
                            name="username"
                            size="small"
                        />
                        <Collapse in={error.username.state}>
                            <FormHelperText error={error.username.state}>{error.username.message}</FormHelperText>
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
                            onClick={onSubmit}
                            loading={loading}
                            disabled={loading}
                        >
                            Login
                        </Button>
                        <Button color="secondary" variant="contained" sx={{ mt: 1 }}>
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default memo(LoginPage);
