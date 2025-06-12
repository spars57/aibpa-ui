import useAuthenticationApi from '@/api/authentication';
import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Checkbox, Fade, FormControlLabel, InputLabel, Link, Paper, TextField, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useValidators from '../validators';
import { LoginResponse } from '@/api/authentication/response';
import { LoginPayloadInitialState } from '../constants';
import useHandlers from '../handlers';
import { MainBox } from './styles';

const LoginPage = () => {
    //----------------------------------------------------------------------------------------------
    // Hooks
    //----------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    const authenticationApi = useAuthenticationApi();
    const { validateLoginPayload } = useValidators();
    const { onTextFieldChange } = useHandlers();
    const { setAuthenticated, setAccessToken, authenticated, accessToken, loading: authLoading } = useAuthentication();
    //----------------------------------------------------------------------------------------------
    // State
    //----------------------------------------------------------------------------------------------
    const [payload, setPayload] = useState(LoginPayloadInitialState);
    //----------------------------------------------------------------------------------------------
    // Asyncronous Handlers
    //----------------------------------------------------------------------------------------------
    const handleAfterResponse = useCallback(
        (response: LoginResponse | null) => {
            if (response && !response.statusCode) {
                setAuthenticated(true);
                setAccessToken(response.accessToken);
                navigate(ApplicationRoutesEnum.Home);
            }
        },
        [setAuthenticated, setAccessToken, navigate],
    );

    const onSubmit = useCallback(async () => {
        if (!validateLoginPayload(payload)) return;
        const response = await authenticationApi.login(payload);
        handleAfterResponse(response);
    }, [authenticationApi.login, validateLoginPayload, handleAfterResponse, payload]);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') onSubmit();
        },
        [onSubmit],
    );
    //----------------------------------------------------------------------------------------------
    // Component Lifecycle
    //----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (authenticated && accessToken && !authLoading && window.location.pathname === ApplicationRoutesEnum.Login)
            navigate(ApplicationRoutesEnum.Home);
    }, [authenticated, accessToken, authLoading]);
    //----------------------------------------------------------------------------------------------
    // Render
    //----------------------------------------------------------------------------------------------
    return (
        <MainBox onKeyDown={onKeyDown}>
            <Fade in={true} timeout={1000}>
                <Paper sx={{ boxShadow: 3 }}>
                    <Box display={'flex'} flexDirection={'column'} p={4} minWidth={400}>
                        <Typography variant="body1">Welcome to AIBPA</Typography>
                        <Typography variant="body2">Please provide credentials to access the platform</Typography>
                        <InputLabel sx={{ mt: 1 }}>
                            <Typography variant="caption">Email</Typography>
                        </InputLabel>
                        <TextField
                            type="email"
                            onChange={(event) => onTextFieldChange(event, setPayload)}
                            value={payload.email}
                            name="email"
                            size="small"
                        />
                        <InputLabel>
                            <Typography variant="caption">Password</Typography>
                        </InputLabel>
                        <TextField
                            color="secondary"
                            onChange={(event) => onTextFieldChange(event, setPayload)}
                            value={payload.password}
                            name="password"
                            size="small"
                            type="password"
                        />
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
        </MainBox>
    );
};

export default memo(LoginPage);
