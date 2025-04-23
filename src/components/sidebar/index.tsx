import useChatApi from '@/api/chat';
import useAuthentication from '@/hooks/use-authentication';
import { memo, useEffect } from 'react';
import Button from '../button';

const Sidebar = () => {
    const { getChats } = useChatApi();
    const { accessToken } = useAuthentication();
    const fetchChats = async () => {
        const response = await getChats();
        console.log(response);
    };
    useEffect(() => {
        if (accessToken) fetchChats();
    }, [accessToken]);
    return <Button color="secondary">hello</Button>;
};

export default memo(Sidebar);
