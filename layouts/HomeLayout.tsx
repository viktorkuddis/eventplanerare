import { useSearchParams } from 'react-router-dom';

import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { useNavigate } from "react-router-dom";

import HomeNotificationsPage from '../src/pages/HomePage/HomeNotificationsPage/HomeNotificationsPage';
import Home from '../src/pages/HomePage/Home';

import { Bell } from 'react-feather';


// type Props = {
//     children?: ReactNode;
// };
const HomeLayout = () => {


    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams(); // Hämta och sätt search params

    // Kontrollera om 'view' parametern är satt till 'notifications'
    const isNotificationPage = searchParams.get('view') === 'notifications';
    console.log(isNotificationPage)



    return (
        <>

            <div className={`${styles.headerBG}`}>
                <header className={`content-container-width-wrapper ${styles.header}`}>



                    <div style={{
                        position: "relative",
                        // backgroundColor: "blue"
                    }}
                        onClick={() => {
                            if (isNotificationPage) {
                                setSearchParams({});
                            } else {
                                setSearchParams({ view: 'notifications' });
                            }
                        }}>

                        <button
                            className={`btn-small btn-circle 
                            ${isNotificationPage ? "btn-filled-primary" : "btn-filled-strong"} 
                            ${styles.bellButton}`}>

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

                    <div className={styles.logoContainer}
                        onClick={() => navigate(`/home`)}>
                        <h1>VADSKER?</h1>
                        <span><small><small>EVENTPLANERARE</small></small></span>
                    </div>

                    < UserButton />


                </header >
            </div >
            <main>
                {/* Villkorlig rendering baserad på query-parameter */}
                {isNotificationPage ? (
                    <HomeNotificationsPage />// Eller din Home-kompone
                ) : (

                    <Home />
                )}
                {/* Outlet behövs inte längre om du renderar Home/Notifications direkt här */}
            </main>



        </>
    );
};

export default HomeLayout;
