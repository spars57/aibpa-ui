import useChatApi from '@/api/chat';
import { Chat } from '@/api/chat/response';
import { ApplicationRoutesEnum } from '@/config/routes';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Typography, useTheme } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type SidebarProps = {
    selectedUuid: string;
};

const Sidebar = ({ selectedUuid }: SidebarProps) => {
    const theme = useTheme();
    const { getChats } = useChatApi();
    const { accessToken, authenticated } = useAuthentication();
    const [chats, setChats] = useState<Chat[]>([]);
    const navigate = useNavigate();
    const fetchChats = async () => {
        const response = await getChats();
        if (response && !response?.statusCode) {
            setChats(response);
        }
    };

    const onChatClick = (uuid: string) => {
        navigate(ApplicationRoutesEnum.ChatDetails.replace(':uuid', uuid));
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
            bgcolor={'primary.light'}
        >
            {chats.map((chat) => (
                <Typography
                    sx={{
                        p: 1,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.secondary.dark}`,
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                            bgcolor: 'secondary.main',
                        },
                    }}
                    onClick={() => onChatClick(chat.uuid)}
                    key={chat.uuid}
                >
                    {chat.title}
                </Typography>
            ))}
        </Box>
    );
};

export default memo(Sidebar);
