import useChatApi from '@/api/chat';
import { ChatMessage } from '@/api/chat/response';
import useAuthentication from '@/hooks/use-authentication';
import { Box, CircularProgress, Fade, TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MessageBox from './message-box';

const mockedMessages: ChatMessage[] = [
    {
        chatUuid: '',
        content: 'Who is Cristiano Ronaldo?',
        created_at: new Date().toISOString(),
        is_agent: false,
        updated_at: new Date().toISOString(),
        uuid: '',
    },
    {
        chatUuid: '',
        content:
            'Is a famous portuguese footballer who is considered the best in the world. This message was written to exceed the available width of the page. We expect this to get to a new line.',
        created_at: new Date().toISOString(),
        is_agent: true,
        updated_at: new Date().toISOString(),
        uuid: '',
    },
];

const ChatPage = () => {
    const { getChatMessages, createMessage } = useChatApi();
    const { accessToken } = useAuthentication();
    const { uuid } = useParams();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchChatMessages = async (withLoading: boolean) => {
        setLoading(withLoading);
        const response = await getChatMessages(uuid!);
        if (response && !response?.statusCode) setMessages(response);
        else setMessages(mockedMessages);
        setLoading(false);
    };

    const onSendMessage = async () => {
        if (message.length === 0) return;

        //Add sent message to the list
        setMessages([
            ...messages,
            {
                chatUuid: uuid!,
                content: message,
                is_agent: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                uuid: '',
            },
        ]);

        const response = await createMessage({ chatUuid: uuid!, content: message });
        if (response && !response?.statusCode) {
            setMessage('');
            setMessages([
                ...messages,
                {
                    chatUuid: uuid!,
                    content: message,
                    is_agent: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    uuid: '',
                },
            ]);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchChatMessages(true);
        }
    }, [accessToken, uuid]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (messages.length > 0) {
                fetchChatMessages(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        maxHeight={'100%'}
                        width={'100%'}
                        sx={{ overflow: 'scroll' }}
                    >
                        {messages.map((message) => (
                            <MessageBox message={message} />
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
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                        }}
                    />
                </Box>
            </Fade>
        </Box>
    );
};

export default memo(ChatPage);
