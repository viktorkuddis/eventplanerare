import { useState, useEffect } from "react";

export default function usePageVisible() {
    // State som håller reda på om sidan är synlig eller ej
    // Initieras med motsatsen till document.hidden (true = synlig)
    const [isVisible, setIsVisible] = useState(!document.hidden); // boolean

    useEffect(() => {
        // Funktion som körs när visibility ändras (t.ex. fliken byts)
        function onVisibilityChange() {
            // Uppdatera state till true om sidan är synlig, annars false
            setIsVisible(!document.hidden);

        }


        document.addEventListener("visibilitychange", onVisibilityChange);

        // Cleanup
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    // statet som säger om page är synligt eller ej 
    return isVisible;
}
