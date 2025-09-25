import { createContext } from 'react';
import type { NotificationItemType } from '../types';


export type NotificationContextType = {
    notificationFeed: NotificationItemType[];
    setNotificationFeed: React.Dispatch<React.SetStateAction<NotificationItemType[]>>;
};


export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
