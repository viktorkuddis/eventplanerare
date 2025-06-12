import { useState, type ReactNode } from 'react';
import type { EventType, EventObjectsDetailedType, NotificationItemType } from '../types';
import { AppContext, type AppContextType } from './AppContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {


    // de event som användaren just ju interagerar med.
    const [currentEventObject, setCurrentEventObject] = useState<EventType | null>(null);

    const [ownEvents, setOwnEvents] = useState<EventType[]>([]);

    // de event som användaren just ju interagerar med.
    const [currentEventObjectDetailed, setCurrentEventObjectsDetailed] = useState<EventObjectsDetailedType | null>(null);

    // alltefter att användaren interagerar med event så sätter vi dom här:
    const [eventObjectsDetailed, setEventObjectsDetailed] = useState<EventObjectsDetailedType[]>([]);

    const [notificationFeed, setNotificationFeed] = useState<NotificationItemType[]>([])




    // vid uppdatering sätt alla event här oavsett var dom tars ifrån.
    // ! här borde alla event som användaren har vara och dom borde komma med en flagga som är ty "is host ? tru eller fals. men de e i framtiden."
    const [allEvents, setAllEvents] = useState<EventType[]>([]);








    const contextValue: AppContextType = {
        ownEvents,
        setOwnEvents,
        currentEventObject,
        setCurrentEventObject,
        allEvents,
        setAllEvents,
        currentEventObjectDetailed,
        setCurrentEventObjectsDetailed,
        eventObjectsDetailed,
        setEventObjectsDetailed,
        notificationFeed,
        setNotificationFeed
    }



    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
