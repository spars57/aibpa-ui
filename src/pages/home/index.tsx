import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Button, Collapse, TextField, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { accessToken, setAuthenticated, setAccessToken } = useAuthentication();
    const { performRequest } = useApi();
    const [queryLoading, setQueryLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [queryResponse, setQueryResponse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [accessToken]);

    const logout = useCallback(async () => {
        setLoginLoading(true);
        const response = await performRequest(Endpoint.Logout, {
            method: 'GET',
        }).finally(() => {
            setLoginLoading(false);
        });
        if (response) {
            setAuthenticated(false);
            setAccessToken(null);
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [performRequest, setAuthenticated, setAccessToken, navigate]);

    const performQuery = useCallback(async () => {
        setQueryLoading(true);
        const response = await performRequest<{ response: string; question: string }>(Endpoint.LangflowQuery, {
            method: 'POST',
            body: JSON.stringify({ question }),
        }).finally(() => {
            setQueryLoading(false);
        });
        if (response) {
            setQueryResponse(response?.data?.response);
        }
    }, [performRequest, question]);

    return (
        <Box display="flex" flexDirection="column" gap={1} p={2}>
            <Typography variant="h2">Langflow Query Response</Typography>

            <TextField
                placeholder="Ask a question to your Personal Assistant"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <Collapse in={queryResponse.length > 0}>
                <Typography variant="body1">AI Response:{queryResponse}</Typography>
            </Collapse>

            <Button loading={queryLoading} variant="contained" color="primary" onClick={performQuery}>
                Query
            </Button>
            <Button loading={loginLoading} variant="contained" color="secondary" onClick={logout}>
                Logout{' '}
            </Button>
        </Box>
    );
};

export default memo(HomePage);
