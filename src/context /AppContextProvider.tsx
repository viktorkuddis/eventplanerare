import { useState, type ReactNode } from 'react';
import type { EventType } from '../types';
import { AppContext, type AppContextType } from './AppContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {


    // de event som användaren just ju interagerar med.
    const [currentEventId, setCurrentEventId] = useState<string>("");


    const [ownEvents, setOwnEvents] = useState<EventType[]>([]);


    // vid uppdatering sätt alla event här oavsett var dom tars ifrån.
    const [allEvents, setAllEvents] = useState<EventType[]>([]);






    const contextValue: AppContextType = {
        ownEvents,
        setOwnEvents,
        currentEventId,
        setCurrentEventId,
        allEvents,
        setAllEvents
    };


    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
