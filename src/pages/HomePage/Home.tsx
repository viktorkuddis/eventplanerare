import { useAuth } from "@clerk/clerk-react";
import styles from "./Home.module.css";


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




  const [ownEvents, setOwnEvents] = useState<EventType[]>([]);

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

      {context?.ownEvents?.map((event) => (event.title))}


      {/* MODAL */}
      <AddNewEventModal isOpen={showNewEventFormModal} onCloseModal={() => setShowNewEventFormModal(false)} />

      <main className="content-container-width-wrapper">
        <h2>Pågår just nu(breda kort o sidoskroll)</h2>
        <p>Pågår just nu(breda kort o sidoskroll)</p>
        <br />
        <h2>Nästa event(lista)</h2>
        <br />
        <h2>Dina events (mindre kort sidoscroll)</h2>


        {Array.isArray(ownEvents) && ownEvents.map((event, index) => (
          <div key={index} style={{ backgroundColor: event.color, marginBottom: "0.25rem", border: "1px solid white", padding: "0.5rem 1rem", borderRadius: "0.25rem" }}>
            <h3>{event.title}</h3>
            {event.description && (<small><p>{event.description}</p></small>)}
            <small>
              <small>
                {event.start && event.start.toString()} - {event.end && event.end.toString()}
              </small>
            </small>
            {event.location && <p><small>{event.location}</small></p>}

          </div>
        ))}


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
