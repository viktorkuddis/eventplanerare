import { SignOutButton, UserButton } from "@clerk/clerk-react";

const Home = () => {
  return (
    <>
      Detta är feedet Home DU ÄR INLOGGAD BÄSTA du
      <UserButton />
      <hr />
      <h2>Pågår just nu(breda kort o sidoskroll)</h2>
      <br />
      <h2>Nästa event(lista)</h2>
      <br />
      <h2>Dina events (mindre kort sidoscroll)</h2>
      <br />
      <h2>Kommande Events (ännu mindre kort? sidoscroll)</h2>
    </>
  );
};

export default Home;
