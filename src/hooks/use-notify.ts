import { useContext } from 'react';
import { NotifyContext } from '../context/notify';

const useNotify = () => useContext(NotifyContext);

export default useNotify;
