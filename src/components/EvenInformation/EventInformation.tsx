
import { useContext } from "react"
import { AppContext } from "../../context /AppContext"

import { Clock, MapPin } from "react-feather";

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



            <p><Clock size={"0.80rem"} /><small> {startDate} kl. {startTime}-{endDate} kl. {endTime}</small></p>

            {context?.currentEventObjectDetailed?.event.location && <p><MapPin size={"0.80rem"} /><small> {context?.currentEventObjectDetailed?.event.location} </small></p>}

            <p>{context?.currentEventObjectDetailed?.event.description}</p>


            <p>Host:</p>
            <p>{context?.currentEventObjectDetailed?.event.ownerUserAuthId}</p>
            {/* här hade varit najs att kunna säga vad användaren heter  */}



        </div>
    );
};

export default EventInformation