import { useAuth } from "@clerk/clerk-react";
import styles from "./Home.module.css";

import Carousel from "../../components/Organisms/Carousel/Carousel";

import EventCard from "../../components/molecules/EventCard";

import AddNewEventModal from "../../components/Organisms/Modaler med innehåll/AddNewEventModal";

import { isEventActive } from "../../utils/evenTimeStatusUtil";

// import Modal from "../../components/Organisms/Modal/Modal";

import { useDbApi } from "../../api/useDbApi";
import { useContext, useEffect, useState } from "react";

import type { EventType } from "../../types";


import { AppContext } from "../../context /AppContext";

const Home = () => {


  const context = useContext(AppContext)




  const [showNewEventFormModal, setShowNewEventFormModal] = useState(false)

  const { userId } = useAuth();

  const { getEventsByUserId } = useDbApi();




  const [, setOwnEvents] = useState<EventType[]>([]);

  useEffect(() => {
    console.log("Skickar userId till API:", userId);

    (async () => {
      try {
        const response = await getEventsByUserId(userId);
        console.log(response);
        setOwnEvents(response)
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  console.log(context)


  // async function testfunction() {
  //   console.log("testfunktoin klickad")
  //   try {
  //     const response = await getEventsByUserId(userId);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (<>
    {/* <button onClick={testfunction}> KLICKA PÅ TESTKNAPPEN</button> */}

    <div className={styles.backdrop}>



      {/* kolla om något event pågår nu: */}
      {/* kollar igenom Egna events: */}






      {/* <Carousel items={context?.ownEvents?.map((event, i) =>
        <EventCard
          color={event.color}
          title={event.title}
          start={event.start}
          location={event.location}
          description={event.description}
          layout={"landscape"}
          size={"large"}
          key={i}
        />
      )} /> */}


      {/* MODAL */}
      <AddNewEventModal isOpen={showNewEventFormModal} onCloseModal={() => setShowNewEventFormModal(false)} />

      <main className="content-container-width-wrapper">

        <div className={`${styles.rightNowSection}`}>
          <h2>Pågår just nu</h2>
          <div className={styles.cardsContainer}>
            {
              // Finns det minst ett aktivt event?
              context?.ownEvents?.some(e => isEventActive(e.start, e.end))
                ? (
                  // Ja, rendera kort för alla aktiva event
                  context.ownEvents.map((e, i) =>
                    isEventActive(e.start, e.end) && (
                      <EventCard
                        key={i}
                        color={e.color}
                        title={e.title}
                        start={e.start}
                        location={e.location}
                        description={e.description}
                        layout="landscape"
                        size="large"
                      />
                    )
                  )
                ) : (
                  // Nej, visa fallback-text
                  <p>Inga aktiva evenemang just nu.</p>
                )
            }
          </div>
        </div>




        <div>
          <h2>Nästa event(lista)</h2>
        </div>





        <div className={`${styles.yourEventsSection}`}>
          <h2>Dina events (mindre kort sidoscroll)</h2>


          <Carousel
            items={[
              // första itemet är alltid SKAPAKNAPPEN
              <button
                key="create-button"
                className="btn-medium btn-outlined-light-static"
                onClick={() => setShowNewEventFormModal(true)}
              >
                + <br />SKAPA <br />EVENT
              </button>,

              // Mappar igenom arrayen av events och sprider ut den i den nya listan
              ...(context?.ownEvents?.map((e, i) => (
                <EventCard
                  key={i}
                  color={e.color}
                  title={e.title}
                  start={e.start}
                  location={e.location}
                  description={e.description}
                  layout="landscape"
                  size="large"
                />
              )) || [])
            ]}
          />

          <div className={styles.cardsContainer}>





          </div>
        </div>

        <div>
          <h2>Kommande Events (ännu mindre kort? sidoscroll)</h2>

        </div>









      </main >
    </div >
  </>
  );
};

export default Home;
