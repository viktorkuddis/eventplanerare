import axios from "axios";


/**
 * Hämtar data från API med ett optional JWT-token från Clerk.
 * @param endpoint URL till ditt API
 * @param token (valfritt) JWT-token från Clerk, skickas som Bearer
 */


export async function getData(endpoint: string, token?: string | null) {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        const response = await axios.get(endpoint, { headers });

        return response.data;

    } catch (error) {
        console.error("Fel vid axios.get:", error);
        throw error;
    }
}
