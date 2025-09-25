
import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { Outlet, useLocation, } from "react-router-dom";


import { useEffect, useRef, } from 'react';


import BellButton from '../src/components/molecules/BellButton/BellButton';

import usePollNotifications from "../hooks/usePollNotifications";

const HomeLayout = () => {
    const { pathname } = useLocation();

    usePollNotifications()


    const siteContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scrolla hela fönstret till toppen
        // Sätt en liten timeout för att ge renderingen tid
        const timer = setTimeout(() => {
            if (siteContainerRef.current) {
                siteContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        }, 10);

        return () => clearTimeout(timer);

    }, [pathname]);



    return (
        <>
            <div className={`${styles.siteContainer}`} ref={siteContainerRef}>
                <div className={`${styles.headerBG} ${styles.siteHeader}`}>
                    <header className={`content-container-width-wrapper ${styles.header}`}>


                        <BellButton />


                        <div className={styles.logoContainer}>
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
