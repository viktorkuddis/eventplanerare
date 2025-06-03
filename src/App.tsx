// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

import "./styles/App.css";
import "./styles/Variables.css";

import HomeLayout from "../layouts/HomeLayout"

import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  // Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/HomePage/Home";
import NoPage from "./pages/NoPage";
import Style from "./pages/style";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

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



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Root path "/" redirectar beroende på inloggningsstatus */}
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>

              <SignedIn>
                <Navigate to="/home" replace />
              </SignedIn>
            </>
          }
        />

        {/* Login-sidan (bara synlig för SignedOut) */}
        <Route
          path="/login"
          element={
            <SignedOut>
              <Login />
            </SignedOut>
          }
        />

        {/* Home-sidan (bara synlig för SignedIn) */}
        <Route
          path="/home"
          element={
            <SignedIn>
              <HomeLayout>
                <Home />
              </HomeLayout>
            </SignedIn>
          }
        />

        {/* Öppen sida, synlig för alla */}
        <Route path="/style" element={<Style />} />

        {/* 404 för alla */}
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>);
}
