import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Button, Typography } from '@mui/material';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { accessToken, authenticated, setAuthenticated, setAccessToken } = useAuthentication();
    const { loading, performRequest } = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [accessToken]);

    const logout = useCallback(async () => {
        const response = await performRequest(Endpoint.Logout, {
            method: 'GET',
        });
        if (response) {
            setAuthenticated(false);
            setAccessToken(null);
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [performRequest, setAuthenticated, setAccessToken, navigate]);

    return (
        <Box>
            <Typography variant="h1">Home</Typography>
            <Typography variant="body1">Authenticated: {authenticated.toString()}</Typography>
            <Typography sx={{ maxWidth: '100%', wordWrap: 'break-word' }} variant="body1">
                Access Token: {accessToken}
            </Typography>
            <Button loading={loading} variant="contained" color="primary" onClick={logout}>
                Logout{' '}
            </Button>
        </Box>
    );
};

export default memo(HomePage);
