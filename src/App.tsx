// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

import "./styles/App.css";
import "./styles/Variables.css";

import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/HomePage/Home";
import NoPage from "./pages/NoPage";
import Style from "./pages/style";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import ProtectedPage from "./pages/ProtectedPage";

/* 
LITE CLERKDOKUMENTATION:
<SignedIn />
    Children of this component can only be seen while signed in.
<SignedOut />
    Children of this component can only be seen while signed out.
<UserButton />
    Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
<SignInButton />
    An unstyled component that links to the sign-in page or displays the sign-in modal. 
*/

// Getting started med CLERK:
// https://dashboard.clerk.com/apps/app_2xgcMmai2XIXpFpJq6O2Ciyqydk/instances/ins_2xgcMq7r1hj40vnZsmWcRLZFHh6

// Clerk med React Router Dom
// https://clerk.com/docs/quickstarts/react-router?_gl=1*lrpgkq*_gcl_au*OTQwNzMyOTEyLjE3NDgzNjI5NDQ.*_ga*MTU3NzMzODgyNS4xNzQ4MzYyOTQ1*_ga_1WMF5X234K*czE3NDgzNjI5NDQkbzEkZzEkdDE3NDgzNjMxMTQkajAkbDAkaDA.

// Wrapperkomponent som skyddar en annan komponent och returnerar omdirigering om inte inloggad, annars returneras Childrenkomponenten
const ProtectedRouteLayout: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <>
        <div style={{ margin: "20% auto", width: "max-content" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(130, 130, 130, 0.23)",
              borderTop: "4px solid rgba(126, 126, 126, 0.77)",
              borderRadius: "50%",
              // animation: "spin 1s linear infinite",
              margin: "auto",
            }}
          />
          <br />
          <p>Laddar...</p>
        </div>
      </>
    );
  } else if (!isSignedIn) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <Login />
              </SignedOut>
              <SignedIn>
                <Home />
              </SignedIn>
            </>
          }
        />
        <Route element={<ProtectedRouteLayout />}>
          <Route path="/skyddad" element={<ProtectedPage />} />
        </Route>
        <Route path="*" element={<NoPage />} /> {/* no page För alla */}
        <Route path="/style" element={<Style />} />
        {/* denna är öppen för alla. det är bara lite designsystem demo. */}
      </Routes>
    </BrowserRouter>
  );
}
