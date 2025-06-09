
import { useContext } from "react"
import { AppContext } from "../../context /AppContext"

import { Calendar, MapPin } from "react-feather";

import styles from "./EntInformation.module.css"




const EventInformation = () => {
    const context = useContext(AppContext);

    // Formatera startdatumet
    const startDate = context?.currentEventObjectDetailed?.event.start
        ? new Date(context?.currentEventObjectDetailed.event.start).toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short",
        })
        : null;

    const startTime = context?.currentEventObjectDetailed?.event.start
        ? new Date(context?.currentEventObjectDetailed.event.start).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    const endDate = context?.currentEventObjectDetailed?.event.end
        ? new Date(context?.currentEventObjectDetailed.event.end).toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short",
        })
        : null;

    const endTime = context?.currentEventObjectDetailed?.event.end
        ? new Date(context?.currentEventObjectDetailed.event.end).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    return (
        <div className={styles.container}>
            <h2>{context?.currentEventObjectDetailed?.event.title}</h2>




            <small>
                <p><Calendar size={"0.80rem"} /> {startDate} kl. {startTime} - {endDate} kl. {endTime}</p>

                {context?.currentEventObjectDetailed?.event.location && <p><MapPin size={"0.80rem"} /> {context?.currentEventObjectDetailed?.event.location} </p>}


            </small>

            <small>
                <div>Värd:
                    <br />
                    {context?.currentEventObjectDetailed?.eventParticipationsEnriched.map((item, i) => item.role == "host"
                        && <span key={i} > {item.user.firstName} {item.user.lastName}

                            <span className={styles.userNameTag}> @{item.user.username}</span>
                        </span>)}


                </div ></small>
            <p>{context?.currentEventObjectDetailed?.event.description}</p>







            <p></p>
            {/* här hade varit najs att kunna säga vad användaren heter  */}



        </div >
    );
};

export default EventInformation