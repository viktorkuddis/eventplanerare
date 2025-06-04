import { useAuth } from "@clerk/clerk-react";
import styles from "./Home.module.css";

import Carousel from "../../components/Organisms/Carousel/Carousel";

import EventCard from "../../components/molecules/EventCard";

import AddNewEventModal from "../../components/Organisms/Modaler med innehåll/AddNewEventModal";

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

      <br /><br />

      <Carousel items={context?.ownEvents?.map((event, i) =>
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
      )} />

      <br />
      <br />


      {context?.ownEvents?.map((event) => (event.title))}


      {/* MODAL */}
      <AddNewEventModal isOpen={showNewEventFormModal} onCloseModal={() => setShowNewEventFormModal(false)} />

      <main className="content-container-width-wrapper">
        <EventCard color={"#FFBF00"}
          title={"Min event"}
          start={new Date}
          location={"hemma hos mig"}
          description={" lite beskrivning här med och hej och hå. jag hoppas alla vill komma på kalas "} layout={"portrait"} size={"small"} />


        {context?.ownEvents?.map((event, i) =>
          <div key={i}><br />
            <EventCard key={i}
              color={event.color}
              title={event.title}
              start={event.start}
              location={event.location}
              description={event.description} layout={"landscape"} size={"large"} /></div>)}

        <br />
        <h2>Pågår just nu(breda kort o sidoskroll)</h2>
        <p>Pågår just nu(breda kort o sidoskroll)</p>
        <br />
        <h2>Nästa event(lista)</h2>
        <br />
        <h2>Dina events (mindre kort sidoscroll)</h2>





        <button className="btn-medium btn-outlined-light-static" onClick={() => {

          setShowNewEventFormModal(true); console.log();
        }
        }>
          + <br />
          SKAPA <br />
          EVENT
        </button>
        (ska öppna formulär som modal)
        {/* <AddNewEventForm /> */}
        <br />
        <h2>Kommande Events (ännu mindre kort? sidoscroll)</h2>
      </main >
    </div >
  </>
  );
};

export default Home;
