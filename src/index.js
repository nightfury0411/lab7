import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import OathProvider from "./components/customhook/useAouth";
import "./index.css";

import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

axios.defaults.baseURL = "https://6678ec5d0bd4525056204a86.mockapi.io";

Sentry.init({
  dsn: "https://25b1fb4cb5b0392e774782940b42bc2f@o4507575290691584.ingest.us.sentry.io/4507586887155712",
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const clientId =
  "343176558270-47gf5fs5pan9d34t0amb1hpct7adb8jh.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <OathProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </OathProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

const throwKnownError = () => {
  throw new Error("This is an error from sentry tutorial");
};
