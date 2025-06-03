
import styles from "./Login.module.css";
import { SignInButton, } from "@clerk/clerk-react";




const Login = () => {







  return (
    <>

      <div className={styles.backdrop}>

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



          <SignInButton >
            <button className="btn-outlined-light-static btn-large">LOGGA IN</button>
          </SignInButton>
        </div>




      </div>
    </>
  );
};

export default Login;
