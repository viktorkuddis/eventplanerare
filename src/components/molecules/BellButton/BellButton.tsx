import { useLocation, useNavigate } from "react-router-dom"
import { Bell } from 'react-feather';
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";


import styles from "./BellButton.module.css"


const BellButton = () => {


    const context = useContext(AppContext)


    const navigate = useNavigate();

    // Kontrollera om 'view' parametern är satt till 'notifications'
    const isNotificationPage = useLocation().pathname
    // console.log(isNotificationPage)


    return (
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
    )
}

export default BellButton