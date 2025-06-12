
import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { Outlet, useLocation, } from "react-router-dom";


import { useEffect, useRef, } from 'react';


import BellButton from '../src/components/molecules/BellButton/BellButton';



// type Props = {
//     children?: ReactNode;
// };
const HomeLayout = () => {
    const { pathname } = useLocation();








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
