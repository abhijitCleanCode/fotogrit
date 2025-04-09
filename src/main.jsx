import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// potential improvement: implement lazy loading for larger apps as follows
// import { lazy, Suspense } from "react";
// const Home = lazy(() => import("./pages/Home"));
// const GeneralSettings = lazy(() => import("./pages/GeneralSettings"));
// At last don't forget to wrap the app with suspense

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { GeneralSettings, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorElement />, Dedicated component
    errorElement: <p>404</p>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "general-settings",
        element: <GeneralSettings />,
        // metadata, if needed
        // handle: {
        //   title: "Settings",
        //   requiresAuth: true,
        // }
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
