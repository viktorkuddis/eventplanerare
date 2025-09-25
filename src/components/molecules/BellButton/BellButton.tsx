import { useLocation, useNavigate } from "react-router-dom"
import { Bell } from 'react-feather';
import { useContext } from "react";
import { NotificationContext } from "../../../context/NotificationContext";

import styles from "./BellButton.module.css"


import { getAppSettingsFromLocalStorage } from "../../../utils/localStorageUtils";


//todo:
// jämför senaste notifikationen och se om dess datum är nyare än då jag öppnade panelen senas. 
//  om den är nyare så visas plupp och siffra. 
//  om den är ädre visas ingen plupp och siffra
// om det inte finns någon datum i localstorage då vsas tom plupp utan siffra.

import { useAuth } from "@clerk/clerk-react";


const BellButton = () => {
    const notificationContext = useContext(NotificationContext)

    const { userId } = useAuth();

    // hämtar när man senast öppnade
    let lastOpendDate;
    if (userId) {
        lastOpendDate = getAppSettingsFromLocalStorage(userId, "lastNotificationListOpened")
    }
    let showNotificationIndicator;
    if (lastOpendDate && notificationContext?.notificationFeed[0]?.date) {
        const lastDate = new Date(lastOpendDate);
        // console.log("panelen var senast öppen", lastDate)

        const newestNotificationDate = new Date(notificationContext.notificationFeed[0].date);
        // console.log("senaste notifikationen:", newestNotificationDate)

        // sätt true om man ligger efter med att titta på notifikationerna
        showNotificationIndicator = lastDate < newestNotificationDate ? true : false
    }

    // console.log("showNotificationIndicator", showNotificationIndicator)

    const navigate = useNavigate();

    // Kontrollera om 'view' parametern är satt till 'notifications'
    const isNotificationPage = useLocation().pathname
    // console.log(isNotificationPage)


    // om lastOpendd date kommer undefined från localstorage betyder det att användaren aldrig klickat där.
    // då sätter vi en idikator ändå :) så att den klickar där för första gången oavsett om den har notiser eller inte. 
    // i notiskomponenten sen sätter vi en liten välkomsttext  om de är så att användaren är ny.

    if (!lastOpendDate) showNotificationIndicator = true;

    return (
        <div style={{
            position: "relative",
            // backgroundColor: "blue"
        }}
            onClick={() => {
                if (isNotificationPage == "/home") {
                    navigate(`/home/notifications`)
                } else {
                    navigate(`/home`)
                }
            }}>


            <button
                className={`btn-small btn-circle 
                            ${isNotificationPage == "/home" ? "btn-filled-strong" : "btn-filled-primary"}
                            ${styles.bellButton}`}>

                <Bell size={"1.5rem"} />
            </button>

            {showNotificationIndicator && (
                <div style={{
                    backgroundColor: "red",
                    fontSize: "0.75rem",
                    width: "max-content",
                    minWidth: "0.75rem",
                    minHeight: "1rem",
                    fontWeight: "Bold",
                    borderRadius: "5rem",
                    lineHeight: "1",
                    padding: "0.25rem 0.5rem",
                    position: "absolute",
                    top: "5%",
                    left: "55%"
                }}>
                </div>
            )}


        </div>
    )
}

export default BellButton