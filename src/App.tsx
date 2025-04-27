import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router';
import Header from './components/header';
import { ProtectedApplicationRoutes, UnprotectedApplicationRoutes } from './config/routes';

import Sidebar from './components/sidebar';
import AuthProvider from './context/auth-provider';
import NotifyProvider from './context/notify';
import useAuthentication from './hooks/use-authentication';
import AuthBarrier from './security/auth-barrier';
import theme from './theme';

function App() {
    const { authenticated } = useAuthentication();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <NotifyProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Header />
                            <Box display={'flex'} height={() => (authenticated ? 'calc(100vh - 50px)' : '100vh')}>
                                <Sidebar />
                                <Box
                                    bgcolor={'secondary.light'}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    sx={{ overflow: 'scroll', scrollbarWidth: 'none' }}
                                    flexGrow={1}
                                    height={'100%'}
                                    width={'100%'}
                                >
                                    <UnprotectedApplicationRoutes />
                                    <AuthBarrier>
                                        <ProtectedApplicationRoutes />
                                    </AuthBarrier>
                                </Box>
                            </Box>
                        </BrowserRouter>
                    </AuthProvider>
                </NotifyProvider>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
