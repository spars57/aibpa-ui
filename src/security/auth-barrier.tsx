import useAuthentication from '@/hooks/use-authentication';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ApplicationRoutesEnum } from '../config/routes';

const AuthBarrier = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) navigate(ApplicationRoutesEnum.Login);
    }, [authenticated]);

    return children;
};

export default AuthBarrier;
