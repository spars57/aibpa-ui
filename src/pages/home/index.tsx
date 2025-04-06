import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Button, TextField, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { accessToken, authenticated, setAuthenticated, setAccessToken } = useAuthentication();
    const { loading, performRequest } = useApi();
    const [question, setQuestion] = useState('');
    const [queryResponse, setQueryResponse] = useState('');
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

    const performQuery = useCallback(async () => {
        const response = await performRequest<{ response: string; question: string }>(Endpoint.LangflowQuery, {
            method: 'POST',
            body: JSON.stringify({ question }),
        });
        if (response) {
            setQueryResponse(response?.data?.response);
        }
    }, [performRequest, question]);

    return (
        <Box display="flex" flexDirection="column" gap={1} p={2}>
            <Typography variant="h1">Home</Typography>
            <Typography variant="body1">Authenticated: {authenticated.toString()}</Typography>
            <Typography sx={{ maxWidth: '100%', wordWrap: 'break-word' }} variant="body1">
                Access Token: {accessToken}
            </Typography>

            <Typography variant="h2">Langflow Query Response</Typography>
            <Typography variant="body1">Response: {queryResponse}</Typography>

            <TextField placeholder="Enter your query" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <Button variant="contained" color="primary" onClick={performQuery}>
                Query
            </Button>
            <Button loading={loading} variant="contained" color="primary" onClick={logout}>
                Logout{' '}
            </Button>
        </Box>
    );
};

export default memo(HomePage);
