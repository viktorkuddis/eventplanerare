// import { useAuth } from "@clerk/clerk-react";
import styles from "./Home.module.css";

import { PlusCircle, Link } from "react-feather";

import Carousel from "../../components/Organisms/Carousel/Carousel";

import EventCard from "../../components/molecules/EventCard";

import AddNewEventModal from "../../components/Organisms/Modaler med innehåll/AddNewEventModal";

import { isEventActive } from "../../utils/evenTimeStatusUtil";

// import Modal from "../../components/Organisms/Modal/Modal";

// import { useDbApi } from "../../api/useDbApi";
import { useContext, useEffect, useRef, useState } from "react";

// import type { EventType } from "../../types";


import { AppContext } from "../../context /AppContext";

const Home = () => {


  const context = useContext(AppContext)



  const [showNewEventFormModal, setShowNewEventFormModal] = useState(false)

  // const { userId } = useAuth();

  // const { getEventsByUserId } = useDbApi();



  const myEventsContainer = useRef(null);
  const [myEventsContainerWidth, setMyEventsContainer] = useState<number>()

  useEffect(() => {
    if (!myEventsContainer.current) return;

    // skapa lyssnare som kör när storleksförändring upptäcks
    const resizeObserver = new ResizeObserver(([entry]) => {// entry är det observerade elementet.
      console.log("Bredden är nu:", entry.contentRect.width);
      setMyEventsContainer(entry.contentRect.width)
    });

    // pekar på element att börja hala lyssnaren på
    resizeObserver.observe(myEventsContainer.current);

    // cleanup:
    return () => resizeObserver.disconnect();
  }, []);



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
                  <p>Inga pågående evenemang just nu.</p>
                )
            }
          </div>
        </div>




        <div>
          <h2>Nästa event</h2>
        </div>





        <div className={`${styles.yourEventsSection}`} ref={myEventsContainer}>
          <h2 className={`${styles.yourEventsSectionHeading}`}>Dina event</h2>

          <br />
          <Carousel
            width={myEventsContainerWidth !== undefined && myEventsContainerWidth < 576 ? 10 : 5.5}
            aspectRatioH={1}
            aspectRatioW={5}
            paddingX={"1rem"}
            gap={"0.5rem"}
            firstItemWidth={null}
            items={[
              // första itemet är alltid SKAPAKNAPPEN

              // <button style={{ padding: "unset", lineHeight: "1", textAlign: "center" }}
              //   key="create-button"
              //   className="btn-medium btn-outlined-light-static"
              //   onClick={() => setShowNewEventFormModal(true)}
              // >
              //   <PlusCircle size={18} /> <br /><small>
              //     SKAPA
              //   </small>
              // </button>
              // ,
              //Mappar igenom arrayen av events och sprider ut den i den nya listan
              ...(context?.ownEvents?.map((e, i) => (

                <EventCard
                  key={i}
                  color={e.color}
                  title={e.title}
                  start={e.start}
                  // location={e.location}
                  // description={e.description}
                  layout="landscape"
                  size="small" />

              )) || [])
            ]}
          />
          <br />

          <h2 className={`${styles.yourEventsSectionHeading}`}>Dina event</h2>

          <br />

          <Carousel
            width={myEventsContainerWidth !== undefined && myEventsContainerWidth < 576 ? 7 : 4}
            aspectRatioH={4}
            aspectRatioW={3}
            paddingX={"1rem"}
            gap={"0.5rem"}
            firstItemWidth={myEventsContainerWidth !== undefined && myEventsContainerWidth < 576 ? 4 : 2}
            items={[
              // första itemet är alltid SKAPAKNAPPEN


              <button style={{
                padding: "unset", lineHeight: "1", textAlign: "center", background: "rgba(255, 255, 255, 0.1)", border: "none"
              }}
                key="create-button"
                className="btn-medium btn-outlined-light-static"
                onClick={() => setShowNewEventFormModal(true)}
              >
                <Link size={18} /> <br /><small>
                  ANSLUT
                </small>
              </button>
              ,
              //Mappar igenom arrayen av events och sprider ut den i den nya listan
              ...(context?.ownEvents?.map((e, i) => (
                <EventCard
                  key={i}
                  color={e.color}
                  title={e.title}
                  start={e.start}
                  location={e.location}
                  description={e.description}
                  layout="portrait"
                  size="large" />
              )) || [])
            ]} />

          <br />

          <h2 className={`${styles.yourEventsSectionHeading}`}>Dina event</h2>

          <br />

          <Carousel
            width={myEventsContainerWidth !== undefined && myEventsContainerWidth < 576 ? 5 : 3}
            aspectRatioH={1}
            aspectRatioW={1}
            paddingX={"1rem"}
            gap={"0.5rem"}
            firstItemWidth={myEventsContainerWidth !== undefined && myEventsContainerWidth < 576 ? 5 : 3}
            items={[
              // första itemet är alltid SKAPAKNAPPEN
              <button style={{
                padding: "unset", lineHeight: "1", textAlign: "center", background: "rgba(255, 255, 255, 0.1)", border: "none"
              }}
                key="create-button"
                className="btn-medium btn-outlined-light-static"
                onClick={() => setShowNewEventFormModal(true)}
              >
                <PlusCircle size={18} /> <br /><small>
                  SKAPA
                </small>
              </button>,
              //Mappar igenom arrayen av events och sprider ut den i den nya listan
              ...(context?.ownEvents?.map((e, i) => (
                <EventCard
                  key={i}
                  color={e.color}
                  title={e.title}
                  start={e.start}
                  location={e.location}
                  // description={e.description}
                  layout="portrait"
                  size="small" />
              )) || [])
            ]} />














          <div className={styles.cardsContainer}>





          </div>
        </div >

        <div>
          <h2>Andras event (ännu mindre kort? sidoscroll)</h2>

        </div>









      </main >
    </div >
  </>
  );
};

export default Home;
