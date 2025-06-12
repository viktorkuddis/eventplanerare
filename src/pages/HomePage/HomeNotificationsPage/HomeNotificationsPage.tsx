
import styles from "./HomeNotificaationPage.module.css"

import { useAuth } from "@clerk/clerk-react";

import { useContext, useEffect } from "react"

import { AppContext } from "../../../context/AppContext"

import { getAppSettingsFromLocalStorage, setAppSettingsToLocalStorage } from "../../../utils/localStorageUtils";

import DOMPurify from 'dompurify';




const HomeNotificationsPage = () => {

    const { userId } = useAuth()
    // const personalLocalStorageKey = `appSettings_${userId}`




    useEffect(() => {
        if (userId) {
            // Hämta senaste tid för när notifikationslistan öppnades
            const lastOpened = getAppSettingsFromLocalStorage(userId, "lastNotificationListOpened")
            console.log("senast öppnad:", lastOpened)
        }
        if (userId) {
            setAppSettingsToLocalStorage(userId, "lastNotificationListOpened", new Date().toISOString())
            console.log("satt datum: vid öppning av notificationspanelen")

        }

        return () => {
            // när komponenten stängs så sätter vi datum till local storage igen :)
            if (userId) {
                setAppSettingsToLocalStorage(userId, "lastNotificationListOpened", new Date().toISOString())
                console.log("satt datum: vid stängning av notificationspanelen")
            }
        };

    }, [userId])





    // // Spara senaste öppnade notifikationslistan (datum som sträng)
    // setAppSettingsToLocalStorage(userId, 'lastNotificationListOpened', new Date().toISOString())

    // // Hämta senaste tid för när notifikationslistan öppnades
    // const lastOpened = getAppSettingsFromLocalStorage(userId, 'lastNotificationListOpened')

    // console.log('Senast öppnade notifikationslistan:', lastOpened)





    const context = useContext(AppContext)

    return (
        <div className={styles.backdrop} >



            <div className={`content-container-width-wrapper ${styles.contentContainer}`}>

                <h2>Notifications</h2>
                <br />

                <div className={styles.notificationCardsContainer} >


                    {context?.notificationFeed.map((notification, i) => (
                        <div className={styles.notificationCard} key={i}>
                            <div className={styles.markContainer}>
                                <div className={styles.mark}></div>
                            </div>

                            <div className={styles.textContainer}>

                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notification.textAsHtml) }} />
                                <small> <p>{new Date(notification.date).toLocaleString('sv-SE', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</p></small>
                            </div>
                        </div>
                    ))}
                </div>




            </div>




        </div >
    )
}

export default HomeNotificationsPage