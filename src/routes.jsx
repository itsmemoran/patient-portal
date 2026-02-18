// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error404 from "./pages/404";

import Layout from "../public/shared/Layout";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Results from "./pages/TestResults";
import Prescriptions from "./pages/Prescriptions";
import Chatbot from "./pages/Chatbot";
import Contacts from "./pages/Contacts";
import ProfilePage from "./pages/ProfilePage";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Dashboard /> },
      { path: "appointments", element: <Appointments /> },
      { path: "medicalrecords", element: <MedicalRecords /> },
      { path: "TestResults", element: <Results /> },
      { path: "prescriptions", element: <Prescriptions /> },
      { path: "chatbot", element: <Chatbot /> },
      { path: "contacts", element: <Contacts /> },
      { path: "profile", element: <ProfilePage /> }
    ],
  },
  // Route 404 quand rien ne matche dans la racine
  { path: "*", element: <Error404 /> },
]);
