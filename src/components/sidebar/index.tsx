import useChatApi from '@/api/chat';
import { Chat } from '@/api/chat/response';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import useNotify from '@/hooks/use-notify';
import { Box, CircularProgress, Collapse, Divider, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { memo, useEffect, useState } from 'react';
import Button from '../button';
import ChatLabel from './chat';

const Sidebar = () => {
    const { getChats } = useChatApi();
    const notify = useNotify();
    const { accessToken, authenticated } = useAuthentication();
    const [chats, setChats] = useState<Chat[]>([]);
    const { performRequest } = useApi();

    const [loading, setLoading] = useState(true);
    const fetchChats = async () => {
        setLoading(true);
        const response = await getChats().finally(() => setLoading(false));
        if (response && !response?.statusCode) setChats(response);
    };

    const createNewChat = async () => {
        const userUuid = jwtDecode<{ userUuid: string }>(accessToken as string)?.userUuid;
        if (!userUuid) return;

        const endpoint = Endpoint.ChatWithUserUUID.replace('{userUuid}', userUuid);
        await performRequest(endpoint as Endpoint, {
            method: 'POST',
        }).catch((error) => {
            console.error(error);
            notify.error('Failed to create chat', error?.message);
        });

        fetchChats();
    };

    useEffect(() => {
        if (accessToken) fetchChats();
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
            <Button variant="contained" color="primary" onClick={createNewChat}>
                New Chat
            </Button>
            <Divider />
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
