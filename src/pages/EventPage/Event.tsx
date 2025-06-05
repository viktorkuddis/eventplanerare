import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context /AppContext";
import type { EventType } from "../../types";

import { DotLoader } from "react-spinners";



// TODO: SE TILL ATT LETA I DATABASEN SÅ ATT USER ID FINNS MED EN PACPISITPANT

const Event = () => {
  const { eventId } = useParams();
  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentEventObject, setCurrentEventObject] = useState<EventType | null>(null);
  const [timoeIsOut, setTimeIsOut] = useState(false);

  useEffect(() => {

    const timeout = setTimeout(() => {
      // detta sker när timeouten gåt ut.
      setTimeIsOut(true);
      setIsLoading(false);
    }, 10000);

    if (context?.allEvents) {
      // Leta efter eventet. null om inte hittat
      const eventObject = context.allEvents.find(e => e._id === eventId) ?? null;
      setCurrentEventObject(eventObject);

      if (eventObject) {
        setIsLoading(false);
        clearTimeout(timeout); //tar bort timeout
      }
    }
    // cleanup
    return () => clearTimeout(timeout);

  }, [context?.allEvents, eventId]);

  if (isLoading) {
    return (
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center", }}>
        <br /> <br /><DotLoader color="rgba(125, 125, 125, 0.5)"
          cssOverride={{
            margin: "0 auto",
          }} />
      </div>
    )
  }


  if (!currentEventObject && timoeIsOut) {
    return (
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center" }}>
        <br /> <br /> Helt ärligt, <br /> verka gå sisådär att hitta detta eventet. <br /> <br /> Sorry 🙃
      </div>
    )
  }

  // Om eventet hittades, visa titeln
  return (
    <div>
      <div>{currentEventObject?.title}</div>

      <div>{currentEventObject?.description}</div>
      <div>{currentEventObject?.location}</div>


    </div>

  )
};

export default Event;
