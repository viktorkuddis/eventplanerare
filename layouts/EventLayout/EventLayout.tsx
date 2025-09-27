


import styles from "./EventLayout.module.css"
import { useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from "react-router-dom";

import { Home, Info, Settings, User, Users, Plus } from "react-feather";

import { AppContext } from "../../src/context/AppContext";
import { useParams } from "react-router-dom";

import { useDbApi } from "../../src/api/useDbApi";

import { useAuth } from "@clerk/clerk-react";

import { textColorMixVibrant, backgroundColorMixLight } from "../../src/utils/colorMix.utils";

import AddNewPersonalActivityModal from "../../src/components/Organisms/AddNewPersonalActivityForm/AddNewPersonalActivityModal";
import AddNewEventActivityFormModal from "../../src/components/Organisms/AddEventActivityForm/AddNewEventActivityFormModal";


type Props = {
    children?: ReactNode;
};
const EventLayout = ({ children }: Props) => {

    const { eventId } = useParams();

    const { userId } = useAuth()

    console.log("eventid:", eventId)

    const context = useContext(AppContext)


    const navigate = useNavigate()
    const { getEventDetailsById } = useDbApi();

    // kollar om den redan finns i kontexten isåfall kan vi temporärt nu sätta den som aktuellt event tills vi laddat från databasen.




    useEffect(() => {

        const eventFoundInContext = context?.eventObjectsDetailed?.find(e => e.event._id == eventId)

        if (eventFoundInContext) {
            context?.setCurrentEventObjectsDetailed(eventFoundInContext)
            console.log("😎eventet fanns i contexten. sätter tillfälligt till current event tills svar från databasen eventuellt skriver över")
        } else {
            context?.setCurrentEventObjectsDetailed(null)
        }

        // ÅÅ VI HÄMTAR OBJEKTET från databasen :) Vi vill alltid hämta nytt från databasen när denne sidan laddas 
        if (eventId) {
            getEventDetailsById(eventId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);




    // skapar textfärg om de finns någon 
    const textColorVibrant = context?.currentEventObjectDetailed?.event.color ? textColorMixVibrant(context?.currentEventObjectDetailed?.event.color) : "black"




    // skapar bakgrundsfärge om de finns
    const backgroundColor = context?.currentEventObjectDetailed?.event.color ? backgroundColorMixLight(context?.currentEventObjectDetailed?.event.color) : "white"
    // let textColor;



    const [createPersonalActivityModalIsOpen, setCreatePersonalActivityModalIsOpen] = useState(false)
    const [addNewEventActivityFormModalIsOpen, setAddNewEventActivityFormIsOpen] = useState(false)




    return (
        <>

            <AddNewPersonalActivityModal
                isOpen={createPersonalActivityModalIsOpen}
                onClose={async () => {
                    setCreatePersonalActivityModalIsOpen(false)
                    const newEventDetails = await getEventDetailsById(context?.currentEventObjectDetailed?.event._id as string)
                    if (newEventDetails) context?.setCurrentEventObjectsDetailed(newEventDetails)
                }}
            />
            <AddNewEventActivityFormModal
                isOpen={addNewEventActivityFormModalIsOpen}
                onClose={
                    async () => {
                        setAddNewEventActivityFormIsOpen(false)
                        const newEventDetails = await getEventDetailsById(context?.currentEventObjectDetailed?.event._id as string)
                        if (newEventDetails) context?.setCurrentEventObjectsDetailed(newEventDetails)
                    }
                } />





            <div className={styles.backdrop} style={{
                backgroundColor: backgroundColor
            }}>

                <div className={`${styles.pageWrapper}`}>


                    <header className={`${styles.headerWrapper}`}>
                        <div className={`${styles.header} content-container-width-wrapper`}>
                            <div className={styles.headerLeft}>
                                <button className={`btn-small btn-circle btn-filled-light-static ${styles.homeButton}`} onClick={() => navigate("/")}>
                                    <Home size={"1.75rem"} />
                                </button>

                            </div>
                            <div className={styles.headerMiddle} style={{
                                color: textColorVibrant,
                            }}>


                                <div><b>{context?.currentEventObjectDetailed?.event.title}</b></div>
                            </div>
                            <div className={styles.headerRight}>

                                <button className=" btn-small btn-circle btn-filled-light-static">
                                    <div style={{ height: "1.5rem", aspectRatio: "1/1", display: "grid", placeItems: "center" }}>
                                        <Info size={"1.25rem"} />
                                    </div>
                                </button>

                                <button className="btn-small btn-circle btn-filled-light-static">
                                    <div style={{ height: "1.5rem", aspectRatio: "1/1", display: "grid", placeItems: "center" }}>
                                        <Settings size={"1.25rem"} />
                                    </div>

                                </button>


                            </div>
                        </div>

                    </header >
                    <main>
                        {children}




                    </main>

                    {context?.currentEventObjectDetailed &&
                        <>
                            <div className={`${styles.buttonGroup} content-container-width-wrapper`}

                                style={{
                                    background: `linear-gradient(to top, ${backgroundColor} 50%, transparent 100%)`,
                                    width: "100%"
                                }}

                            >

                                {/* om användaren är registrerad som värd i evenemanget får den knapp för gruppaktivitet. */}
                                {userId == context?.currentEventObjectDetailed.eventParticipationsEnriched.find((p) => p.role == "host")?.userId
                                    ?

                                    <button className="btn-medium btn-filled-light-static" onClick={() => setAddNewEventActivityFormIsOpen(true)}>
                                        <Plus size={"1rem"} /><Users size={"1rem"} /> <p>Gruppaktivitet</p>
                                    </button>

                                    :
                                    false}

                                <button className="btn-medium btn-filled-primary" onClick={() => setCreatePersonalActivityModalIsOpen(true)}>
                                    <Plus size={"1rem"} /><User size={"1rem"} /><p>Egen aktivitet</p>
                                </button>

                            </div>
                            {/* Denna backdrop läggs längst bak i dokumentet för att uundvika att användaren skrollar bram bodyn som är av annan färg på mobila enheter */}
                            <div className={styles.buttonGroupBackDrop}

                                style={{
                                    background: backgroundColor,

                                }}></div></>

                    }




                </div>
            </div >


            {/* </div > */}

        </>
    );
};
export default EventLayout




