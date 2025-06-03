// import { Outlet } from 'react-router-dom';

import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
import type { ReactNode } from 'react';


type Props = {
    children?: ReactNode;
};
const HomeLayout = ({ children }: Props) => {
    return (
        <>
            <div className="content-container-width-wrapper">
                <header className={styles.header}>


                    <div> <small><mark>362 notis(er)</mark></small></div>

                    <div className={styles.logoContainer}>
                        <h1>VADSKER?</h1>
                        <span><small><small>EVENTPLANERARE</small></small></span>
                    </div>


                    < UserButton />
                </header >
            </div >
            <main>
                {children}
            </main>


        </>
    );
};

export default HomeLayout;
