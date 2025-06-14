import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const apiUrl = import.meta.env.VITE_API_URL;

import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import type { EventParticipationType, EventType, NotificationItemType, RequestType, SimplifiedUserType } from "../types";
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



    // Hämtar ett event via connectionCode
    async function getEventByConnectionCode(connectionCode: string) {
        try {
            const token = await getToken();

            const response = await axios.get(`${apiUrl}/events/bycode/${connectionCode}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const event: EventType = response.data;

            console.log("Event hämtat via connectionCode:", event);

            return event;

        } catch (error) {
            console.error("Fel vid hämtning av event via connectionCode:", error);
            return null

        }
    }



    // HÄMTAR ALLA EVENT SOM EN VISS PERSON DALTAR I dvs både som gäst och host 
    async function getAllParticipatingEventsByUserId(userId: string | null | undefined) {
        try {
            const token = await getToken();
            console.log("token:")
            console.log(token)

            const response = await axios.get(`${apiUrl}/events/${userId}/all-participating-events`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const allEvents: EventType[] = response.data;


            // context?.setOwnEvents(allEvents.filter(e => e.ownerUserAuthId === userId))
            // console.log("🗓️satte egna event i kontext")


            // // Uppdatera alla events i context
            // context?.setAllEvents(response.data)
            // console.log("🗓️satte alla events i context")


            return allEvents;

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

                console.log("🗓️events sattessattes")

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

            // sparar detaljerade eventobjekt så de snabbarde går att visa nå :) 
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
        }




    }
    async function createNewRequest(requestData: object) {
        try {
            console.log("Försöker skicka detta:", requestData);

            const token = await getToken();

            const response = await axios.post(`${apiUrl}/requests`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Förfrågan skickad:", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid skickande av förfrågan:", error); // Om något gick fel
            throw error; // Skicka vidare felet
        }
    }

    async function getRequest(requestId: string) {
        try {
            console.log("försöker hitta denna request:", requestId);
            const token = await getToken();

            const response = await axios.get(`${apiUrl}/requests/${requestId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("fick detta:", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid försök att hämta en förfrågan", error);
            throw error;
        }
    }

    // hämta notifications baserat på användarens id:
    async function getNotificationFeedByUserId(userId: string | null | undefined) {
        try {

            // console.log("🔔börjar hämta notifications.")

            const token = await getToken();
            // console.log("token:")
            // console.log(token)

            const response = await axios.get(`${apiUrl}/users/${userId}/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const notificationItems: NotificationItemType[] = response.data

            // console.log("🔔notificationssvar: ", response.data)

            context?.setNotificationFeed(response.data)
            console.log("🔔notiser sattes")


            return notificationItems;
        } catch (error) {

            console.error("🔔Fel hämtning av notifications:", error);
            throw error;
        }


    }


    // hämta notifications baserat på användarens id:
    async function getUsersByIdList(usersList: string[]) {
        try {

            const token = await getToken();
            // console.log("token:")
            // console.log(token)

            const response = await axios.get(`${apiUrl}/users/list?userIds=${usersList}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const usersItems: SimplifiedUserType[] = response.data

            return usersItems;
        } catch (error) {

            console.error("🔔Fel hämtning simplifies användarobjekt från clerk via api:", error);
            throw error;
        }


    }


    async function updateRequestStatus(requestId: string, status: string) {
        try {
            const token = await getToken();

            const response = await axios.patch(`${apiUrl}/requests/${requestId}`,
                { status }, // skickar bara status
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Request uppdaterad:", response.data);
            return response.data;
        } catch (error) {
            console.error("Fel vid uppdatering av request:", error);
            throw error;
        }
    }


    async function createEventParticipation(participationData: EventParticipationType) {
        try {
            const token = await getToken();


            console.log("🙃")
            const response = await axios.post(`${apiUrl}/eventParticipations`, participationData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response)

            console.log("EventParticipation skapad:", response.data);

            return response.data;
        } catch (error) {
            console.error("Fel vid skapande av EventParticipation:", error);
            throw error;
        }
    }


    async function acceptJoinnEventRequestAndCreateParticipation(requestId: string) {
        try {
            const token = await getToken();

            const response = await axios.patch(`${apiUrl}/requests/accept/${requestId}`,
                {}, //tom body
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const data: {
                message: string;
                updatedRequest: RequestType;
                createdEventParticipation: EventParticipationType;
            } = response.data;

            console.log("Request uppdaterad och patisipationskapad:", data);
            return data;

        } catch (error) {
            console.error("Fel när vi försökte acceptera förfrågan :", error);
            throw error;
        }
    }

    return {
        createNewEvent,
        getEventsByUserId,
        getEventDetailsById,
        getEventByConnectionCode,
        createNewRequest,
        getNotificationFeedByUserId,
        getRequest,
        getUsersByIdList,
        updateRequestStatus,
        createEventParticipation,
        acceptJoinnEventRequestAndCreateParticipation,
        getAllParticipatingEventsByUserId
    };
}
