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
import type { EventActivityType, PersonalActivityType } from "../../types";
import { backgroundColorMixLight } from "../../utils/colorMix.utils";

type DateBannerType = {
  startTime: Date
}

type EventFeedItemType =
  | { type: "eventActivity"; item: EventActivityType }
  | { type: "personalActivity"; item: PersonalActivityType }
  | { type: "dateBanner"; item: DateBannerType };

const Event = () => {

  const { getEventDetailsById } = useDbApi()

  const { userId } = useAuth();

  const { eventId } = useParams();

  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [timoeIsOut, setTimeIsOut] = useState(false);


  const [showEditPersonalActivityModal, setshowEditPersonalActivityModal] = useState(false)
  const [personalActivityToEdit, setPersonalActivityToEdit] = useState<PersonalActivityType | null>(null)

  // Denna variabeln ska hålla alla objekt som ska visas i feedet. samt i rätt ordning.
  // Denna variabeln används för att rendera ut grafiken rätt.
  // denna variabeln innehåller aktiviteter men även eventuellt andra objekt. så som tidsmarkören.
  const [sortedFeedItems, setSortedFeedItems] = useState<EventFeedItemType[]>([])


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


  // skapa feed att rendera:
  useEffect(() => {
    // hämtar lista med datum som evenemanget sträcker sig över:



    // slår ihop aktiviteter till aray av objekt med info om vilken typ av item det är.
    let feed: EventFeedItemType[] = [
      ...context?.currentEventObjectDetailed?.personalActivities?.map((item) => ({ type: "personalActivity" as const, item })) || [],
      ...context?.currentEventObjectDetailed?.eventActivities?.map((item) => ({ type: "eventActivity" as const, item })) || []
    ];
    console.log(feed)

    feed = feed.sort((a, b) => {

      return new Date(a.item.startTime).getTime() - new Date(b.item.startTime).getTime();
    });

    // gå igenom listan och håll koll på senaste datummet. om nytt datum kommer så lägger vi in en banner i listan.
    let currentDate: string;
    feed = feed.flatMap((item) => {

      // om datumet inte ännu är tillagd i listan returneras först ett datum banner objekt sedan själva aktiviteten.
      // annars returneras bara aktiviteten som den är
      if (currentDate !== new Date(item.item.startTime).toDateString()) {
        // update av flagga
        currentDate = new Date(item.item.startTime).toDateString()
        return [{
          type: "dateBanner", item: {
            startTime: new Date(
              // ser till att bara ärva datum och inte tid från itemet. sätts till 00.00
              new Date(item.item.startTime).getFullYear(),
              new Date(item.item.startTime).getMonth(),
              new Date(item.item.startTime).getDate()
            )
          }
        }, item]
      } else {
        // update av flagga
        currentDate = new Date(item.item.startTime).toDateString()
        return item
      }
    })


    console.log("kontroll av tid i sorterat feed:")
    console.table(feed.map((i) => ({ type: i.type, itemStart: i.item.startTime })))

    setSortedFeedItems(feed)

  }, [context?.currentEventObjectDetailed?.event?.end, context?.currentEventObjectDetailed?.event?.start, context?.currentEventObjectDetailed?.eventActivities, context?.currentEventObjectDetailed?.personalActivities])



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


  // SUCCESS att hitta eventet:
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

        <h3 style={{ margin: "0rem 1.5rem" }}>Agenda</h3>



        {/* HÄR RENDERAS EVENEMANGETS FEED ITEMS BASERAT PÅ VAD DET ÄR FÅR NÅGOT */}
        <div>
          {sortedFeedItems.map((item, i) => {

            switch (item.type) {
              case "personalActivity":
                return <div key={i} className={`content-container-width-wrapper ${styles.personalActivityRow}`}>
                  <small >
                    <small>

                      <span className={`${styles.dateSpan}`}>
                        {new Date(item.item.startTime).toTimeString().slice(0, 5)}
                        {item.item.endTime && (
                          <>
                            {"-"}
                            {/* om annan dag: */}
                            {new Date(item.item.startTime).toDateString() !== new Date(item.item.endTime).toDateString() &&
                              new Date(item.item.endTime).toLocaleDateString("sv-SE", {
                                day: "2-digit",
                                month: "short",
                              }) + " "}
                            {/* tiden */}
                            {new Date(item.item.endTime).toTimeString().slice(0, 5)}
                          </>
                        )}
                      </span>
                    </small>

                    <span >
                      <strong>@{getUserNameFromUserID(item.item.ownerUserAuthId)}</strong> ska <i>{item.item.title}</i>
                    </span>
                  </small>
                  {userId == item.item.ownerUserAuthId && <button className={`${styles.personalActivityEditButton}`}
                    onClick={() => {
                      openEditPersonalActvityModal(item.item)

                    }}>
                    <Edit3 size={"1rem"} />
                  </button>}


                </div>

              case "eventActivity":
                return <div key={i} style={{
                  backgroundColor: context?.currentEventObjectDetailed?.event.color,
                  color: "white",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  margin: "0.5rem 1rem",
                  border: "1px, solid white"
                }}>

                  <small>
                    {new Date(item.item.startTime).toTimeString().slice(0, 5)}
                    {item.item.endTime && (
                      <>
                        {"-"}
                        {/* om annan dag: */}
                        {new Date(item.item.startTime).toDateString() !== new Date(item.item.endTime).toDateString() &&
                          new Date(item.item.endTime).toLocaleDateString("sv-SE", {
                            day: "2-digit",
                            month: "short",
                          }) + " "}
                        {/* tiden */}
                        {new Date(item.item.endTime).toTimeString().slice(0, 5)}
                      </>
                    )}

                  </small>
                  <br />

                  <h3>{item.item.title}</h3>
                  <p>{item.item.description}</p>
                </div>

              case "dateBanner":
                return <div key={i} className={`${styles.dateBanner}`}
                  style={{
                    backgroundColor: `${context?.currentEventObjectDetailed?.event.color ? backgroundColorMixLight(context?.currentEventObjectDetailed?.event.color) : "white"}`,
                    boxShadow: `0 -0.1rem 0.2rem ${context?.currentEventObjectDetailed?.event.color ? backgroundColorMixLight(context?.currentEventObjectDetailed?.event.color) : "white"}`
                  }}>
                  <small>
                    {new Date(item.item.startTime).toLocaleDateString("sv-SE", {
                      weekday: "long",
                      month: "long",
                      day: "numeric"
                    })}
                  </small>



                </div>
              default:
                break;
            }
          }
          )}
        </div>




      </div >












    )
  }
};

export default Event;
