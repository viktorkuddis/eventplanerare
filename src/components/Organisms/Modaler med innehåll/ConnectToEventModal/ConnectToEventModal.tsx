
import { useState } from 'react';
import Modal from '../../Modal/Modal'

import styles from "./ConnectToEventModal.module.css"

import { Search } from 'react-feather';
import { DotLoader } from 'react-spinners';

import { useDbApi } from "../../../../api/useDbApi";
import type { EventType } from '../../../../types';

import EventCard from '../../../molecules/EventCard';

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;
};





const ConnectToEventModal = ({ isOpen, onCloseModal }: Props) => {


    const [view, setView] = useState<"start" | "loading" | "result">("start")
    const [connectionCode, setConnectionCode] = useState<string>("")
    const [foundEvent, setFoundEvent] = useState<EventType | null>(null);


    const { getEventByConnectionCode } = useDbApi()

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
                            <button className='btn-medium btn-filled-primary'>Skicka förfrågan</button>

                        </div></>
                    :
                    <div>
                        <br />
                        <p style={{ textAlign: "center" }}>Gick inte att hitta något event med den aslutningskoden 😅</p>
                        <br />
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <button onClick={() => (setView("start"))} className='btn-medium btn-filled-primary' >Försök igen</button>

                            <button onClick={() => handleClose()} style={{ marginLeft: "0.5rem" }} className='btn-medium btn-outlined-primary'>stäng</button>
                        </div>


                    </div>}



            </div >
            }


        </Modal >
    )
}

export default ConnectToEventModal