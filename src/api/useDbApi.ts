import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const apiUrl = import.meta.env.VITE_API_URL;

import { AppContext } from "../context /AppContext";
import { useContext } from "react";
import type { EventType } from "../types";


export function useDbApi() {
    const { getToken } = useAuth();
    const context = useContext(AppContext)

    async function createNewEvent(eventData: object) {
        try {
            const token = await getToken();
            console.log("token:")
            console.log(token)

            const response = await axios.post(`${apiUrl}/event`, eventData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // lägger till data till context
            context?.setOwnEvents((prev) => [...prev, response.data]);
            context?.setAllEvents((prev) => [...prev, response.data]);

            console.log("Event tillagd :) ")

            return response.data;

        } catch (error) {
            console.error("Fel vid axios.post:", error);
            throw error;
        }
    }

    // HÄMTAR ALLA EVENT SOM TILLHÖR EN SPECIFFIK ANVÄNDARE
    async function getEventsByUserId(userId: string | null | undefined) {
        try {
            const token = await getToken();
            console.log("token:")
            console.log(token)

            const response = await axios.get(`${apiUrl}/user/${userId}/events`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // sätter egna event till context
            context?.setOwnEvents(response.data)

            // Uppdatera alla events i context
            context?.setAllEvents((existingEvents) => {
                const eventsToAdd = response.data.filter((newEvent: EventType) =>
                    !existingEvents.some(existingEvent => existingEvent._id === newEvent._id)
                );
                return [...existingEvents, ...eventsToAdd];
            });





            console.log("context ocnEvents Uppdaterad", response.data)


            return response.data;
        } catch (error) {
            console.error("Fel vid axios.post:", error);
            throw error;
        }


    }



    return { createNewEvent, getEventsByUserId };
}
