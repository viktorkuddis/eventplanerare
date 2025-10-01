import Modal from "../../Modal/Modal"
import type { EventObjectsDetailedType } from "../../../../types"

import { useAuth } from "@clerk/clerk-react"

import { Edit3 } from "react-feather";


import { AppContext } from "../../../../context/AppContext"
import { useContext, useState } from "react"


import AddNewEventActivityFormModal from "../AddEventActivityForm/AddNewEventActivityFormModal";
import { useDbApi } from "../../../../api/useDbApi";

type PropTypes = {
    itemId: string
    isOpen: boolean
    onCloseAction: () => void
}



const ShowEventActivityInfo = ({ itemId, isOpen, onCloseAction }: PropTypes) => {

    const { userId } = useAuth()
    const { getEventDetailsById } = useDbApi();


    const appContext = useContext(AppContext)

    // hitta användaren bland deltagarna:
    const currentUserParticipant = appContext?.currentEventObjectDetailed?.eventParticipationsEnriched.find((ep) => ep.userId == userId)


    const [showEditForm, setShowEditForm] = useState(false)

    // const [itemToDisplay, setItemToDisplay] = useState<EventActivityType>(item)

    function handleOpenEditForm() {
        console.log("vill ändra")
        setShowEditForm(true)
    }


    const itemToDisplay = appContext?.currentEventObjectDetailed?.eventActivities.find(item => item._id == itemId)

    // const itemToDispaly = appContext?.currentEventObjectDetailed?.eventActivities.find(a => a._id === item._id) || item;

    return (<>
        {itemToDisplay &&
            <Modal isOpen={isOpen}

                footerContent={
                    currentUserParticipant?.role == "host"

                        ? <div style={{
                            // background: "green",
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "1rem",
                            marginRight: "0.5rem"
                        }}>
                            <button className="btn-small btn-outlined-strong"
                                onClick={handleOpenEditForm}>

                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <Edit3 size={"1rem"} />  <p>Ändra</p>
                                </div>

                            </button>
                        </div> : undefined
                }

                title={itemToDisplay.title}
                onCloseModal={onCloseAction}
                type={"standard"}
                size={"large"} >



                <div style={{ padding: "0 1rem" }} >
                    <small>
                        <b>Start: </b>
                        {new Date(itemToDisplay.startTime).toLocaleDateString("sv-SE", {
                            day: "2-digit",
                            month: "short",
                        })} kl. {new Date(itemToDisplay.startTime).toTimeString().slice(0, 5)}
                        <br />
                        {itemToDisplay.endTime && (
                            <>
                                <b>Slut: </b>
                                {/* om annan dag: */}
                                {new Date(itemToDisplay.startTime).toDateString() !== new Date(itemToDisplay.endTime).toDateString() &&
                                    new Date(itemToDisplay.endTime).toLocaleDateString("sv-SE", {
                                        day: "2-digit",
                                        month: "short",
                                    }) + " "}
                                {/* tiden */}
                                kl. {new Date(itemToDisplay.endTime).toTimeString().slice(0, 5)}
                            </>
                        )}
                    </small>


                    {itemToDisplay.description &&
                        <p style={{ marginTop: "01rem", whiteSpace: "pre-line" }}>
                            {itemToDisplay.description}

                        </p>
                    }






                </div>

            </Modal >
        }


        <AddNewEventActivityFormModal
            isOpen={showEditForm}
            isEditing={true}
            itemId={itemId}
            onClose={async () => {
                setShowEditForm(false)
                const newEventDetails = await getEventDetailsById(appContext?.currentEventObjectDetailed?.event._id as string)
                if (newEventDetails) {

                    appContext?.setCurrentEventObjectsDetailed((prev: EventObjectsDetailedType | null) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            eventActivities: newEventDetails.eventActivities.map(a => ({ ...a }))
                        }
                    });



                }

            }
            }
        />
    </>
    )
}

export default ShowEventActivityInfo
