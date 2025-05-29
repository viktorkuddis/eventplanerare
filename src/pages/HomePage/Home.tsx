import { UserButton } from "@clerk/clerk-react";
import styles from "./Home.module.css";

import AddNewEventForm from "../../components/AddNewEventForm/AddNewEventForm";

const Home = () => {
  return (
    <div className={styles.backdrop}>
      Detta är feedet Home DU ÄR INLOGGAD BÄSTA du
      <UserButton />
      <hr />
      <main>
        <h2>Pågår just nu(breda kort o sidoskroll)</h2>
        <p>Pågår just nu(breda kort o sidoskroll)</p>
        <br />

        <h2>Nästa event(lista)</h2>
        <br />
        <h2>Dina events (mindre kort sidoscroll)</h2>

        <button>SKAPA ETT EVENT (ska öppna formulär som modal)</button>

        <AddNewEventForm />
        <br />
        <h2>Kommande Events (ännu mindre kort? sidoscroll)</h2>
      </main>
    </div>
  );
};

export default Home;
