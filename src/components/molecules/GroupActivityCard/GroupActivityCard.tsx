import { AppContext } from "../../../context/AppContext";
import { useContext, useState } from "react";


// import type { EventActivityType } from "../../../types";
import ShowEventActivityInfo from "../../Organisms/EventActivity/ShowEventActivityInfo/ShowEventActivityInfo";




type Props = {
    itemId: string
}


function GroupActivityCard({ itemId }: Props) {

    const [showEventActivityInfo, setShowEventActivityInfo] = useState(false)
    // const [activeItem, setActiveItem] = useState<EventActivityType>()

    const context = useContext(AppContext);

    const currentItem = context?.currentEventObjectDetailed?.eventActivities.find(item => item._id == itemId)

    const handleOpenEventActvityModal = () => {
        console.log("modal ska Öppnas")
        setShowEventActivityInfo(true)
    }
    return (<>

        {currentItem && <ShowEventActivityInfo
            itemId={itemId}
            isOpen={showEventActivityInfo}
            onCloseAction={() => setShowEventActivityInfo(false)}
        />}

        {currentItem &&
            <div style={{
                backgroundColor: context?.currentEventObjectDetailed?.event.color,
                color: "white",
                borderRadius: "0.25rem",
                padding: "0.5rem",
                margin: "0.5rem 1rem",
                border: "1px, solid white"
            }}
                onClick={() => handleOpenEventActvityModal()}>

                <small>
                    {new Date(currentItem.startTime).toTimeString().slice(0, 5)}
                    {currentItem.endTime && (
                        <>
                            {"-"}
                            {/* om annan dag: */}
                            {new Date(currentItem.startTime).toDateString() !== new Date(currentItem.endTime).toDateString() &&
                                new Date(currentItem.endTime).toLocaleDateString("sv-SE", {
                                    day: "2-digit",
                                    month: "short",
                                }) + " "}
                            {/* tiden */}
                            {new Date(currentItem.endTime).toTimeString().slice(0, 5)}
                        </>
                    )}

                </small>
                <br />

                <h3>{currentItem.title}</h3>
                <p>{currentItem.description}</p>
            </div>}
    </>




    )
}

export default GroupActivityCard
