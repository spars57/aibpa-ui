import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Button, Collapse, TextField, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { accessToken, setAuthenticated, setAccessToken } = useAuthentication();
    const { performRequest } = useApi();
    const [queryLoading, setQueryLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [queryResponse, setQueryResponse] = useState();
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
        const response = await performRequest<any>(Endpoint.AiQuery, {
            method: 'POST',
            body: JSON.stringify({ question }),
        }).finally(() => {
            setQueryLoading(false);
        });
        if (response && response.ok) {
            const json = await response.json();
            const message = json.choices[0].message.content;
            const parts = message.split('</think>');
            setQueryResponse(parts[1]);
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
            <Collapse in={!!queryResponse}>
                <Box sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="body1" component="div">
                        <ReactMarkdown>{queryResponse}</ReactMarkdown>
                    </Typography>
                </Box>
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

/*
import Button from '@/components/button';
import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Fade, InputLabel, Paper, TextField, Typography, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ChatPage = () => {
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
    const [messages, setMessages] = useState<Array<{ sender: string, content: string }>>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    //----------------------------------------------------------------------------------------------
    // Handlers
    //----------------------------------------------------------------------------------------------
    const onTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    }, []);

    //----------------------------------------------------------------------------------------------
    // Asynchronous Handlers
    //----------------------------------------------------------------------------------------------
    const fetchMessages = useCallback(async () => {
        const response = await performRequest<Array<{ sender: string, content: string }>>(Endpoint.GetMessages, {
            method: 'GET',
        });
        if (response && response.ok) {
            const data = await response.json();
            setMessages(data);
        }
    }, [performRequest]);

    const onSendMessage = useCallback(async () => {
        if (!newMessage.trim()) return; // Não enviar mensagens vazias
        const response = await performRequest<any>(Endpoint.SendMessage, {
            method: 'POST',
            body: JSON.stringify({ content: newMessage }),
        });
        if (response && response.ok) {
            fetchMessages(); // Atualiza o histórico após enviar
            setNewMessage(''); // Limpa o campo de entrada
        }
    }, [newMessage, performRequest, fetchMessages]);

    //----------------------------------------------------------------------------------------------
    // Efeitos
    //----------------------------------------------------------------------------------------------
    useEffect(() => {
        if (!authenticated) navigate(ApplicationRoutesEnum.Login);
        fetchMessages(); // Carrega as mensagens ao iniciar
    }, [authenticated, fetchMessages]);

    //----------------------------------------------------------------------------------------------
    // Render
    //----------------------------------------------------------------------------------------------
    return (
        <Box
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            width={'100%'}
            height={'100vh'}
            sx={{
                background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                overflowY: 'auto',
            }}
        >
            <Fade in={true} timeout={1000}>
                <Paper sx={{ boxShadow: 3, maxWidth: 600, width: '100%' }}>
                    <Box display={'flex'} flexDirection={'column'} p={4} minWidth={400} height={'100%'}>
                        <Typography variant="h5" gutterBottom>
                            Chat com a IA
                        </Typography>

                        { Histórico de mensagens }
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            overflowY="auto"
                            maxHeight={400}
                            mb={2}
                        >
                            {messages.map((message, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="body2" color="textPrimary">
                                        <strong>{message.sender}: </strong>
                                        {message.content}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/ Campo de entrada para enviar mensagem }
                        <InputLabel>
                            <Typography variant="caption">Digite sua mensagem</Typography>
                        </InputLabel>
                        <TextField
                            onChange={onTextFieldChange}
                            value={newMessage}
                            name="newMessage"
                            size="small"
                            fullWidth
                            multiline
                            rows={3}
                        />

                        <Button
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="primary"
                            onClick={onSendMessage}
                            loading={loading}
                            disabled={loading || !newMessage.trim()}
                        >
                            Enviar
                        </Button>

                        <Button
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate(ApplicationRoutesEnum.Login)}
                        >
                            Sair
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default memo(ChatPage);
*/
