import { SignOutButton } from "@clerk/clerk-react";

const Home = () => {
  return (
    <>
      Detta är feedet
      <div>
        Home DU ÄR INLOGGAD BÄSTA du
        <br />
        <SignOutButton />
      </div>
    </>
  );
};

export default Home;
