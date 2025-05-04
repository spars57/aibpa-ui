import useChatApi from '@/api/chat';
import { ChatMessage } from '@/api/chat/response';
import useAuthentication from '@/hooks/use-authentication';
import { Fade } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import MessageBox from './message-box';
import {
    LoadingBox,
    LoadingCircularProgress,
    LoadingFade,
    MainBox,
    MessageBoxWrapper,
    MessagesWrapper,
    StyledTextField,
} from './styles';

const ChatPage = () => {
    const { getChatMessages, createMessage } = useChatApi();
    const { accessToken } = useAuthentication();
    const { uuid } = useParams();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [agentThinking, setAgentThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchChatMessages = async (withLoading: boolean) => {
        setLoading(withLoading);
        const response = await getChatMessages(uuid!);
        if (response && !response?.statusCode) {
            if (response.length > messages.length) {
                setMessages(response);
                if (response.length > 0 && response[response.length - 1].is_agent) {
                    setAgentThinking(false);
                }
            }
        }
        setLoading(false);
    };

    const addMessage = (message: ChatMessage) => {
        setMessages([...messages, message]);
    };

    const generateNonAgentMessage = (content: string) => {
        return {
            chatUuid: uuid!,
            content,
            is_agent: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            uuid: '',
        };
    };

    const onSendMessage = async () => {
        if (message.length === 0) return;

        //Add sent message to the list
        const newMessage = generateNonAgentMessage(message);
        addMessage(newMessage);
        setAgentThinking(true);
        //Send message to the server
        const response = await createMessage({ chatUuid: uuid!, content: message });
        if (response && !response?.statusCode) setMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (accessToken) fetchChatMessages(true);
    }, [accessToken, uuid]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChatMessages(false);
        }, 3000);

        return () => clearInterval(interval);
    }, [accessToken, uuid]);

    useEffect(() => {
        if (agentThinking) scrollToBottom();
    }, [messages, agentThinking]);

    const AgentThinkingMessage = (
        <MessageBox
            message={{
                chatUuid: uuid!,
                content: 'Thinking...',
                is_agent: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                uuid: '',
            }}
        />
    );

    return (
        <MainBox>
            <LoadingFade in={loading}>
                <LoadingBox>
                    <LoadingCircularProgress />
                </LoadingBox>
            </LoadingFade>
            <Fade in={!loading}>
                <MessagesWrapper>
                    <MessageBoxWrapper>
                        {messages.map((message) => (
                            <MessageBox key={message.uuid} message={message} />
                        ))}
                        {agentThinking && AgentThinkingMessage}
                        <div ref={messagesEndRef} />
                    </MessageBoxWrapper>
                    <StyledTextField
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onSendMessage();
                        }}
                    />
                </MessagesWrapper>
            </Fade>
        </MainBox>
    );
};

export default memo(ChatPage);
