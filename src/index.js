import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./android.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { DataProvider } from "./DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="359904996298-eqqhe9n6r7bgu1b1gj206mjktb5eiop9.apps.googleusercontent.com">
    <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
