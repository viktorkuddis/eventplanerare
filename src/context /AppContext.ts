import { createContext } from 'react';
import type { EventType } from '../types';

export type AppContextType = {
    ownEvents: EventType[];
    setOwnEvents: (events: EventType[]) => void;
};


export const AppContext = createContext<AppContextType | undefined>(undefined);
