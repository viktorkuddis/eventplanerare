import { AppContext } from "../../../context/AppContext";
import { useContext, useState } from "react";

import styles from "./PersonalActivityCard.module.css"

import type { PersonalActivityType } from "../../../types";

import { Edit3 } from "react-feather";

import EditPersonalActivityFormModal from "../../Organisms/EditPersonalActivityForm/EditPersonalActivityFormModal";

import { useAuth } from "@clerk/clerk-react";

import { useDbApi } from "../../../api/useDbApi";


type Props = {
    item: PersonalActivityType
}

function PersonalActivityCard({ item }: Props) {

    const context = useContext(AppContext);
    const { userId } = useAuth();
    const { getEventDetailsById } = useDbApi()



    const [showEditPersonalActivityModal, setshowEditPersonalActivityModal] = useState(false)
    const [personalActivityToEdit, setPersonalActivityToEdit] = useState<PersonalActivityType | null>(null)


    const openEditPersonalActvityModal = (personalActivity: PersonalActivityType) => {
        console.log("modal ska Öppnas")
        setPersonalActivityToEdit(personalActivity)
        setshowEditPersonalActivityModal(true)
    }

    function getUserNameFromUserID(userId: string) {
        const participantion = context?.currentEventObjectDetailed?.eventParticipationsEnriched.find(
            (partisipation) => partisipation?.userId === userId
        );

        return participantion?.user.username;
    }


    return (
        <div className={styles.personalActivityRow}>

            <EditPersonalActivityFormModal
                isOpen={showEditPersonalActivityModal}
                onClose={async () => {
                    setshowEditPersonalActivityModal(false)
                    const newEventDetails = await getEventDetailsById(context?.currentEventObjectDetailed?.event._id as string)
                    if (newEventDetails) context?.setCurrentEventObjectsDetailed(newEventDetails)
                }}
                oldPersonalActivity={personalActivityToEdit!} />



            <small >
                <small>

                    <span className={`${styles.dateSpan}`}>
                        {new Date(item.startTime).toTimeString().slice(0, 5)}
                        {item.endTime && (
                            <>
                                {"-"}
                                {/* om annan dag: */}
                                {new Date(item.startTime).toDateString() !== new Date(item.endTime).toDateString() &&
                                    new Date(item.endTime).toLocaleDateString("sv-SE", {
                                        day: "2-digit",
                                        month: "short",
                                    }) + " "}
                                {/* tiden */}
                                {new Date(item.endTime).toTimeString().slice(0, 5)}
                            </>
                        )}
                    </span>
                </small>

                <span >
                    <strong>@{getUserNameFromUserID(item.ownerUserAuthId)}</strong> ska <i>{item.title}</i>
                </span>
            </small>
            {userId == item.ownerUserAuthId && <button className={`${styles.personalActivityEditButton}`}
                onClick={() => {
                    openEditPersonalActvityModal(item)

                }}>
                <Edit3 size={"1rem"} />
            </button>}


        </div>





    )
}

export default PersonalActivityCard
