
import { useContext } from "react"
import { AppContext } from "../../context /AppContext"

import { Clock, MapPin } from "react-feather";

import styles from "./EntInformation.module.css"




const EventInformation = () => {
    const context = useContext(AppContext);

    // Formatera startdatumet
    const startDate = context?.currentEventObject?.start
        ? new Date(context.currentEventObject.start).toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short",
        })
        : null;

    const startTime = context?.currentEventObject?.start
        ? new Date(context.currentEventObject.start).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    const endDate = context?.currentEventObject?.end
        ? new Date(context.currentEventObject.end).toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short",
        })
        : null;

    const endTime = context?.currentEventObject?.end
        ? new Date(context.currentEventObject.end).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    return (
        <div className={styles.container}>
            <h2>{context?.currentEventObject?.title}</h2>



            <p><Clock size={"0.80rem"} /><small> {startDate} kl. {startTime}-{endDate} kl. {endTime}</small></p>

            {context?.currentEventObject?.location && <p><MapPin size={"0.80rem"} /><small> {context?.currentEventObject?.location} </small></p>}

            <p>{context?.currentEventObject?.description}</p>


            <p>Host:</p>
            <p>{context?.currentEventObject?.ownerUserAuthId}</p>
            {/* här hade varit najs att kunna säga vad användaren heter  */}



        </div>
    );
};

export default EventInformation