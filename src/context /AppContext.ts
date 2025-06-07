import { createContext } from 'react';
import type { EventType } from '../types';

export type AppContextType = {
    ownEvents: EventType[];
    currentEventObject: EventType | null;
    setCurrentEventObject: React.Dispatch<React.SetStateAction<EventType | null>>
    setOwnEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    allEvents: EventType[];
    setAllEvents: React.Dispatch<React.SetStateAction<EventType[]>>
};


export const AppContext = createContext<AppContextType | undefined>(undefined);
