import Modal from "../../Modal/Modal"
import type { EventActivityType } from "../../../../types"

import { useAuth } from "@clerk/clerk-react"

import { Edit3 } from "react-feather";


import { AppContext } from "../../../../context/AppContext"
import { useContext } from "react"

type PropTypes = {
    item: EventActivityType
    isOpen: boolean
    onCloseAction: () => void
}



const ShowEventActivityInfo = ({ item, isOpen, onCloseAction }: PropTypes) => {

    const { userId } = useAuth()

    const appContext = useContext(AppContext)

    // hitta användaren bland deltagarna:
    const currentUserParticipant = appContext?.currentEventObjectDetailed?.eventParticipationsEnriched.find((ep) => ep.userId == userId)

    return (
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
                        <button className="btn-small btn-outlined-strong">
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <Edit3 size={"1rem"} />  <p>Ändra</p>
                            </div>

                        </button>
                    </div> : undefined
            }

            title={item.title}
            onCloseModal={onCloseAction}
            type={"standard"}
            size={"large"} >



            <div style={{ padding: "0 1rem" }} >
                <small>
                    <b>Start: </b>
                    {new Date(item.startTime).toLocaleDateString("sv-SE", {
                        day: "2-digit",
                        month: "short",
                    })} kl. {new Date(item.startTime).toTimeString().slice(0, 5)}
                    <br />
                    {item.endTime && (
                        <>
                            <b>Slut: </b>
                            {/* om annan dag: */}
                            {new Date(item.startTime).toDateString() !== new Date(item.endTime).toDateString() &&
                                new Date(item.endTime).toLocaleDateString("sv-SE", {
                                    day: "2-digit",
                                    month: "short",
                                }) + " "}
                            {/* tiden */}
                            kl. {new Date(item.endTime).toTimeString().slice(0, 5)}
                        </>
                    )}
                </small>


                {item.description &&
                    <p style={{ marginTop: "01rem", whiteSpace: "pre-line" }}>
                        {item.description}

                    </p>
                }






            </div>

        </Modal >
    )
}

export default ShowEventActivityInfo
