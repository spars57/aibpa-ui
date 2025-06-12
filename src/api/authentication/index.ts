import useAuthentication from '@/hooks/use-authentication';
import useNotify from '@/hooks/use-notify';
import { useCallback, useMemo, useState } from 'react';
import ExceptionHandler from '../exception';
import { LoginRequest, RegisterRequest } from './request';
import { LoginResponse, RegisterResponse } from './response';

const URL = import.meta.env.VITE_API_URL;

const useAuthenticationApi = () => {
    const { accessToken } = useAuthentication();
    const notify = useNotify();
    const loginUrl = `${URL}/authentication/login`;
    const registerUrl = `${URL}/authentication/register`;
    const logoutUrl = `${URL}/authentication/logout`;

    const [loading, setLoading] = useState({
        login: false,
        logout: false,
        register: false,
    });

    const transformBody = useCallback((body: any) => JSON.stringify(body), []);

    const headers = useMemo(() => {
        return {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        };
    }, [accessToken]);

    const login = useCallback(
        async (request: LoginRequest): Promise<LoginResponse | null> => {
            setLoading((prev) => ({ ...prev, login: true }));
            const body = transformBody(request);
            const response = await fetch(loginUrl, {
                method: 'POST',
                body,
                headers,
            })
                .catch((error) => ExceptionHandler(error, notify))
                .finally(() => setLoading((prev) => ({ ...prev, login: false })));

            if (response && !response.ok) {
                notify.error('Error', 'Invalid email or password');
                return null;
            }

            return response?.json();
        },
        [loginUrl, headers, notify],
    );
    const logout = useCallback(async () => {
        setLoading((prev) => ({ ...prev, logout: true }));
        await fetch(logoutUrl, {
            method: 'GET',
            headers,
        })
            .catch((error) => {
                ExceptionHandler(error, notify);
                return false;
            })
            .finally(() => setLoading((prev) => ({ ...prev, logout: false })));
        return true;
    }, [logoutUrl, headers, notify]);

    const register = useCallback(
        async (request: RegisterRequest): Promise<RegisterResponse | null> => {
            setLoading((prev) => ({ ...prev, register: true }));
            const body = transformBody(request);
            const response = await fetch(registerUrl, {
                method: 'POST',
                body,
                headers,
            })
                .catch((error) => ExceptionHandler(error, notify))
                .finally(() => setLoading((prev) => ({ ...prev, register: false })));

            if (response && !response.ok) {
                notify.error('Error', 'Failed to register user');
                return null;
            }
            return response?.json();
        },
        [registerUrl, headers, notify],
    );

    return { login, logout, register, loading };
};

export default useAuthenticationApi;
