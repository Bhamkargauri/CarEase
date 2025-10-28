import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import Auth from "./components/Auth.jsx";
import AuthProvider from "./components/AuthContext.jsx";
import CarDetails from "./components/CarDetails.jsx";
import Home from "./components/Home";
import MyBookings from "./components/MyBookings";
import "./index.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/mybookings",
        element: <MyBookings />,
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
);
