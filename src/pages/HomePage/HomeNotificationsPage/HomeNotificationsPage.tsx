
import styles from "./HomeNotificaationPage.module.css"

// import { useAuth } from "@clerk/clerk-react";

import { useContext, useEffect, useState } from "react"

import { AppContext } from "../../../context/AppContext"

import { useNavigate } from "react-router-dom";

import { getAppSettingsFromLocalStorage, setAppSettingsToLocalStorage } from "../../../utils/localStorageUtils";

import DOMPurify from 'dompurify';

import { useAuth } from "@clerk/clerk-react";


const HomeNotificationsPage = () => {


    const navigate = useNavigate()
    const { userId } = useAuth()


    const [lastOpened, setLastOpened] = useState<Date>(new Date("2000-01-01T00:00:00Z"));
    const [showFirstTimeMessage, setShowFirstTimeMessage] = useState(false)


    // dessa två ska köras efter varandra OOOO BBBBSSSS SSS 

    useEffect(() => {
        if (!userId) return;

        const senasteÖppnad = getAppSettingsFromLocalStorage(userId, "lastNotificationListOpened");
        setLastOpened(senasteÖppnad);
        if (!senasteÖppnad) setShowFirstTimeMessage(true)

        console.log("hämtad tid;", senasteÖppnad);

        // sätter ny tid
        const timeout = setTimeout(() => {
            const newTime = new Date().toISOString();
            setAppSettingsToLocalStorage(userId, "lastNotificationListOpened", newTime);
            console.log("satt tid;", newTime);
        }, 1000); // vänta 1 sek för att undvika göra om de rerender massa.

        return () => clearTimeout(timeout); // rensa om komponenten tas bort snabbt
    }, [userId]);






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
                {showFirstTimeMessage && <p style={{ textAlign: "center" }}>

                    <strong>👋</strong>{' '}
                    <strong style={{ opacity: 0.7 }}>Välkommen till Notiscenter!</strong>
                    <br />
                    <span style={{ opacity: 0.7 }}>Här dyker dina notiser upp!</span>
                    <br />
                    <br />
                </p>}



                <div className={styles.notificationCardsContainer} >


                    {context?.notificationFeed.map((notification, i) => {




                        return (
                            <div className={styles.notificationCard} key={i} onClick={() => navigate(notification.url)}>


                                <div className={styles.markContainer}>
                                    {showFirstTimeMessage
                                        ? <div className={styles.mark}></div>
                                        : new Date(lastOpened) > new Date(notification.date)
                                            ?
                                            <div></div>
                                            : <div className={styles.mark}></div>}
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
                            </div>)
                    }
                    )}
                </div>




            </div>




        </div >
    )
}

export default HomeNotificationsPage