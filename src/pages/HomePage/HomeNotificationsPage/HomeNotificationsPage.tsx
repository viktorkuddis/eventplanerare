
import styles from "./HomeNotificaationPage.module.css"

import { useContext } from "react"

import { AppContext } from "../../../context /AppContext"

import DOMPurify from 'dompurify';


const HomeNotificationsPage = () => {

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