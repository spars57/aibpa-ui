import { ApplicationRoutesEnum } from '@/config/routes';
import useApi, { Endpoint } from '@/hooks/use-api';
import useAuthentication from '@/hooks/use-authentication';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../button';
import { Box, useTheme } from '@mui/material';


const Header = () => {
    const { setAuthenticated, setAccessToken, authenticated } = useAuthentication();
    const { performRequest } = useApi();
    const navigate = useNavigate();
    const [loading, setLoginLoading] = useState(true);
    const theme = useTheme();

    const logout = useCallback(async () => {
            setLoginLoading(true);
            const response = await performRequest(Endpoint.Logout, {
                method: 'GET',
            }).finally(() => {
                setLoginLoading(false);
            });
            if (response) {
                setAuthenticated(false);
                setAccessToken(null);
                navigate(ApplicationRoutesEnum.Login);
            }
        }, [performRequest, setAuthenticated, setAccessToken, navigate]);
  return (
    <Box display="flex" width={"100%"} justifyContent={"flex-end"} p={1} bgcolor={theme.palette.primary.main}>
        <Button color = "secondary" onClick={logout} sx={{ display: authenticated? "block": "none"}} variant='contained'>
            Log Out
        </Button>
    </Box>
  ) 
};

export default memo(Header);