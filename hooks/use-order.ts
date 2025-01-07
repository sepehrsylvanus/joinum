import { orderAtom } from '@/contexts/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

export const useOrder = () => useAtom(orderAtom);
export const useSetOrder = () => useSetAtom(orderAtom);
export const useOrderValue = () => useAtomValue(orderAtom);
