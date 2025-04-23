import useAuthenticationApi from '@/api/authentication';
import { ApplicationRoutesEnum } from '@/config/routes';
import useAuthentication from '@/hooks/use-authentication';
import { Box, Collapse, Typography, useTheme } from '@mui/material';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Button from '../button';
const Header = () => {
    const { setAuthenticated, setAccessToken, authenticated } = useAuthentication();
    const { logout, loading } = useAuthenticationApi();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogout = useCallback(async () => {
        const response = await logout();
        if (response) {
            setAuthenticated(false);
            setAccessToken(null);
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [logout, setAuthenticated, setAccessToken, navigate]);

    return (
        <Collapse in={authenticated}>
            <Box
                display="flex"
                width={'100%'}
                height={'50px'}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={1}
                px={2}
                bgcolor={theme.palette.primary.main}
            >
                <Typography variant="h1" color={'white'}>
                    Chat AIBPA
                </Typography>
                <Button color="secondary" onClick={handleLogout} variant="contained" loading={loading.logout}>
                    Log Out
                </Button>
            </Box>
        </Collapse>
    );
};

export default memo(Header);
