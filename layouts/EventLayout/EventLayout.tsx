import { UserButton } from '@clerk/clerk-react';
import styles from "./EventLayout.module.css";
import type { ReactNode } from 'react';

import { Home } from "react-feather";



type Props = {
    children?: ReactNode;
};
const EventLayout = ({ children }: Props) => {
    return (
        <>
            <div className={`${styles.pageWrapper}`}>

                <div className={`content-container-width-wrapper`}>
                    <header className={styles.header}>
                        <Home />



                        <div>{ }</div>
                        {/* <div> <small><mark>362 notis(er)</mark></small></div> */}

                        {/* <div className={styles.logoContainer}>
                        <h1>VADSKER?</h1>
                        <span><small><small>EVENTPLANERARE</small></small></span>
                    </div> */}


                        < UserButton />
                    </header >
                </div >
                <main>
                    {children}
                </main>
            </div>

        </>
    );
};
export default EventLayout




