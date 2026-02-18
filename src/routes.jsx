// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Error404 from "./Pages/404";

import Layout from "../public/shared/Layout";

import Dashboard from "./Pages/Dashboard";
import Appointments from "./Pages/Appointments";
import MedicalRecords from "./Pages/MedicalRecords";
import Results from "./Pages/TestResults";
import Prescriptions from "./Pages/Prescriptions";
import Chatbot from "./Pages/Chatbot";
import Contacts from "./Pages/Contacts";
import ProfilePage from "./Pages/ProfilePage";


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
