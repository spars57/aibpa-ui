import { ThemeProvider } from '@emotion/react';
import { Box, Button } from '@mui/material';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" gap={1}>
                <Button variant="contained" color="secondary">
                    Secondary Button
                </Button>
                <Button variant="contained" color="primary">
                    Primary Button
                </Button>
                <Button variant="contained" color="success">
                    Success Button
                </Button>
                <Button variant="contained" color="warning">
                    Warning Button
                </Button>
                <Button variant="contained" color="error">
                    Error Button
                </Button>
                <Button variant="contained" color="info">
                    Info Button
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default App;
