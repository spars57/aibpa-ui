import useChatApi from '@/api/chat';
import { ChatMessage } from '@/api/chat/response';
import useAuthentication from '@/hooks/use-authentication';
import { Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
const ChatPage = () => {
    const { getChatMessages } = useChatApi();
    const { accessToken } = useAuthentication();
    const { uuid } = useParams();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const fetchChatMessages = async () => {
        const response = await getChatMessages(uuid!);
        if (response && !response?.statusCode) {
            setMessages(response);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchChatMessages();
        }
    }, [accessToken]);

    return <Typography color={'white'}>{JSON.stringify(messages)}</Typography>;
};

export default memo(ChatPage);
