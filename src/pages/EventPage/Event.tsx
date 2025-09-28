import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";


import { DotLoader } from "react-spinners";

import { useParams } from "react-router-dom";

import EventInformation from "../../components/molecules/EvenInformation/EventInformation";
import GroupActivityCard from "../../components/molecules/GroupActivityCard/GroupActivityCard";
import PersonalActivityCard from "../../components/molecules/PersonalActivityCard/PersonalActivityCard";
import DateBanner from "../../components/molecules/DateBanner/DateBanner";



import styles from "./Event.module.css";

import type { EventActivityType, PersonalActivityType, DateBannerType } from "../../types";

type EventFeedItemType =
  | { type: "eventActivity"; item: EventActivityType }
  | { type: "personalActivity"; item: PersonalActivityType }
  | { type: "dateBanner"; item: DateBannerType };

const Event = () => {

  const { eventId } = useParams();

  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [timoeIsOut, setTimeIsOut] = useState(false);



  // Denna variabeln ska hålla alla objekt som ska visas i feedet. samt i rätt ordning.
  // Denna variabeln används för att rendera ut grafiken rätt.
  // denna variabeln innehåller aktiviteter men även eventuellt andra objekt. så som datumbanner och ev tidsmarkör.
  const [sortedFeedItems, setSortedFeedItems] = useState<EventFeedItemType[]>([])

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


  useEffect(() => {

    // --- skapa feed att rendera: --- //

    // slår ihop aktiviteter till aray av objekt med info om vilken typ av item det är.
    let feed: EventFeedItemType[] = [
      ...context?.currentEventObjectDetailed?.personalActivities?.map((item) => ({ type: "personalActivity" as const, item })) || [],
      ...context?.currentEventObjectDetailed?.eventActivities?.map((item) => ({ type: "eventActivity" as const, item })) || []
    ];
    // console.log(feed)

    feed = feed.sort((a, b) => {
      return new Date(a.item.startTime).getTime() - new Date(b.item.startTime).getTime();
    });

    // lägger in banner-objekt på rätt ställen:
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

    // console.log("kontroll av tid i sorterat feed:")
    // console.table(feed.map((i) => ({ type: i.type, itemStart: i.item.startTime })))

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


        <div className={`content-container-width-wrapper ${styles.eventInfoSection}`}>
          <EventInformation />
        </div>

        <h3 style={{ margin: "0rem 1.5rem" }}>Agenda</h3>

        {/* HÄR RENDERAS EVENEMANGETS FEED ITEMS BASERAT PÅ VAD DET ÄR FÅR NÅGOT */}
        <div>
          {sortedFeedItems.map((item, i) => {

            switch (item.type) {
              case "personalActivity": return <PersonalActivityCard key={i} item={item.item} />
              case "eventActivity": return <GroupActivityCard key={i} item={item.item} />
              case "dateBanner": return <DateBanner key={i} item={item.item} />
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
