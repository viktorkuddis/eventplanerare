
import { useContext, useEffect, useState } from "react";
import Modal from "../../Modal/Modal"

import styles from "./EditPersonalActivityForm.module.css"


import { useDbApi } from "../../../../api/useDbApi";
import type { PersonalActivityType } from "../../../../types";
import { useAuth } from "@clerk/clerk-react";
import { AppContext } from "../../../../context/AppContext";

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
};



type Props = {
    isOpen: boolean;
    onClose: () => void;
    oldPersonalActivity: PersonalActivityType
};


const EditPersonalActivityFormModal = ({ isOpen, onClose, oldPersonalActivity }: Props) => {



    const { userId } = useAuth();

    const { updatePersonalActivity, deletePersonalActivity } = useDbApi()

    const context = useContext(AppContext)






    const eventStartDate = context?.currentEventObjectDetailed?.event.start && new Date(context?.currentEventObjectDetailed?.event.start);
    const eventEndDate = context?.currentEventObjectDetailed?.event.end && new Date(context?.currentEventObjectDetailed?.event.end);


    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [extraInfo, setExtraInfo] = useState("");


    useEffect(() => {
        if (!oldPersonalActivity) return;

        setTitle(oldPersonalActivity.title || "");
        setStartDate(oldPersonalActivity.startTime ? new Date(oldPersonalActivity.startTime).toISOString().split("T")[0] : "");
        setStartTime(oldPersonalActivity.startTime ? new Date(oldPersonalActivity.startTime).toTimeString().slice(0, 5) : "");
        setEndDate(oldPersonalActivity.endTime ? new Date(oldPersonalActivity.endTime).toISOString().split("T")[0] : "");
        setEndTime(oldPersonalActivity.endTime ? new Date(oldPersonalActivity.endTime).toTimeString().slice(0, 5) : "");
        setExtraInfo(oldPersonalActivity.description || "");
    }, [oldPersonalActivity]);



    const handleCancel = () => {
        setTitle("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setExtraInfo("");

        onClose();
    };

    const hadleDelete = async () => {

        const isConfirmed = confirm("Vill du verkligen ta bort denna aktiviteten ?")
        if (isConfirmed) {
            const deleteSuccess = await deletePersonalActivity(oldPersonalActivity._id as string)
            if (deleteSuccess) {
                onClose()
            }

        }




    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!title || !startDate || !startTime) {
            alert(" Nu gick det fel. det behövs minst titel och start för att kunna skapa den här aktiviteten")
            return;
        }

        // Om endDate eller endTime är ifyllda men inte båda:
        if ((endDate && !endTime) || (!endDate && endTime)) {
            alert(`👀 KOLLA SLUTTIDEN ! 
Om du vill sätta en sluttid måste både datum och tid fyllas i.`);
            return;
        }

        const newActivity: PersonalActivityType = {
            ownerUserAuthId: userId as string,
            eventId: context?.currentEventObjectDetailed?.event._id as string,                 // eller något som passar din logik
            title: title,
            description: extraInfo,
            startTime: new Date(`${startDate}T${startTime}`),
            endTime: endDate && endTime ? new Date(`${endDate}T${endTime}`) : undefined,
        };

        if (newActivity.endTime && newActivity.endTime < newActivity.startTime) {
            alert("Sluttiden kan inte vara före starttiden 🙃");
            return;
        }

        // Kontrollera att aktiviteten startar och slutar inom evenemangets tidsram
        if (
            (eventStartDate && newActivity.startTime < eventStartDate) ||
            (eventEndDate && newActivity.endTime && newActivity.endTime > eventEndDate)
        ) {
            alert("oops. är du säker på att din aktivitet håller sig inom evenemangets tidsram?");
            return;
        }

        try {

            {
                const successData = await updatePersonalActivity(oldPersonalActivity._id as string, newActivity);
                console.log("ändrade till detta:", successData)
            }

        } catch (error) {
            console.error("Fel :", error);
            alert("Något gick fel. försök igen 🤔");
        }


        onClose();
    };

    return (



        <Modal isOpen={isOpen}
            title={"Ändra aktivitet"}
            onCloseModal={onClose}
            type={"drawer"}
            size={"small"}
            footerContent={<div className={`${styles.footer}`}>
                <button type="button" className="btn-medium btn-outlined-primary" onClick={handleCancel}
                >
                    Avbryt
                </button>
                <button type="submit" form="edit-activity-form" className="btn-medium btn-filled-primary">
                    Ändra
                </button>
            </div>}>

            <div className={`${styles.contentContainer}`}>
                <form id="edit-activity-form" onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}>

                    <div className={`${styles.inputGroup}`}>
                        <label>Vad tänker du göra? *</label>
                        <input
                            type="text"
                            // required
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
                                // required
                                value={startDate}
                                min={eventStartDate?.toISOString().split("T")[0]}
                                max={eventEndDate?.toISOString().split("T")[0]}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                                type="time"
                                // required
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
                                min={eventStartDate?.toISOString().split("T")[0]}
                                max={eventEndDate?.toISOString().split("T")[0]}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>



                    </div>

                    <div className={`${styles.inputGroup} ${styles.dangerSection}`}>
                        <br />
                        <hr />
                        <label>Ta bort</label>
                        <p>Vill du ta bort denna aktiviteten?</p>

                        <div>
                            <button type="button" className="btn-small btn-outlined-light-static" onClick={hadleDelete}
                            >
                                Ta Bort
                            </button>
                        </div>




                    </div>
                    {/* <div className={`${styles.inputGroup}`}>
                        <label>extra info</label>
                        <textarea
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        ></textarea>
                    </div> */}






                </form>

            </div>

        </Modal>
    )
}

export default EditPersonalActivityFormModal