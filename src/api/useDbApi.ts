import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const apiUrl = import.meta.env.VITE_API_URL;

import { AppContext } from "../context /AppContext";
import { useContext } from "react";
import type { EventParticipationType, EventType } from "../types";
import type { EventObjectsDetailedType } from "../types";


export function useDbApi() {
    const { getToken } = useAuth();
    const context = useContext(AppContext)

    async function createNewEvent(eventData: object) {
        try {
            const token = await getToken();

            // console.log("token:")
            // console.log(token)

            // ! !! !!! !!! DENNA RUTT SKAPA BÅDE EVENT OCH EN TILLHÖRANDE PARTISIPATION
            const response = await axios.post(`${apiUrl}/events`, eventData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // response. data innehåller både event och participation
            const { event } = response.data as { event: EventType; participation: EventParticipationType };
            console.log(response.data)

            // Lägg till event i context
            context?.setOwnEvents((prev) => [...prev, event]);
            context?.setAllEvents((prev) => [...prev, event]);

            console.log("Event tillagd :) ")
            console.log()

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

            const response = await axios.get(`${apiUrl}/users/${userId}/events`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            context?.setOwnEvents(response.data)

            // Uppdatera alla events i context
            context?.setAllEvents((existingEvents) => {
                const eventsToAdd = response.data.filter((newEvent: EventType) =>
                    !existingEvents.some(existingEvent => existingEvent._id === newEvent._id)
                );
                return [...existingEvents, ...eventsToAdd];
            });





            // console.log("context ocnEvents Uppdaterad", response.data)


            return response.data;
        } catch (error) {
            console.error("Fel vid axios.post:", error);
            throw error;
        }


    }

    // hämtar detaljerad data om ett event by ID
    async function getEventDetailsById(eventId: string) {
        try {
            const token = await getToken();
            // console.log("token:");
            // console.log(token);

            const response = await axios.get(`${apiUrl}/events/${eventId}/details`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const eventDetail: EventObjectsDetailedType = response.data;

            context?.setCurrentEventObjectsDetailed(eventDetail);
            console.log("satt currentEventObjectsDetailed till:", eventDetail)

            context?.setEventObjectsDetailed(prev => {
                const exists = prev?.some(e => e.event._id === eventDetail.event._id);
                if (exists) {
                    console.log("Event finns redan i contexten eventObjectsDetailed[] så uppdatering skedde inte:", eventDetail.event._id);
                    return prev;
                } else {
                    console.log("Eventet har inte besökts ännu denna sessionen så contexten eventObjectsDetailed[] uppdaterades med denne.", eventDetail.event._id);
                    return [...prev, eventDetail];
                }
            });

            console.log("Event detaljer hämtade", eventDetail);
            return eventDetail;
        } catch (error) {
            console.error("Fel vid axios.get för event detaljer:", error);
            throw error;
        }
    }




    return { createNewEvent, getEventsByUserId, getEventDetailsById };
}
