import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router';
import { ProtectedApplicationRoutes, UnprotectedApplicationRoutes } from './config/routes';

import AuthProvider from './context/auth-provider';
import NotifyProvider from './context/notify';
import AuthBarrier from './security/auth-barrier';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <NotifyProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Box
                                bgcolor={'background.default'}
                                display={'flex'}
                                flexDirection={'column'}
                                flexGrow={1}
                                height={'100vh'}
                            >
                                <UnprotectedApplicationRoutes />
                                <AuthBarrier>
                                    <ProtectedApplicationRoutes />
                                </AuthBarrier>
                            </Box>
                        </BrowserRouter>
                    </AuthProvider>
                </NotifyProvider>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
