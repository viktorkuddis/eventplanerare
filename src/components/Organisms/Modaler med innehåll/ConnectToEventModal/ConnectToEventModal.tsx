
import { useState } from 'react';
import Modal from '../../Modal/Modal'

import styles from "./ConnectToEventModal.module.css"

import { Search } from 'react-feather';
import { DotLoader } from 'react-spinners';

// import { useDbApi } from "../../../../api/useDbApi";
// import type { EventType } from '../../../../types';

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;
};





const ConnectToEventModal = ({ isOpen, onCloseModal }: Props) => {


    const [view, setView] = useState<"start" | "loading" | "result">("start")
    const [connectionCode, setConnectionCode] = useState<string>("")
    // const [foundEvent, setFoundEvent] = useState<EventType | null>(null);


    // const { getEventByConnectionCode } = useDbApi()

    const handleSarch = async () => {

        console.log("sökning klickades")
        setView("loading");
        // setFoundEvent(null);



        // const event = await getEventByConnectionCode(connectionCode);
        // setFoundEvent(event);

        setView('result');

    }

    const handleClose = () => {
        setView("start");
        onCloseModal();
    };





    return (
        <Modal isOpen={isOpen}
            footerContent={null}
            title={"Anslut till event"}
            onCloseModal={handleClose}
            type={"standard"}
            size={'large'}>


            {view == "start" && <div className={`${styles.container}`}>
                <p> Skriv in eventets anslutningskod.</p>

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


        </Modal >
    )
}

export default ConnectToEventModal