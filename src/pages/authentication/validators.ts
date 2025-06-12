import { LoginRequest } from '@/api/authentication/request';
import useNotify from '@/hooks/use-notify';
import { useCallback } from 'react';

const useValidators = () => {
    const notify = useNotify();

    const validateEmailWithRegex = useCallback(
        (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const valid = emailRegex.test(email);
            if (!valid) notify.error('Error', 'Provided email address is not valid.');
            return valid;
        },
        [notify],
    );

    const validateEmail = useCallback(
        (email: string) => {
            if (email.length === 0) {
                notify.error('Error', 'Email is required.');
                return false;
            }
            return validateEmailWithRegex(email);
        },
        [validateEmailWithRegex],
    );

    const validatePassword = useCallback(
        (password: string) => {
            if (password.length === 0) {
                notify.error('Error', 'Password is required.');
                return false;
            }
            return true;
        },
        [notify],
    );

    const validateLoginPayload = useCallback(
        (payload: LoginRequest) => {
            const isEmailValid = validateEmail(payload.email);
            const isPasswordValid = validatePassword(payload.password);
            return isEmailValid && isPasswordValid;
        },
        [validateEmail, validatePassword],
    );

    return { validateEmail, validatePassword, validateLoginPayload };
};

export default useValidators;
