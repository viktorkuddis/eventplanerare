
import { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../../Modal/Modal"

import styles from "./AddNewEventActivityFormModal.module.css"

import { useDbApi } from "../../../../api/useDbApi";
import type { EventActivityType } from "../../../../types";
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
    itemId: string;
    isOpen: boolean;
    onClose: () => void;
    isEditing?: boolean

};


const AddNewEventActivityFormModal = ({ isOpen, onClose, isEditing = false, itemId }: Props) => {


    const { createNewEventActivity, updateEventActivity } = useDbApi()

    const context = useContext(AppContext)


    const eventStartDate = context?.currentEventObjectDetailed?.event.start && new Date(context?.currentEventObjectDetailed?.event.start);
    const eventEndDate = context?.currentEventObjectDetailed?.event.end && new Date(context?.currentEventObjectDetailed?.event.end);



    // om de finns ett item to edit så lagras det här
    const [itemToEdit, setItemToEdit] = useState<EventActivityType>()



    // states för inputfälten:
    const [title, setTitle] = useState(itemToEdit ? itemToEdit.title : "");
    const [startDate, setStartDate] = useState(itemToEdit ? new Date(itemToEdit.startTime).toLocaleDateString() : "");
    const [startTime, setStartTime] = useState(itemToEdit ? new Date(itemToEdit.startTime).toLocaleTimeString() : "");
    const [endDate, setEndDate] = useState(itemToEdit?.endTime ? new Date(itemToEdit.endTime).toLocaleDateString() : "");
    const [endTime, setEndTime] = useState(itemToEdit?.endTime ? new Date(itemToEdit.endTime).toLocaleTimeString() : "");
    const [extraInfo, setExtraInfo] = useState(itemToEdit ? itemToEdit.description : "");

    // både för att resetta states när man hoppar in och ut ur komponenten. men också för initialt state. 
    const resetStates = useCallback(() => {
        setTitle(itemToEdit ? itemToEdit.title : "");
        setStartDate(itemToEdit ? new Date(itemToEdit.startTime).toLocaleDateString() : "");
        setStartTime(itemToEdit ? new Date(itemToEdit.startTime).toLocaleTimeString() : "");
        setEndDate(itemToEdit?.endTime ? new Date(itemToEdit.endTime).toLocaleDateString() : "");
        setEndTime(itemToEdit?.endTime ? new Date(itemToEdit.endTime).toLocaleTimeString() : "");
        setExtraInfo(itemToEdit ? itemToEdit.description : "");
    }, [itemToEdit])


    // returnerat ett item to edit att sätta om det är möjligt.
    useEffect(() => {
        if (isEditing) {
            setItemToEdit(context?.currentEventObjectDetailed?.eventActivities.find(item => item._id == itemId))
        }
    }, [context?.currentEventObjectDetailed?.eventActivities, isEditing, itemId])

    // om item to edit förändras, dvs om det sätt en så körs funktoin som uppdaterar inputfältens initialavärde.
    useEffect(() => {
        if (isEditing) {
            resetStates()
        }
    }, [isEditing, itemToEdit, resetStates])


    const handleCancel = () => {
        setTitle("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setExtraInfo("");

        onClose()
    };

    function closeModalAndResetStates() {
        resetStates()
        onClose()

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

        const newActivity: EventActivityType = {
            eventId: context?.currentEventObjectDetailed?.event._id as string,
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


            console.log(
                newActivity.startTime,
                eventStartDate
            )
            alert("oops. är du säker på att din aktivitet håller sig inom evenemangets tidsram?");
            return;
        }




        if (isEditing && itemToEdit || !isEditing) {
            console.log("vi är i editläge och försökte submitta.")
            if (itemToEdit?._id) {
                try {
                    {
                        const successData = await updateEventActivity(itemToEdit?._id, newActivity);
                        console.log("detta ska skriva över aktiviteten::", successData)
                    }

                } catch (error) {
                    console.error("Fel :", error);
                    alert("Något gick fel. försök igen 🤔");
                }
            } else { alert("ERROR in CODE. Inget itemID tillgängligt. Rapportera till utvecklare!") }
            closeModalAndResetStates()

        } else {
            console.log("VI är i skapaläge och försöker posta nytt till db....")

            try {

                {
                    const successData = await createNewEventActivity(newActivity);
                    console.log("skapade detta:", successData)
                }

            } catch (error) {
                console.error("Fel :", error);
                alert("Något gick fel. försök igen 🤔");
            }
            handleCancel()
        }




    };




    return (



        <Modal isOpen={isOpen}
            title={isEditing ? "Ändra gruppaktivitet" : "Lägg till gruppaktivitet"}
            // om vi är i edit mode och stänger så resettas states. om de är ny  avtivity som håller på att skapas så sparas states så man får ha de kvar om man ångrar sig.
            onCloseModal={isEditing ? closeModalAndResetStates : onClose}
            type={"drawer"}
            size={"small"}
            footerContent={< div className={`${styles.footer}`
            }>
                <button type="button" className="btn-medium btn-outlined-primary" onClick={isEditing ? closeModalAndResetStates : handleCancel}
                >
                    Avbryt
                </button>
                <button type="submit" form="add-group-activity-form" className="btn-medium btn-filled-primary">
                    {isEditing ? "Bekräfta Ändring" : "Skapa"}
                </button>
            </div >}>

            <div className={`${styles.contentContainer}`}>

                {isOpen &&

                    <form id="add-group-activity-form" onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                        <div className={`${styles.inputGroup}`}>
                            <label>Titel: </label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>


                        <div className={`${styles.inputGroup}`}>
                            <label>Start: </label>
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
                                    name="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    min={eventStartDate?.toISOString().split("T")[0]}
                                    max={eventEndDate?.toISOString().split("T")[0]}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    name="startTime"
                                    type="time"
                                    required
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className={`${styles.inputGroup}`}>
                            <label>Slut (frivilligt):</label>
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
                                    name="endDate"
                                    type="date"
                                    value={endDate}
                                    min={eventStartDate?.toISOString().split("T")[0]}
                                    max={eventEndDate?.toISOString().split("T")[0]}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <input
                                    name="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className={`${styles.inputGroup}`}>
                            <label>Extra info (frivilligt):</label>
                            <textarea
                                value={extraInfo}
                                onChange={(e) => setExtraInfo(e.target.value)}
                            ></textarea>
                        </div>




                        {isEditing &&
                            <div className={`${styles.inputGroup} ${styles.dangerSection}`}>
                                <br />
                                <hr />
                                <label>Ta bort</label>
                                <p>Vill du ta bort denna aktiviteten?</p>

                                <div>
                                    <button type="button" className="btn-small btn-outlined-light-static"

                                    >
                                        Ta Bort
                                    </button>
                                </div>

                            </div>}

                    </form>
                }
            </div>

        </Modal >
    )
}

export default AddNewEventActivityFormModal