import { AppContext } from "../../../context/AppContext";
import { useContext, } from "react";

import styles from "./DateBanner.module.css"

import type { DateBannerType } from "../../../types";


import { backgroundColorMixLight } from "../../../utils/colorMix.utils";


type Props = {
    item: DateBannerType
}



function DateBanner({ item }: Props) {

    const context = useContext(AppContext);
    return (
        <div className={`${styles.dateBanner}`}
            style={{
                backgroundColor: `${context?.currentEventObjectDetailed?.event.color ? backgroundColorMixLight(context?.currentEventObjectDetailed?.event.color) : "white"}`,
                boxShadow: `0 -0.1rem 0.2rem ${context?.currentEventObjectDetailed?.event.color ? backgroundColorMixLight(context?.currentEventObjectDetailed?.event.color) : "white"}`
            }}>
            <small>
                {new Date(item.startTime).toLocaleDateString("sv-SE", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                })}
            </small>



        </div>
    )
}

export default DateBanner
