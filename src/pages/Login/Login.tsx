// import "./Clerkkeanup.modules.css";

import styles from "./Login.module.css";
import "./Clerkkeanup.module.css";
import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

// import {
//   SignedIn,
//   SignedOut,
//   SignIn,
//   SignInButton,
//   SignOutButton,
//   SignUp,
// } from "@clerk/clerk-react";

type Screen = "start" | "loginForm" | "RegisterForm";

const Login = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("start");

  // function showStartScreen() {
  //   setActiveScreen("start");
  // }

  function showLoginScreen() {
    setActiveScreen("loginForm");
  }

  function showRegisterScreen() {
    setActiveScreen("RegisterForm");
  }
  return (
    <>
      <div className={styles.backdrop}>
        {activeScreen == "start" && (
          <div className={styles.startScreen}>
            <div>
              <h1
                style={{
                  fontSize: "var(--font-size-h1-strong)",
                }}
              >
                VADSKER?
              </h1>
              <p>EVENTPLANERARE</p>
            </div>

            <button
              onClick={() => showLoginScreen()}
              className="btn-outlined-light-static btn-large"
            >
              <b>LOGGA IN</b>
            </button>
          </div>
        )}

        {activeScreen == "loginForm" && (
          <div className={styles.loginScreen}>
            <div>
              <h2>VADSKER?</h2>
              <small>
                <p>EVENTPLANERARE</p>
              </small>
            </div>
            <main>
              <h1 style={{ marginBottom: "1rem" }}>Logga in</h1>
              <SignIn />
            </main>
            <p>
              Behöver du ett konto?
              <br />
              <button
                onClick={() => showRegisterScreen()}
                style={{ margin: "0.5rem" }}
                className="btn-medium btn-outlined-light-static"
              >
                <b>Skapa konto</b>
              </button>
            </p>
          </div>
        )}

        {activeScreen == "RegisterForm" && (
          <div className={styles.registerScreen}>
            <div>
              <h2>VADSKER?</h2>
              <small>
                <p>EVENTPLANERARE</p>
              </small>
            </div>
            <main>
              <h1 style={{ marginBottom: "1rem" }}>Registrera konto</h1>

              <SignUp />
            </main>
            <p>
              Har du redan ett konto?
              <br />
              <button
                onClick={() => showLoginScreen()}
                style={{ margin: "0.5rem" }}
                className="btn-medium btn-outlined-light-static"
              >
                <b>Logga in</b>
              </button>
            </p>
          </div>
        )}

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
