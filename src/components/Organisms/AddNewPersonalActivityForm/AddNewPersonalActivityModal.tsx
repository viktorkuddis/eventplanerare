
import { useState } from "react";
import Modal from "../Modal/Modal"

import styles from "./AddNewPersonalActivityModal.module.css"



const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
};




const AddNewPersonalActivityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {





    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [extraInfo, setExtraInfo] = useState("");



    const handleCancel = () => {
        setTitle("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setExtraInfo("");

        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()

        setTitle("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setExtraInfo("");


        onClose();
    };

    return (



        <Modal isOpen={isOpen}

            footerContent={<div className={`${styles.footer}`}>
                <button type="button" className="btn-medium btn-outlined-primary" onClick={handleCancel}
                >
                    Avbryt
                </button>
                <button type="submit" form="add-activity-form" className="btn-medium btn-filled-primary">
                    Skapa
                </button>
            </div>}
            title={"Lägg till egen aktivitet"}
            onCloseModal={onClose}
            type={"drawer"}
            size={"small"}>

            <div className={`${styles.contentContainer}`}>
                <form id="add-activity-form" onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}>

                    <div className={`${styles.inputGroup}`}>
                        <label>Vad tänker du göra? *</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>


                    <div className={`${styles.inputGroup}`}>
                        <label>När? *</label>
                        <div className={`${styles.whenSection}`}>

                            <button type="button" className={`btn-small btn-outlined-primary`}
                                onClick={() => {
                                    setStartDate(getTodayDate())
                                }}>
                                IDAG</button>
                            <button type="button" className={`btn-small btn-outlined-primary`}
                                onClick={() => {
                                    setStartDate(getTomorrowDate())
                                }}>IMORGON</button>
                        </div>
                        <div className={`${styles.timeSection}`}>
                            <input
                                type="date"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                                type="time"
                                required
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className={`${styles.inputGroup}`}>
                        <label>Vet du en sluttid?</label>
                        <div className={`${styles.whenSection}`}>
                            <button type="button" className={`btn-small btn-outlined-primary`}
                                onClick={() => {
                                    setEndDate("")
                                    setEndTime("")
                                }}>INGEN SLUTTID</button>
                            <button type="button" className={`btn-small btn-outlined-primary`}
                                onClick={() => {
                                    setEndDate(getTodayDate())
                                }}>IDAG</button>
                            <button type="button" className={`btn-small btn-outlined-primary`}
                                onClick={() => {
                                    setEndDate(getTomorrowDate())
                                }}>IMORGON</button>
                        </div>
                        <div className={`${styles.timeSection}`}>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <label>extra info</label>
                        <textarea
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        ></textarea>
                    </div>






                </form>

            </div>

        </Modal>
    )
}

export default AddNewPersonalActivityModal