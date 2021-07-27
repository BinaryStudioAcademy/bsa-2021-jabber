import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'common/types/types';
import { useSelector } from 'hooks/hooks';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
