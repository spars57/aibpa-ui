import { createContext, useEffect, useState } from 'react';

const localStorageAccessTokenKey = 'aibpa:accessToken';
const localStorageRefreshTokenKey = 'aibpa:refreshToken';

type AuthContextType = {
    authenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    setAuthenticated: (authenticated: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    accessToken: null,
    refreshToken: null,
    setAuthenticated: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem(localStorageAccessTokenKey);
        const refreshToken = localStorage.getItem(localStorageRefreshTokenKey);
        if (accessToken) {
            const decryptedAccessToken = atob(accessToken);
            setAuthenticated(true);
            setAccessToken(decryptedAccessToken);
        }
        if (refreshToken) {
            const decryptedRefreshToken = atob(refreshToken);
            setRefreshToken(decryptedRefreshToken);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            const encryptedAccessToken = btoa(accessToken);
            localStorage.setItem(localStorageAccessTokenKey, encryptedAccessToken);
        } else {
            localStorage.removeItem(localStorageAccessTokenKey);
        }
    }, [accessToken]);

    useEffect(() => {
        if (refreshToken) {
            const encryptedRefreshToken = btoa(refreshToken);
            localStorage.setItem(localStorageRefreshTokenKey, encryptedRefreshToken);
        } else {
            localStorage.removeItem(localStorageRefreshTokenKey);
        }
    }, [refreshToken]);

    const value = { authenticated, accessToken, refreshToken, setAuthenticated, setAccessToken, setRefreshToken };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
