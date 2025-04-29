import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, styled } from '@mui/material';
import { BrowserRouter } from 'react-router';
import Header from './components/header';
import { ProtectedApplicationRoutes, UnprotectedApplicationRoutes } from './config/routes';

import Sidebar from './components/sidebar';
import AuthProvider from './context/auth-provider';
import NotifyProvider from './context/notify';
import useAuthentication from './hooks/use-authentication';
import AuthBarrier from './security/auth-barrier';
import theme from './theme';

const ApplicationBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    flexGrow: 1,
    height: '100%',
    width: '100%',
}));

const Wrapper = styled(Box)<{ authenticated: boolean }>(({ authenticated }) => ({
    transition: 'all 3s ease',
    display: 'flex',
    height: authenticated ? 'calc(100vh - 50px)' : '100vh',
}));

function App() {
    const { authenticated } = useAuthentication();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <NotifyProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Header />
                            <Wrapper authenticated={authenticated}>
                                <Sidebar />
                                <ApplicationBox>
                                    <UnprotectedApplicationRoutes />
                                    <AuthBarrier>
                                        <ProtectedApplicationRoutes />
                                    </AuthBarrier>
                                </ApplicationBox>
                            </Wrapper>
                        </BrowserRouter>
                    </AuthProvider>
                </NotifyProvider>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
