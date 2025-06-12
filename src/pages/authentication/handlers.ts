import { Dispatch, SetStateAction, useCallback } from 'react';

const useHandlers = () => {
    const onTextFieldChange = useCallback(
        (event: React.ChangeEvent<any>, setPayload: Dispatch<SetStateAction<any>>) => {
            setPayload((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        },
        [],
    );

    return { onTextFieldChange };
};

export default useHandlers;
