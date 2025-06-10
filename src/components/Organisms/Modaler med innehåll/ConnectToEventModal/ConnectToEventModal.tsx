
import { useState } from 'react';
import Modal from '../../Modal/Modal'

import styles from "./ConnectToEventModal.module.css"

import { Search } from 'react-feather';
import { DotLoader } from 'react-spinners';

import { useDbApi } from "../../../../api/useDbApi";
import type { EventType } from '../../../../types';

import EventCard from '../../../molecules/EventCard';

import type { RequestType } from '../../../../types';
import { useAuth } from '@clerk/clerk-react';



type Props = {
    isOpen: boolean;
    onCloseModal: () => void;
};


const ConnectToEventModal = ({ isOpen, onCloseModal }: Props) => {


    const { userId } = useAuth();

    const [view, setView] = useState<"start" | "loading" | "result" | "confirmation">("start")
    const [connectionCode, setConnectionCode] = useState<string>("")
    const [foundEvent, setFoundEvent] = useState<EventType | null>(null);

    const [confirmationMessage, setConfirmationMessage] = useState("");



    const { getEventByConnectionCode, createNewRequest } = useDbApi()



    const handleSendRequest = async () => {
        console.log("vi försöker sända request");

        setView("loading")
        // Säkra att vi har all data som behövs
        if (foundEvent) {

            // Skapa dataobjektet för requesten
            const requestObject: RequestType = {
                from: {
                    userAuthId: ""
                },
                to: {
                    type: "event",
                    id: foundEvent._id
                },
                intention: 'joinEvent',
                relatedId: foundEvent._id,
                status: "pending"
            };

            try {
                // Skicka requesten och logga svaret vid lyckat försök
                const createdRequest = await createNewRequest(requestObject);
                console.log("Request skapad:", createdRequest);

                setView("confirmation")
                setConfirmationMessage("Förfrågan skickad!")


            } catch (error) {
                console.error("Fel vid request:", error);

                setView("confirmation")
                setConfirmationMessage(`Någont gick fel här. Sorry bro ☹️ `)

            }
        }




    }

    const handleSarch = async () => {
        console.log("connection code att söka efter: ", connectionCode)

        console.log("sökning klickades")
        setView("loading");
        setFoundEvent(null);



        const event = await getEventByConnectionCode(connectionCode);
        setFoundEvent(event);
        console.log("hittat event: ", event)
        setView('result');

    }

    const handleClose = () => {
        // nollställer alla states:
        setView("start");
        setConnectionCode("")
        setFoundEvent(null)
        setConfirmationMessage("")

        onCloseModal();
    };





    return (
        <Modal isOpen={isOpen}
            footerContent={null}
            title={"Anslut till event"}
            onCloseModal={handleClose}
            type={"standard"}
            size={'small'}>


            {view == "start" && <div className={`${styles.container}`}>
                <p style={{ textAlign: "center" }}> Skriv in eventets anslutningskod.</p>

                <input type="text" value={connectionCode} onChange={(e) => setConnectionCode(e.target.value.toLocaleLowerCase())} style={{ textTransform: "uppercase", letterSpacing: "0.05em" }} />

                <button className='btn-medium btn-filled-primary'
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                    onClick={handleSarch}>
                    <Search size={"1rem"} />Hitta event
                </button>




            </div >
            }

            {view == "loading" && <div className={`${styles.container}`}>

                <div style={{ height: "6rem" }}>
                    <DotLoader color="rgba(125, 125, 125, 0.5)"
                        cssOverride={{
                            margin: "0 auto",
                        }} />
                </div>

            </div >
            }

            {view == "result" && <div className={`${styles.container}`}>


                {foundEvent
                    ?

                    <>
                        <div style={{
                            color: "white",
                            cursor: "default !important",
                            // Detta inaktiverar alla mus-händelser (som klick) för alla element inuti.
                            pointerEvents: "none",
                        }}>
                            <EventCard color={foundEvent.color}
                                title={foundEvent.title}
                                start={foundEvent.start}
                                layout={'landscape'}
                                // location={foundEvent.location}
                                // description={foundEvent.description}
                                size={'small'}></EventCard>


                        </div>
                        <div style={{ textAlign: "center" }}>

                            {foundEvent.ownerUserAuthId == userId
                                ? <>Detta är ditt event!<br />Kan inte skicka förfrågan!</>
                                : <button onClick={() => handleSendRequest()} className='btn-medium btn-filled-primary'>Skicka förfrågan</button>
                                // TODO: Skriv något om man redan är medlem i eventet. kräver att vi letar genom alla partisipants.
                                // TODO: Skriv något om man har en liggande pending förfrågan. kräver att vi letar genom förfrågningar.

                            }


                        </div>
                        {/* 
                        {userId}
                        <br />
                        {foundEvent.ownerUserAuthId} */}


                    </>
                    :
                    <div>
                        <br />
                        <p style={{ textAlign: "center" }}>Gick inte att hitta något event med den anslutningskoden 😅</p>
                        <br />
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <button onClick={() => (setView("start"))} className='btn-medium btn-filled-primary' >Försök igen</button>

                            <button onClick={() => handleClose()} style={{ marginLeft: "0.5rem" }} className='btn-medium btn-outlined-primary'>stäng</button>
                        </div>


                    </div>}



            </div >
            }

            {view == "confirmation" && <div className={`${styles.container}`}>


                <p>{confirmationMessage}</p>



            </div >
            }


        </Modal >
    )
}

export default ConnectToEventModal