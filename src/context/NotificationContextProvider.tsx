import { useState, type ReactNode } from 'react';
import type { NotificationItemType } from '../types';
import { NotificationContext, type NotificationContextType } from './NotificationContext';

export const NotificationContextProvider = ({ children }: { children: ReactNode }) => {

    const [notificationFeed, setNotificationFeed] = useState<NotificationItemType[]>([])



    const contextValue: NotificationContextType = {
        notificationFeed,
        setNotificationFeed
    }



    return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
