import useChatApi from '@/api/chat';
import { Chat } from '@/api/chat/response';
import useAuthentication from '@/hooks/use-authentication';
import { Box, CircularProgress, Collapse, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import ChatLabel from './chat';

const Sidebar = () => {
    const { getChats } = useChatApi();
    const { accessToken, authenticated } = useAuthentication();
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchChats = async () => {
        setLoading(true);
        const response = await getChats().finally(() => setLoading(false));
        if (response && !response?.statusCode) setChats(response);
    };

    useEffect(() => {
        if (accessToken) {
            fetchChats();
        }
    }, [accessToken]);

    return (
        <Box
            display={authenticated ? 'flex' : 'none'}
            flexDirection="column"
            p={1}
            gap={0.24}
            minWidth={200}
            height={'calc(100vh - 50px)'}
            bgcolor={'primary.light'}
        >
            {loading && (
                <Box color="white" display={'flex'} justifyContent={'space-between'} p={1} alignItems={'center'}>
                    <Typography variant="h6">Loading chats...</Typography>
                    <CircularProgress color="inherit" size={20} />
                </Box>
            )}
            <Collapse in={!loading && chats.length > 0}>
                <Box display={'flex'} flexDirection={'column'}>
                    {chats.map((chat) => (
                        <ChatLabel key={chat.uuid} chat={chat} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

export default memo(Sidebar);
