import { Exception } from '../exception';

export type Chat = {
    uuid: string;
    userUuid: string;
    title: string;
    createdAt: string;
    updatedAt: string;
};

export type ChatResponse = Exception | Chat[];
