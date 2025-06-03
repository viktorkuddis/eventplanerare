import { createContext } from 'react';
import type { EventType } from '../types';

export type AppContextType = {
    ownEvents: EventType[];
    setOwnEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};


export const AppContext = createContext<AppContextType | undefined>(undefined);
