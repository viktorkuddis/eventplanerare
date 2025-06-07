import styles from "./EventLayout.module.css";
import type { ReactNode } from 'react';

import { Home, Info, Settings } from "react-feather";



type Props = {
    children?: ReactNode;
};
const EventLayout = ({ children }: Props) => {
    return (
        <>
            <div className={styles.backdrop}>


                <div className={`${styles.pageWrapper}`}>


                    <header className={`${styles.headerWrapper}`}>
                        <div className={`${styles.header} content-container-width-wrapper`}>
                            <div className={styles.headerLeft}>
                                <button className={styles.homeButton}>
                                    <Home size={24} />
                                </button>

                            </div>
                            <div className={styles.headerMiddle}>
                                <div>Namn på eventet Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti voluptatem perspiciatis, debitis magnam dolorem ipsum fugit, sunt saepe architecto inventore sint a reprehenderit quibusdam tempore et fugiat ipsam excepturi.</div>

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




