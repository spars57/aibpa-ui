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
    created_at: string;
    updated_at: string;
    is_agent: boolean;
};

export type ChatResponse = Exception & Chat[];
export type ChatMessageResponse = Exception & ChatMessage[];
