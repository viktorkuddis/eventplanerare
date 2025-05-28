// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

import "./App.css";
import "./Variables.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./pages/StartScreen/StartScreen";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Style from "./pages/style";

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
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/style" element={<Style />} />
      </Routes>
    </BrowserRouter>
  );
}
