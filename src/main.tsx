import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { svSE } from "@clerk/localizations";



// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// CONTEXT
import { AppContextProvider } from "./context/AppContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      localization={svSE}
      afterSignOutUrl="/"
    >
      <AppContextProvider >
        <App />
      </AppContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);
