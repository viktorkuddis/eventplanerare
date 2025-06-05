
import styles from "./EventCard.module.css"

import { MapPin } from "react-feather"


type Props = {
    color: string,
    title: string,
    start: Date,
    location?: string,
    description?: string,

    layout: "landscape" | "portrait",
    size: "large" | "small",

}
const EventCard = ({ color, title, start, location, description, layout, size }: Props) => {

    if (!color) color = "#80a6b6"

    const dateObject = new Date(start);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleDateString('sv-SE', { month: 'short' });



    return (
        <div className={`${styles.card} 
        ${layout == "landscape" && styles.cardLandScape} 
        ${layout == "portrait" && styles.cardPortrait}
        ${size == "small" && styles.small}`}
            style={{
                backgroundColor: color,
            }}>




            <div className={`${styles.dateStamp}`} >
                <div><b>{day}</b></div>
                <div>{month}</div>

            </div>

            <div className={`${styles.mainContainer}`} style={{
                filter: `drop-shadow(0px 0px 1rem color-mix(in srgb, ${color} 100%, black 20%))`,
                textShadow: `0 0 5px color-mix(in srgb, ${color} 100%, black 20%)`
            }}>


                <h3 className={`${styles.title}`}>
                    {title}
                </h3>

                {description && <small><p className={`${styles.description}`}>{description}</p></small>}



                {location &&
                    <div className={styles.locationSection}>
                        <MapPin size={"1rem"} className={styles.pinIcon} />

                        <small className={styles.locationText}>{location}</small>

                    </div>
                }
            </div>






        </div >
    )
}

export default EventCard