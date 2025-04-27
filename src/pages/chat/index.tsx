import useChatApi from '@/api/chat';
import { ChatMessage } from '@/api/chat/response';
import useAuthentication from '@/hooks/use-authentication';
import { Box, CircularProgress, Fade, TextField, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
const ChatPage = () => {
    const { getChatMessages, createMessage } = useChatApi();
    const { accessToken } = useAuthentication();
    const { uuid } = useParams();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchChatMessages = async () => {
        setLoading(true);
        const response = await getChatMessages(uuid!);
        if (response && !response?.statusCode) {
            setMessages(response);
        }
        setLoading(false);
    };

    const onSendMessage = async () => {
        if (message.length === 0) return;
        const response = await createMessage({ chatUuid: uuid!, content: message });
        if (response && !response?.statusCode) {
            setMessage('');
            setMessages([
                ...messages,
                {
                    chatUuid: uuid!,
                    content: message,
                    isAgent: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    uuid: '',
                },
            ]);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchChatMessages();
        }
    }, [accessToken, uuid]);

    return (
        <Box display={'flex'} flexDirection={'column'} height={'calc(100vh - 50px)'} width={'100%'}>
            <Fade in={loading} style={{ display: loading ? 'flex' : 'none', transition: 'all 0.3s ease' }}>
                <Box
                    height={'100%'}
                    width={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={1}
                >
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                </Box>
            </Fade>
            <Fade in={!loading}>
                <Box display={'flex'} flexDirection={'column'} p={1} alignItems={'top'} height={'100%'} width={'100%'}>
                    <Box display={'flex'} flexDirection={'column'} height={'100%'} width={'100%'}>
                        {messages.map((message) => (
                            <Box key={message.uuid}>
                                {message.isAgent && (
                                    <Box>
                                        <Typography color={'white'}>
                                            <b>Agent:</b>
                                            {message.content}
                                        </Typography>
                                    </Box>
                                )}
                                {!message.isAgent && (
                                    <Box>
                                        <Typography color={'white'}>
                                            <b>User:</b> {message.content}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <TextField
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSendMessage();
                            }
                        }}
                        sx={{ width: '100%' }}
                    />
                </Box>
            </Fade>
        </Box>
    );
};

export default memo(ChatPage);
