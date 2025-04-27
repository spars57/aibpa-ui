import { Chat } from '@/api/chat/response';
import { ApplicationRoutesEnum } from '@/config/routes';
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { memo } from 'react';
import { useNavigate } from 'react-router';

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: 5,
    border: `1px solid transparent`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.dark,
        scale: 1.01,
    },
    '&:active': {
        scale: 0.99,
    },
}));

const ChatLabel = ({ chat }: { chat: Chat }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const onChatClick = () => {
        navigate(ApplicationRoutesEnum.ChatDetails.replace(':uuid', chat.uuid));
    };

    return (
        <StyledBox color={theme.palette.primary.contrastText} onClick={onChatClick}>
            <Typography>{chat.title}</Typography>
        </StyledBox>
    );
};

export default memo(ChatLabel);
