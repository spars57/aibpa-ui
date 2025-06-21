import { useState } from 'react';
import useAuthentication from './use-authentication';
import useNotify from './use-notify';

export enum HttpHeaders {
    Authorization = 'Authorization',
    ContentType = 'Content-Type',
    AccessControlAllowOrigin = 'Access-Control-Allow-Origin',
}

export enum Endpoint {
    Login = '/authentication/login',
    Logout = '/authentication/logout',
    Register = '/authentication/register',
    AiQuery = '/ai/query',
    ChatWithUserUUID = '/chat/{userUuid}',
}

const buildUrl = (endpoint: Endpoint) => `${import.meta.env.VITE_API_URL}${endpoint}`;

const useApi = () => {
    const { accessToken } = useAuthentication();
    const notify = useNotify();

    const [loading, setLoading] = useState(false);

    const headers = {
        [HttpHeaders.ContentType]: 'application/json',
        ...(accessToken && { [HttpHeaders.Authorization]: `Bearer ${accessToken}` }),
    };

    // const handleErrors = async (response: Response) => {
    //     const data = await response.json();
    //     if (response.status === 400) notify.error('400 Bad Request', data?.message);
    //     if (response.status === 401) {
    //         notify.error('401 Unauthorized', data?.message);
    //         localStorage.clear();
    //         navigate(ApplicationRoutesEnum.Login);
    //     }
    //     if (response.status === 403) notify.error('403 Forbidden', data?.message);
    //     if (response.status === 404) notify.error('404 Not Found', data?.message);
    //     if (response.status === 409) notify.error('409 Conflict', data?.message);
    //     if (response.status === 422) notify.error('422 Unprocessable Entity', data?.message);
    //     if (response.status === 500) notify.error('500 Internal Server Error', data?.message);
    //     if (response.status === 503) notify.error('503 Service Unavailable', data?.message);
    //     if (response.status === 504) notify.error('504 Gateway Timeout', data?.message);
    //     if (response.status === 505) notify.error('505 HTTP Version Not Supported', data?.message);
    //     if (response.status === 511) notify.error('511 Network Authentication Required', data?.message);
    // };

    const performRequest = async <T extends unknown>(url: Endpoint, options: RequestInit) => {
        try {
            setLoading(true);
            const response = await fetch(buildUrl(url), { ...options, headers });
            return response as T;
        } catch (error: any) {
            console.error(error);
            notify.error(error?.message, error?.status);
        } finally {
            setLoading(false);
        }
        return null;
    };

    return { loading, performRequest };
};

export default useApi;
