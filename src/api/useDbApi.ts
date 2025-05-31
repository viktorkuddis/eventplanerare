import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const apiUrl = import.meta.env.VITE_API_URL;


export function useDbApi() {
    const { getToken } = useAuth();

    async function createNewEvent(eventData: object) {
        try {
            const token = await getToken();
            console.log("token:")
            console.log(token)

            const response = await axios.post(`${apiUrl}/event`, eventData, {
                headers: { Authorization: `Bearer ${token}` }
            });


            return response.data;
        } catch (error) {
            console.error("Fel vid axios.post:", error);
            throw error;
        }
    }


    async function getEventsByUserId(userId: string | null | undefined) {
        try {
            const token = await getToken();
            console.log("token:")
            console.log(token)

            const response = await axios.get(`${apiUrl}/event/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });


            return response.data;
        } catch (error) {
            console.error("Fel vid axios.post:", error);
            throw error;
        }
    }



    return { createNewEvent, getEventsByUserId };
}
