
import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { useNavigate, Outlet, useLocation, } from "react-router-dom";


import { Bell } from 'react-feather';
import { useEffect, useRef, } from 'react';

import { useContext } from 'react';

import { AppContext } from '../src/context /AppContext';



// type Props = {
//     children?: ReactNode;
// };
const HomeLayout = () => {
    const { pathname } = useLocation();


    const context = useContext(AppContext)

    const navigate = useNavigate();



    // Kontrollera om 'view' parametern är satt till 'notifications'
    const isNotificationPage = useLocation().pathname
    // console.log(isNotificationPage)

    const siteContainerRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        // Scrolla hela fönstret till toppen
        // Sätt en liten timeout för att ge renderingen tid
        const timer = setTimeout(() => {
            if (siteContainerRef.current) {
                siteContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' }); // Använd options-objekt för tydlighet
            }
        }, 10); // Testa med 0ms, 10ms eller 50ms om det behövs






        // cleanup
        return () => clearTimeout(timer);

    }, [pathname]); // Tom array betyder att den körs en gång efter första renderingen av HomeLayout







    return (
        <>
            <div className={`${styles.siteContainer}`} ref={siteContainerRef}>
                <div className={`${styles.headerBG} ${styles.siteHeader}`}>
                    <header className={`content-container-width-wrapper ${styles.header}`}>



                        <div style={{
                            position: "relative",
                            // backgroundColor: "blue"
                        }}
                            onClick={() => {
                                if (isNotificationPage == "/home") {
                                    navigate(`/home/notifications`)
                                } else {
                                    navigate(`/home`)
                                }
                            }}>

                            <button
                                className={`btn-small btn-circle 
                            ${isNotificationPage == "/home" ? "btn-filled-strong" : "btn-filled-primary"}
                            ${styles.bellButton}`}>

                                <Bell size={"1.5rem"} />
                            </button>

                            {(context?.notificationFeed?.length || 0) > 0 && (
                                <div style={{
                                    backgroundColor: "red",
                                    fontSize: "0.75rem",
                                    width: "max-content",
                                    minWidth: "0.75rem",
                                    minHeight: "1rem",
                                    fontWeight: "Bold",
                                    borderRadius: "5rem",
                                    lineHeight: "1",
                                    padding: "0.25rem 0.5rem",
                                    position: "absolute",
                                    top: "5%",
                                    left: "55%"
                                }}>
                                    {context?.notificationFeed?.length}
                                </div>
                            )}


                        </div>

                        <div className={styles.logoContainer}
                            onClick={() => navigate(`/home`)}>
                            <h1>VADSKER?</h1>
                            <span><small><small>EVENTPLANERARE</small></small></span>
                        </div>

                        <UserButton />


                    </header >
                </div >
                <main className={`${styles.main} ${styles.siteMain}`}>
                    <Outlet />
                </main>
            </div >





        </>
    );
};

export default HomeLayout;
