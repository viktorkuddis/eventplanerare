import { Outlet } from 'react-router-dom';

import styles from './HomeLayout.module.css';
import { UserButton } from '@clerk/clerk-react';
// import type { ReactNode } from 'react';

import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';



import { Bell } from 'react-feather';


// type Props = {
//     children?: ReactNode;
// };
const HomeLayout = () => {


    const navigate = useNavigate();
    const location = useLocation();

    const isNotificationPage = location.pathname.includes('/home/notifications');




    return (
        <>

            <div className={`${styles.headerBG}`}>
                <header className={`content-container-width-wrapper ${styles.header}`}>



                    <div style={{
                        position: "relative",
                        // backgroundColor: "blue"
                    }}> {/* Ta bort onClick härifrån om NavLink hanterar det */}

                        <NavLink
                            to={isNotificationPage ? `/home` : `/home/notifications`}
                            className={({ isActive }) =>
                                `btn-small btn-circle ${isActive && isNotificationPage ? "btn-filled-primary" : "btn-filled-strong"} ${styles.bellButton}`
                            }
                        // OBS: isNotificationPage kommer att vara true när vi navigerar TILL notifications,
                        // men isActive kommer att vara true NÄR vi ÄR PÅ notifications.
                        // Du kan förenkla className-logiken här.
                        >
                            <Bell size={"1.5rem"} />
                        </NavLink>


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
                <Outlet />
            </main>


        </>
    );
};

export default HomeLayout;
