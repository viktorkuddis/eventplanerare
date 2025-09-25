import { useEffect, useRef } from "react";
import usePageVisible from "./usePageVisible";
import { useDbApi } from "../src/api/useDbApi.ts";
import { useAuth } from "@clerk/clerk-react";


export default function usePollNotifications() {

    const { getNotificationFeedByUserId, } = useDbApi();
    const { userId } = useAuth();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // state som berättar om page är visible så man kan pausa pollingen 

    const isPageVisible = usePageVisible();

    useEffect(() => {

        // let pollNotifications: string | number | NodeJS.Timeout | undefined;

        if (isPageVisible) {
            console.log(`▶️ Polling startades kl ${new Date().toLocaleTimeString()}`);

            // Starta polling bara om sidan är synlig
            getNotificationFeedByUserId(userId);

            intervalRef.current = setInterval(() => {

                getNotificationFeedByUserId(userId);

            }, 15000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                console.log(`⏸️ Polling Stoppades kl ${new Date().toLocaleTimeString()}`);
            }
        }
    }, [isPageVisible, userId]);
}



