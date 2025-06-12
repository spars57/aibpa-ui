import { LoginRequest, RegisterRequest } from '@/api/authentication/request';

const LoginPayloadInitialState: LoginRequest = {
    email: '',
    password: '',
};

const RegisterPayloadInitialState: RegisterRequest = {
    email: '',
    password: '',
    username: '',
    country: '',
    city: '',
    firstName: '',
    lastName: '',
};

export { LoginPayloadInitialState, RegisterPayloadInitialState };
