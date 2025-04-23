import Button from '@/components/button';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const HomePage = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" height={'100%'}>
            <Box display="flex" flexDirection="column" gap={1} maxWidth={'50%'}>
                <Typography textAlign={'center'} width={'100%'} variant="h2" color={'white'}>
                    Welcome to Chat AIBPA
                </Typography>
                <Typography textAlign={'center'} variant="body1" color={'white'}>
                    The backend API of the Intelligent Personal Assistant, built to manage multi-agent communication,
                    process user requests, and orchestrate task automation. This API serves as the core of the system,
                    enabling agents to collaborate and integrate with third-party services.
                </Typography>
                <Box display="flex" width={'100%'} justifyContent={'center'}>
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(HomePage);
