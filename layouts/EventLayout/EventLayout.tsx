


import styles from "./EventLayout.module.css";
import { useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from "react-router-dom";

import { Home, Info, Settings } from "react-feather";

import { AppContext } from "../../src/context /AppContext";
import { useParams } from "react-router-dom";


// TODO: SE TILL ATT LETA I DATABASEN SÅ ATT USER ID FINNS MED EN PACPISITPANT så att vi har access att hämta allt som detta eventet acdosieras med

type Props = {
    children?: ReactNode;
};
const EventLayout = ({ children }: Props) => {

    const { eventId } = useParams();
    console.log(eventId)

    const context = useContext(AppContext)

    console.log(context?.currentEventObject)

    const navigate = useNavigate()




    useEffect(() => {

        if (context?.allEvents) {
            // Leta efter eventet att sätta som aktuellt eventobjekt. null om inte hittat
            const eventObject = context.allEvents.find(e => e._id === eventId) ?? null;
            context.setCurrentEventObject(eventObject)
        }


    }, [context, context?.allEvents, eventId]);
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




