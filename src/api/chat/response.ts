import { Exception } from '../exception';

export type Chat = {
    uuid: string;
    userUuid: string;
    title: string;
    createdAt: string;
    updatedAt: string;
};

export type ChatMessage = {
    uuid: string;
    chatUuid: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isAgent: boolean;
};

export type ChatResponse = Exception & Chat[];
export type ChatMessageResponse = Exception & ChatMessage[];
