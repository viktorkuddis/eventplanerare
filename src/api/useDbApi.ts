import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const apiUrl = import.meta.env.VITE_API_URL;

import { AppContext } from "../context/AppContext";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
import type { EventParticipationType, EventType, NotificationItemType, RequestType, SimplifiedUserType } from "../types";
import type { EventObjectsDetailedType } from "../types";


export function useDbApi() {
    const { getToken } = useAuth();
    const appContext = useContext(AppContext)
    const notificationContext = useContext(NotificationContext)



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
            appContext?.setOwnEvents((prev) => [...prev, event]);
            appContext?.setAllEvents((prev) => [...prev, event]);

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

            appContext?.setOwnEvents(response.data)

            // Uppdatera alla events i context
            appContext?.setAllEvents((existingEvents) => {
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

            appContext?.setCurrentEventObjectsDetailed(eventDetail);



            console.group("sattcurrentEventObjectsDetailed till:")
            console.info(eventDetail)
            console.groupEnd()

            // sparar detaljerade eventobjekt i array så de snabbarde går att visa om de redan hämtats en gån :) 

            appContext?.setEventObjectsDetailed(prev => {
                if (!prev) return [eventDetail];  // om prev är undefined eller tom

                const exists = prev.some(e => e.event._id === eventDetail.event._id);

                if (exists) {
                    // Ersätt det objekt som har samma id
                    return prev.map(e =>
                        e.event._id === eventDetail.event._id ? eventDetail : e
                    );
                } else {
                    // Lägg till nytt objekt om det inte finns
                    return [...prev, eventDetail];
                }
            });

            console.group("lista med hittils hämtade eventobjekt setEventObjectsDetailed(ej aktuellt inkluderat):")
            console.log(appContext?.eventObjectsDetailed);
            console.groupEnd()

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

            notificationContext?.setNotificationFeed(response.data)
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




    async function createNewPersonalActivity(requestData: object) {
        try {
            console.log("Försöker skicka detta:", requestData);

            const token = await getToken();

            const response = await axios.post(`${apiUrl}/personalactivity/create`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Förfrågan skickad:", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid skickande av förfrågan:", error); // Om något gick fel
            throw error; // Skicka vidare felet
        }
    }

    async function updatePersonalActivity(id: string, updateData: object) {
        try {
            console.log("Försöker uppdatera personal activity med data:", updateData);

            const token = await getToken();

            const response = await axios.put(`${apiUrl}/personalactivity/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Uppdatering skickad:", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid uppdatering av personal activity:", error);
            throw error;
        }
    }

    async function deletePersonalActivity(id: string) {
        try {
            console.log("Försöker ta bort personal activity med id:", id);

            const token = await getToken();

            const response = await axios.delete(`${apiUrl}/personalactivity/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Borttagning lyckades:", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid borttagning av personal activity:", error);
            throw error;
        }
    }


    async function createNewEventActivity(requestData: object) {
        try {
            console.log("Försöker skicka detta (event activity):", requestData);

            const token = await getToken();

            const response = await axios.post(`${apiUrl}/eventactivity/create`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Förfrågan skickad (event activity):", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid skickande av event activity:", error);
            throw error;
        }
    }

    async function updateEventActivity(id: string, updateData: object) {
        try {
            console.log("Försöker uppdatera event activity med data:", updateData);

            const token = await getToken();

            const response = await axios.put(`${apiUrl}/eventactivity/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Uppdatering skickad (event activity):", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid uppdatering av event activity:", error);
            throw error;
        }
    }

    async function deleteEventActivity(id: string) {
        try {
            console.log("Försöker ta bort event activity med id:", id);

            const token = await getToken();

            const response = await axios.delete(`${apiUrl}/eventactivity/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Borttagning lyckades (event activity):", response.data);

            return response.data;

        } catch (error) {
            console.error("Fel vid borttagning av event activity:", error);
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
        getAllParticipatingEventsByUserId,
        createNewPersonalActivity,
        updatePersonalActivity,
        deletePersonalActivity,
        createNewEventActivity,
        updateEventActivity,
        deleteEventActivity
    };
}
