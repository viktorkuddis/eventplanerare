import { UserButton } from "@clerk/clerk-react";
import styles from "./Home.module.css";



import AddNewEventForm from "../../components/Organisms/AddNewEventForm/AddNewEventForm";

import { getData } from "../../api/dbApi"
import { useEffect } from "react";

import { useAuth } from "@clerk/clerk-react";

const Home = () => {
  const { getToken } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken(); // hämtar JWT från Clerk
        const data = await getData("http://localhost:4000/api", token);

        console.log(token)

        console.log("Svar från API:", data);
      } catch (err) {
        console.error("❌ Error:", err);
      }
    };

    fetchData();
  }, []);




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
        <button className="btn-medium btn-outlined-light-static">
          + <br />
          SKAPA <br />
          EVENT
        </button>
        (ska öppna formulär som modal)
        <AddNewEventForm />
        <br />
        <h2>Kommande Events (ännu mindre kort? sidoscroll)</h2>
      </main>
    </div>
  );
};

export default Home;
