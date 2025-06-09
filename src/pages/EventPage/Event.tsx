import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context /AppContext";


import { DotLoader } from "react-spinners";

import { useParams } from "react-router-dom";

import EventInformation from "../../components/EvenInformation/EventInformation";

import style from "./Event.module.css";




const Event = () => {

  const { eventId } = useParams();

  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [timoeIsOut, setTimeIsOut] = useState(false);

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
      <div className={`content-container-width-wrapper ${style.contentContainer}`}>

        {/* <hr /> */}
        <div className={`content-container-width-wrapper ${style.eventInfoSection}`}>
          <EventInformation />
        </div>

        <div className={`content-container-width-wrapper ${style.eventInfoSection}`}>
          <EventInformation />
        </div>
        <div className={`content-container-width-wrapper ${style.eventInfoSection}`}>
          <EventInformation />
        </div>
        <div className={`content-container-width-wrapper ${style.eventInfoSection}`}>
          <EventInformation />
        </div>
        <div className={`content-container-width-wrapper ${style.eventInfoSection}`}>
          <EventInformation />
        </div>





      </div>

    )
  }
};

export default Event;
