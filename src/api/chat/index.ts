import useAuthentication from '@/hooks/use-authentication';
import useNotify from '@/hooks/use-notify';
import { jwtDecode } from 'jwt-decode';
import { useCallback, useMemo, useState } from 'react';
import ExceptionHandler from '../exception';
import { CreateMessageRequest } from './request';
import { ChatMessageResponse, ChatResponse } from './response';
const URL = import.meta.env.VITE_API_URL;

const useChatApi = () => {
    const { accessToken } = useAuthentication();
    const notify = useNotify();
    const getChatsUrl = `${URL}/chat/{userUuid}`;
    const createChatUrl = `${URL}/chat/{userUuid}`;
    const getChatMessagesUrl = `${URL}/chat/{chatUuid}/messages`;
    const createMessageUrl = `${URL}/chat/message/create`;

    const decodedAccessToken = useMemo(() => {
        return accessToken ? jwtDecode<{ userUuid: string }>(accessToken) : null;
    }, [accessToken]);

    const [loading, setLoading] = useState({
        getChats: false,
        createChat: false,
        getChatMessages: false,
        createMessage: false,
    });

    const headers = useMemo(() => {
        return {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        };
    }, [accessToken]);

    const getChats = useCallback(async (): Promise<ChatResponse | null> => {
        setLoading((prev) => ({ ...prev, getChats: true }));
        const response = await fetch(getChatsUrl.replace('{userUuid}', decodedAccessToken?.userUuid!), {
            method: 'GET',
            headers,
        })
            .catch((error) => ExceptionHandler(error, notify))
            .finally(() => setLoading((prev) => ({ ...prev, getChats: false })));
        return response?.json();
    }, [getChatsUrl, headers, decodedAccessToken]);

    const createChat = useCallback(async (): Promise<ChatResponse | null> => {
        setLoading((prev) => ({ ...prev, createChat: true }));
        const response = await fetch(createChatUrl.replace('{userUuid}', decodedAccessToken?.userUuid!), {
            method: 'POST',
            headers,
        })
            .catch((error) => ExceptionHandler(error, notify))
            .finally(() => setLoading((prev) => ({ ...prev, createChat: false })));
        return response?.json();
    }, [createChatUrl, headers, decodedAccessToken]);

    const getChatMessages = useCallback(
        async (chatUuid: string): Promise<ChatMessageResponse | null> => {
            console.warn('getChatMessages', chatUuid);
            console.warn('getChatMessagesUrl', getChatMessagesUrl.replace('{chatUuid}', chatUuid));
            console.warn('headers', headers);
            setLoading((prev) => ({ ...prev, getChatMessages: true }));
            const response = await fetch(getChatMessagesUrl.replace('{chatUuid}', chatUuid), {
                method: 'GET',
                headers,
            })
                .catch((error) => ExceptionHandler(error, notify))
                .finally(() => setLoading((prev) => ({ ...prev, getChatMessages: false })));
            return response?.json();
        },
        [getChatMessagesUrl, headers],
    );

    const createMessage = useCallback(
        async (request: Omit<CreateMessageRequest, 'userUuid'>): Promise<ChatResponse | null> => {
            setLoading((prev) => ({ ...prev, createMessage: true }));
            const response = await fetch(createMessageUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({ ...request, userUuid: decodedAccessToken?.userUuid! }),
            })
                .catch((error) => ExceptionHandler(error, notify))
                .finally(() => setLoading((prev) => ({ ...prev, createMessage: false })));
            return response?.json();
        },
        [createMessageUrl, headers],
    );
    return { getChats, createChat, getChatMessages, createMessage, loading };
};

export default useChatApi;
