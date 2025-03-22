import { createContext, useContext, useState } from 'react';

type AuthContextType = {
    authenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    setAuthenticated: (authenticated: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
};

const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    accessToken: null,
    refreshToken: null,
    setAuthenticated: () => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const value = { authenticated, accessToken, refreshToken, setAuthenticated, setAccessToken, setRefreshToken };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
