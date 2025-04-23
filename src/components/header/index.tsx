import useAuthenticationApi from '@/api/authentication';
import { ApplicationRoutesEnum } from '@/config/routes';
import useAuthentication from '@/hooks/use-authentication';
import { Box, useTheme } from '@mui/material';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Button from '../button';
const Header = () => {
    const { setAuthenticated, setAccessToken, authenticated } = useAuthentication();
    const { logout } = useAuthenticationApi();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogout = useCallback(async () => {
        const response = await logout();
        if (response && !response.statusCode) {
            setAuthenticated(false);
            setAccessToken(null);
            navigate(ApplicationRoutesEnum.Login);
        }
    }, [logout, setAuthenticated, setAccessToken, navigate]);
    return (
        <Box display="flex" width={'100%'} justifyContent={'flex-end'} p={1} bgcolor={theme.palette.primary.main}>
            <Button
                color="secondary"
                onClick={handleLogout}
                sx={{ display: authenticated ? 'block' : 'none' }}
                variant="contained"
            >
                Log Out
            </Button>
        </Box>
    );
};

export default memo(Header);
