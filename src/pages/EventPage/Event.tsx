import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

import { Edit3 } from "react-feather";

import { DotLoader } from "react-spinners";

import { useParams } from "react-router-dom";

import EventInformation from "../../components/molecules/EvenInformation/EventInformation";

import styles from "./Event.module.css";

// import type { PersonalActivityType } from "../../types";
import { useAuth } from "@clerk/clerk-react";

import { useDbApi } from "../../api/useDbApi";

import EditPersonalActivityFormModal from "../../components/Organisms/EditPersonalActivityForm/EditPersonalActivityFormModal";
import type { PersonalActivityType } from "../../types";


const Event = () => {

  const { getEventDetailsById } = useDbApi()

  const { userId } = useAuth();

  const { eventId } = useParams();

  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [timoeIsOut, setTimeIsOut] = useState(false);


  const [showEditPersonalActivityModal, setshowEditPersonalActivityModal] = useState(false)
  const [personalActivityToEdit, setPersonalActivityToEdit] = useState<PersonalActivityType | null>(null)

  const openEditPersonalActvityModal = (personalActivity: PersonalActivityType) => {
    console.log("modal ska Öppnas")
    setPersonalActivityToEdit(personalActivity)
    setshowEditPersonalActivityModal(true)
  }



  useEffect(() => {

    const timeout = setTimeout(() => {
      // detta sker när timeouten gåt ut.
      setTimeIsOut(true);
    }, 10000);

    // om de e samma i parameter som i statet så betyder de att statet är aktuellt och inte skvalpar med gammal data från tidigare
    if (context?.currentEventObjectDetailed?.event._id == eventId) {
      setTimeIsOut(true)
      setIsLoading(false)
    }

    // cleanup
    return () => clearTimeout(timeout);

  }, [context?.currentEventObjectDetailed?.event._id, eventId]);

  if (isLoading == true && timoeIsOut == false) {
    return (
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center", }}>
        <br /> <br /><DotLoader color="rgba(125, 125, 125, 0.5)"
          cssOverride={{
            margin: "0 auto",
          }} />
      </div>
    )
  }

  function getUserNameFromUserID(userId: string) {
    const participantion = context?.currentEventObjectDetailed?.eventParticipationsEnriched.find(
      (partisipation) => partisipation?.userId === userId
    );

    return participantion?.user.username;
  }

  if (timoeIsOut == true && isLoading == true) {
    return (
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center" }}>
        <br /> <br /> Helt ärligt, <br /> verka gå sisådär att hitta detta eventet. <br /> <br /> Sorry 🙃
      </div>
    )
  }

  // Om eventet hittades, visa titeln

  if (timoeIsOut == true && isLoading == false) {
    return (
      <div className={`content-container-width-wrapper ${styles.contentContainer}`}>



        <EditPersonalActivityFormModal
          isOpen={showEditPersonalActivityModal}
          onClose={async () => {
            setshowEditPersonalActivityModal(false)
            const newEventDetails = await getEventDetailsById(context?.currentEventObjectDetailed?.event._id as string)
            if (newEventDetails) context?.setCurrentEventObjectsDetailed(newEventDetails)
          }}
          oldPersonalActivity={personalActivityToEdit!} />


        {/* <hr /> */}
        <div className={`content-container-width-wrapper ${styles.eventInfoSection}`}>
          <EventInformation />
        </div>


        {/* detta är personal aktivitet rad. */}
        <div>
          {context?.currentEventObjectDetailed?.personalActivities.map((item, i) =>
            <div key={i} className={`content-container-width-wrapper ${styles.personalActivityRow}`}>
              <small >
                <small>
                  <span className={`${styles.dateSpan}`}>
                    {new Date(item.startTime).toTimeString().slice(0, 5)}
                    {item.endTime && (
                      <>
                        {" - "}
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





          )}


          {context?.currentEventObjectDetailed?.eventActivities.map((item, i) =>
            <div key={i} style={{
              backgroundColor: context?.currentEventObjectDetailed?.event.color,
              color: "white",
              borderRadius: "0.25rem",
              padding: "0.5rem",
              margin: "1rem",
              border: "1px, solid white"
            }}>
              <small>{item.startTime.toString()} - {item.endTime?.toString()}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p></div>
          )}

        </div>



        {/* <div className={styles.buttonGroup}

          style={{
            background: "linear-gradient(to top,  50%, transparent 100%)"
          }}

        >
          <button className="btn-medium btn-filled-light-static">
            <Users size={"1rem"} /> <span>Gruppaktivitet</span>
          </button>
          <button className="btn-medium btn-filled-primary">
            <User size={"1rem"} /> <span>Egen aktivitet</span>
          </button>

        </div> */}



      </div >

    )
  }
};

export default Event;
