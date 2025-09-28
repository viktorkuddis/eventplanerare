import Modal from "../../Modal/Modal"
import type { EventActivityType } from "../../../../types"

type PropTypes = {
    item: EventActivityType
    isOpen: boolean
    onCloseAction: () => void
}



const ShowEventActivityInfo = ({ item, isOpen, onCloseAction }: PropTypes) => {





    return (
        <Modal isOpen={isOpen}

            footerContent={undefined}
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
                    })}, kl. {new Date(item.startTime).toTimeString().slice(0, 5)}
                    <br />
                    {item.endTime && (
                        <>
                            <b>Slut: </b>
                            {/* om annan dag: */}
                            {new Date(item.startTime).toDateString() !== new Date(item.endTime).toDateString() &&
                                new Date(item.endTime).toLocaleDateString("sv-SE", {
                                    day: "2-digit",
                                    month: "short",
                                }) + ", "}
                            {/* tiden */}
                            kl. {new Date(item.endTime).toTimeString().slice(0, 5)}
                        </>
                    )}
                </small>


                {item.description &&
                    <p style={{ marginTop: "0.5rem" }}>
                        {item.description}

                    </p>
                }


            </div>

        </Modal >
    )
}

export default ShowEventActivityInfo
