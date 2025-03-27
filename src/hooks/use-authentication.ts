import { AuthContext } from '@/context/auth-provider';
import { useContext } from 'react';

const useAuthentication = () => useContext(AuthContext);
export default useAuthentication;
