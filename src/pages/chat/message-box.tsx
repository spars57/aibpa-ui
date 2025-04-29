import { ChatMessage } from '@/api/chat/response';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

type MessageBoxProps = {
    message: ChatMessage;
};

const MessageBox = ({ message }: MessageBoxProps) => {
    const theme = useTheme();
    const date = new Date(message.created_at);
    console.log(message);
    return (
        <Box
            display="flex"
            width={'100%'}
            alignItems={'top'}
            color={theme.palette.getContrastText(theme.palette.primary.main)}
            gap={2}
            p={2}
        >
            <Avatar variant="square" sx={{ borderRadius: 2 }}>
                {message.is_agent ? 'A' : 'U'}
            </Avatar>
            <Box>
                <Typography fontWeight={'bold'}>{message.is_agent ? 'Agent' : 'User'}</Typography>
                <Typography variant="body1">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </Typography>
                <Typography variant="caption">
                    {date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()}
                </Typography>
            </Box>
        </Box>
    );
};

export default memo(MessageBox);
