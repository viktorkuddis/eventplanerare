import { createContext } from 'react';
import type { EventType, EventObjectsDetailedType } from '../types';


export type AppContextType = {
    ownEvents: EventType[];
    setOwnEvents: React.Dispatch<React.SetStateAction<EventType[]>>;

    currentEventObjectDetailed: EventObjectsDetailedType | null;
    setCurrentEventObjectsDetailed: React.Dispatch<React.SetStateAction<EventObjectsDetailedType | null>>;

    eventObjectsDetailed: EventObjectsDetailedType[];
    setEventObjectsDetailed: React.Dispatch<React.SetStateAction<EventObjectsDetailedType[]>>;

    currentEventObject: EventType | null;
    setCurrentEventObject: React.Dispatch<React.SetStateAction<EventType | null>>

    allEvents: EventType[];
    setAllEvents: React.Dispatch<React.SetStateAction<EventType[]>>
};


export const AppContext = createContext<AppContextType | undefined>(undefined);
