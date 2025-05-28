import React from "react";
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

        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-filled-primary btn-small">LOGGA IN</button>
          <button className="btn-filled-primary btn-medium">LOGGA IN</button>
          <button className="btn-filled-primary btn-large">LOGGA IN</button>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-outlined-primary btn-small">LOGGA IN</button>
          <button className="btn-outlined-primary btn-medium">LOGGA IN</button>
          <button className="btn-outlined-primary btn-large">LOGGA IN</button>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-filled-strong btn-small">LOGGA IN</button>
          <button className="btn-filled-strong btn-medium">LOGGA IN</button>
          <button className="btn-filled-strong btn-large">LOGGA IN</button>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-outlined-strong btn-small">LOGGA IN</button>
          <button className="btn-outlined-strong btn-medium">LOGGA IN</button>
          <button className="btn-outlined-strong btn-large">LOGGA IN</button>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-filled-light-static btn-small">
            LOGGA IN
          </button>
          <button className="btn-filled-light-static btn-medium">
            LOGGA IN
          </button>
          <button className="btn-filled-light-static btn-large">
            LOGGA IN
          </button>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn-outlined-light-static btn-small">
            LOGGA IN
          </button>
          <button className="btn-outlined-light-static btn-medium">
            LOGGA IN
          </button>
          <button className="btn-outlined-light-static btn-large">
            LOGGA IN
          </button>
        </span>

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
