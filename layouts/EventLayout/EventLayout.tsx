


import styles from "./EventLayout.module.css";
import { useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from "react-router-dom";

import { Home, Info, Settings } from "react-feather";

import { AppContext } from "../../src/context /AppContext";
import { useParams } from "react-router-dom";

import { useDbApi } from "../../src/api/useDbApi";


// TODO: SE TILL ATT LETA I DATABASEN SÅ ATT USER ID FINNS MED EN PACPISITPANT så att vi har access att hämta allt som detta eventet asosieras med. vi kan göra de i rutten där vi ber om hela eventdetails.  just nu gör vi inte detta.

type Props = {
    children?: ReactNode;
};
const EventLayout = ({ children }: Props) => {

    const { eventId } = useParams();

    console.log(eventId)

    const context = useContext(AppContext)

    console.log(context?.currentEventObject)

    const navigate = useNavigate()
    const { getEventDetailsById } = useDbApi();

    // kollar om den redan finns i kontexten isåfall kan vi temporärt nu sätta den som aktuellt event tills vi laddat från databasen.




    useEffect(() => {

        const eventFoundInContext = context?.eventObjectsDetailed?.find(e => e.event._id == eventId)
        if (eventFoundInContext) {
            context?.setCurrentEventObjectsDetailed(eventFoundInContext)
            console.log("😎eventet fanns i contexten. sätter tillfälligt till current event tills svar från databasen eventuellt skriver över")
        }
        // ÅÅ VI HÄMTAR OBJEKTET från databasen :) Vi vill alltid hämta nytt från databasen när denne sidan laddas 
        if (eventId) {
            getEventDetailsById(eventId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);




    return (
        <>
            <div className={styles.backdrop}>


                <div className={`${styles.pageWrapper}`}>


                    <header className={`${styles.headerWrapper}`}>
                        <div className={`${styles.header} content-container-width-wrapper`}>
                            <div className={styles.headerLeft}>
                                <button className={styles.homeButton} onClick={() => navigate("/")}>
                                    <Home size={24} />
                                </button>

                            </div>
                            <div className={styles.headerMiddle}>


                                <div>{context?.currentEventObject?.title}</div>

                            </div>
                            <div className={styles.headerRight}>

                                <button className=" btn-small btn-circle btn-filled-light-static">
                                    <div style={{ height: "1.25rem", aspectRatio: "1/1" }}>
                                        <Info size={"1.25rem"} />
                                    </div>
                                </button>

                                <button className="btn-small btn-circle btn-filled-light-static">
                                    <div style={{ height: "1.25rem", aspectRatio: "1/1" }}>
                                        <Settings size={"1.25rem"} />
                                    </div>

                                </button>


                            </div>
                        </div>

                    </header >
                    <main>
                        {children}



                    </main>
                </div >
            </div>


            {/* </div > */}

        </>
    );
};
export default EventLayout




