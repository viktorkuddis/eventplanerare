
// denna konsol loggar token på den inloggade personen ifall de skul behövas. i utvecklinegn 


import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

function useLoggaToken() {
    const { getToken } = useAuth();

    useEffect(() => {
        (async () => {
            const token = await getToken()
            console.log('Clerk token:', token); // Kopiera detta token till Postman
        })();
    }, [getToken]);
}

export default useLoggaToken;