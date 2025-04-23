import useNotify from '@/hooks/use-notify';

const ExceptionHandler = (error: any, notify: ReturnType<typeof useNotify>) => {
    notify.error('Error', error.message);
    console.error(error);
};

export type Exception = {
    statusCode?: number;
    message?: string;
};

export default ExceptionHandler;
