import { AppContext } from "../../../context/AppContext";
import { useContext, useState } from "react";


import type { EventActivityType } from "../../../types";
import ShowEventActivityInfo from "../../Organisms/EventActivity/ShowEventActivityInfo/ShowEventActivityInfo";




type Props = {
    item: EventActivityType
}


function GroupActivityCard({ item }: Props) {

    const [showEventActivityInfo, setShowEventActivityInfo] = useState(false)
    const [activeItem, setActiveItem] = useState<EventActivityType>()

    const context = useContext(AppContext);


    const handleOpenEventActvityModal = (item: EventActivityType) => {
        console.log("modal ska Öppnas")
        setActiveItem(item)
        setShowEventActivityInfo(true)
    }
    return (<>

        {activeItem && <ShowEventActivityInfo
            item={activeItem}
            isOpen={showEventActivityInfo}
            onCloseAction={() => setShowEventActivityInfo(false)}
        />}


        <div style={{
            backgroundColor: context?.currentEventObjectDetailed?.event.color,
            color: "white",
            borderRadius: "0.25rem",
            padding: "0.5rem",
            margin: "0.5rem 1rem",
            border: "1px, solid white"
        }}
            onClick={() => handleOpenEventActvityModal(item)}>

            <small>
                {new Date(item.startTime).toTimeString().slice(0, 5)}
                {item.endTime && (
                    <>
                        {"-"}
                        {/* om annan dag: */}
                        {new Date(item.startTime).toDateString() !== new Date(item.endTime).toDateString() &&
                            new Date(item.endTime).toLocaleDateString("sv-SE", {
                                day: "2-digit",
                                month: "short",
                            }) + " "}
                        {/* tiden */}
                        {new Date(item.endTime).toTimeString().slice(0, 5)}
                    </>
                )}

            </small>
            <br />

            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
    </>




    )
}

export default GroupActivityCard
