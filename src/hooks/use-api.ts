import { useMemo, useState } from 'react';
import useAuthentication from './use-authentication';
import useNotify from './use-notify';

export enum HttpHeaders {
    Authorization = 'Authorization',
}

export enum ApiUrl {
    Login = '/auth/login',
    Logout = '/auth/logout',
}

const buildUrl = (url: ApiUrl) => `${import.meta.env.VITE_API_URL}${url}`;

const useApi = () => {
    const { accessToken } = useAuthentication();
    const notify = useNotify();

    const [loading, setLoading] = useState(false);

    const headers = useMemo(
        () => ({
            'Content-Type': 'application/json',
            ...(accessToken && { [HttpHeaders.Authorization]: `Bearer ${accessToken}` }),
        }),
        [accessToken],
    );

    const performRequest = async (url: ApiUrl, options: RequestInit) => {
        try {
            setLoading(true);
            const response = await fetch(buildUrl(url), { ...options, headers });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                if (response.status === 400) {
                    notify.error('400 Bad Request', data?.message);
                }
                if (response.status === 401) {
                    notify.error('401 Unauthorized', data?.message);
                }
                if (response.status === 403) {
                    notify.error('403 Forbidden', data?.message);
                }
                if (response.status === 404) {
                    notify.error('404 Not Found', data?.message);
                }
                if (response.status === 422) {
                    notify.error('422 Unprocessable Entity', data?.message);
                }
                if (response.status === 500) {
                    notify.error('500 Internal Server Error', data?.message);
                }
                if (response.status === 503) {
                    notify.error('503 Service Unavailable', data?.message);
                }
                if (response.status === 504) {
                    notify.error('504 Gateway Timeout', data?.message);
                }
                if (response.status === 505) {
                    notify.error('505 HTTP Version Not Supported', data?.message);
                }
                if (response.status === 511) {
                    notify.error('511 Network Authentication Required', data?.message);
                }
            }
        } catch (error: any) {
            console.error(error);

            notify.error(error?.message, error?.status);
        } finally {
            setLoading(false);
        }
    };

    return { loading, performRequest };
};

export default useApi;
