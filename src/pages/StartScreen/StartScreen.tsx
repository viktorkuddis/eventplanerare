// import "./Clerkkeanup.modules.css";

import styles from "./StartScreen.module.css";

// import {
//   SignedIn,
//   SignedOut,
//   SignIn,
//   SignInButton,
//   SignOutButton,
//   SignUp,
// } from "@clerk/clerk-react";

const Login = () => {
  return (
    <>
      <div className={styles.backdrop}>
        <div>
          <h1 className={styles.flexItem}>VADSKER?</h1>
          <p>EVENTPLANERARE</p>
        </div>

        <button className="btn-filled-primary btn-large">LOGGA IN</button>

        {/* <SignedIn>
        ANVÄNDAREN ÄR INLOGAD
        <br />
        <SignOutButton />
      </SignedIn>

      <br />
      <SignedOut>
        ANVÄNDAREN ÄR UTLOGGAD
        <br />
        <div
          style={{
            margin: "0, auto",
            backgroundColor: "green",
            width: "100vw",
          }}
        >
          <SignIn />
          <SignUp />
        </div>
        <br />
        <br />
        <SignInButton />
      </SignedOut> */}
      </div>
    </>
  );
};

export default Login;
