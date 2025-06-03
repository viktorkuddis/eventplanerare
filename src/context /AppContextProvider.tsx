import { useState, type ReactNode } from 'react';
import type { EventType } from '../types';
import { AppContext, type AppContextType } from './AppContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {


    const [ownEvents, setOwnEvents] = useState<EventType[]>([]);






    const contextValue: AppContextType = { ownEvents, setOwnEvents };


    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
