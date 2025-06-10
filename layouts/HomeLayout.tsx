import { Outlet } from 'react-router-dom';

import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { Bell } from 'react-feather';


// type Props = {
//     children?: ReactNode;
// };
const HomeLayout = () => {
    return (
        <>
            <div className={`${styles.headerBG}`}>
                <header className={`content-container-width-wrapper ${styles.header}`}>


                    <div style={{
                        position: "relative",
                        // backgroundColor: "blue"
                    }}>
                        <button className={`btn-small btn-circle btn-filled-strong ${styles.bellButton}`}>
                            <Bell size={"1.5rem"} />
                        </button>


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
                        }}>Jävligt många</div>



                    </div>

                    <div className={styles.logoContainer}>
                        <h1>VADSKER?</h1>
                        <span><small><small>EVENTPLANERARE</small></small></span>
                    </div>


                    < UserButton />
                </header >
            </div >
            <main>
                <Outlet />
            </main>


        </>
    );
};

export default HomeLayout;
