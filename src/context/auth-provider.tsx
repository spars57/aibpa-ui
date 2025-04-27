import { createContext, useEffect, useState } from 'react';

export const localStorageAccessTokenKey = 'aibpa:accessToken';

type AuthContextType = {
    authenticated: boolean;
    accessToken: string | null;
    setAuthenticated: (authenticated: boolean) => void;
    setAccessToken: (accessToken: string | null) => void;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    accessToken: null,
    setAuthenticated: () => {},
    setAccessToken: () => {},
    loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem(localStorageAccessTokenKey);
        console.log('accessToken', accessToken);
        if (accessToken) {
            const decryptedAccessToken = atob(accessToken);
            setAuthenticated(true);
            setAccessToken(decryptedAccessToken);
        }
    }, []);

    useEffect(() => {
        console.log('accessToken', accessToken);
        if (accessToken) {
            console.log('Storing access token', accessToken);
            const encryptedAccessToken = btoa(accessToken);
            localStorage.setItem(localStorageAccessTokenKey, encryptedAccessToken);
        } else {
            localStorage.removeItem(localStorageAccessTokenKey);
        }
    }, [accessToken]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const value = { authenticated, accessToken, setAuthenticated, setAccessToken, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
