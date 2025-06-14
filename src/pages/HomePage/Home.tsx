import { useNavigate } from "react-router-dom";

// import { useAuth } from "@clerk/clerk-react";
import styles from "./Home.module.css";

import { PlusCircle, Link as LinkIcon, } from "react-feather";

import Carousel from "../../components/Organisms/Carousel/Carousel";

import EventCard from "../../components/molecules/EventCard";

import AddNewEventModal from "../../components/Organisms/Modaler med innehåll/AddNewEventModal";
import ConnectToEventModal from "../../components/Organisms/Modaler med innehåll/ConnectToEventModal/ConnectToEventModal";


import { isEventActive } from "../../utils/evenTimeStatusUtil";

// import Modal from "../../components/Organisms/Modal/Modal";

// import { useDbApi } from "../../api/useDbApi";
import { useContext, useEffect, useRef, useState } from "react";

// import type { EventType } from "../../types";


import { AppContext } from "../../context/AppContext";

const Home = () => {


  const navigate = useNavigate();


  const context = useContext(AppContext)



  const [showNewEventFormModal, setShowNewEventFormModal] = useState(false)

  const [showConnectToEventModal, setShowConnectToModal] = useState(false)





  const refContainer = useRef(null);
  const [refContainerWidth, setrefContainer] = useState<number>()

  useEffect(() => {
    if (!refContainer.current) return;

    // skapa lyssnare som kör när storleksförändring upptäcks
    const resizeObserver = new ResizeObserver(([entry]) => {// entry är det observerade elementet.
      // console.log("Bredden är nu:", entry.contentRect.width);
      setrefContainer(entry.contentRect.width)
    });

    // pekar på element att börja hala lyssnaren på
    resizeObserver.observe(refContainer.current);

    // cleanup:
    return () => resizeObserver.disconnect();
  }, []);





  return (<>

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
      <ConnectToEventModal
        isOpen={showConnectToEventModal}
        onCloseModal={() => setShowConnectToModal(false)} />

      <main className="content-container-width-wrapper" ref={refContainer}>







        <div className={`${styles.rightNowSection}`}>




          <h2 className={`${styles.sectionHeading}`}>Pågår just nu</h2>
          <div className={styles.cardsContainer}>
            {
              // Finns det minst ett aktivt event?
              context?.ownEvents?.some(e => isEventActive(e.start, e.end))
                ? (
                  // Ja, rendera kort för alla aktiva event
                  context.ownEvents.map((e, i) =>
                    isEventActive(e.start, e.end) && (


                      <EventCard
                        onClick={() => navigate(`/event/${e._id}`)}
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

        {/* todo: NEXT EVENT ÄR MENINGEN BARA SKA VISA NÄSTA EVENT AV ALLA EVENT SOM FINNS: */}
        {/* <div className={`${styles.nextEventsSection}`}>
          <h2 className={`${styles.sectionHeading}`}>Nästa event</h2>
          <Carousel
            width={refContainerWidth !== undefined && refContainerWidth < 576 ? 10 : 5}
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
                  onClick={() => navigate(`/event/${e._id}`)}
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
        </div> */}

        <div className={`${styles.othersEventsSection}`}>
          <h2 className={`${styles.sectionHeading}`}>Andras event</h2>



          <Carousel
            width={refContainerWidth !== undefined && refContainerWidth < 576 ? 7 : 4}
            aspectRatioH={4}
            aspectRatioW={3}
            paddingX={"1rem"}
            gap={"0.5rem"}
            firstItemWidth={refContainerWidth !== undefined && refContainerWidth < 576 ? 4 : 2}
            items={[
              // första itemet är alltid SKAPAKNAPPEN


              <button style={{
                padding: "unset", lineHeight: "1", textAlign: "center", background: "rgba(255, 255, 255, 0.1)", border: "none"
              }}
                key="create-button"
                className="btn-medium btn-outlined-light-static"
                onClick={() => setShowConnectToModal(true)}
              >
                <LinkIcon size={18} /> <br /><small>
                  ANSLUT
                </small>
              </button>
              ,
              //Mappar igenom arrayen av events och sprider ut den i den nya listan
              ...(context?.ownEvents?.map((e, i) => (
                <EventCard
                  onClick={() => navigate(`/event/${e._id}`)}
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
        </div>

        <div className={`${styles.yourEventsSection}`}>
          <h2 className={`${styles.sectionHeading}`}>Dina event</h2>


          <Carousel
            width={refContainerWidth !== undefined && refContainerWidth < 576 ? 5 : 3}
            aspectRatioH={1}
            aspectRatioW={1}
            paddingX={"1rem"}
            gap={"0.5rem"}
            firstItemWidth={refContainerWidth !== undefined && refContainerWidth < 576 ? 5 : 3}
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
                  onClick={() => navigate(`/event/${e._id}`)}
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
        </div>





      </main >
    </div >
  </>
  );
};

export default Home;
