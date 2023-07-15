import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FilterBoard from "./components/FilterBoard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

axios.defaults.baseURL = "http://localhost:8080";

const router = createBrowserRouter([
  {
    path: "transferencia/:id",
    element: <FilterBoard />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Navbar />
    <main className="mt-4">
      <RouterProvider router={router} />
    </main>
    <Footer />
  </>
);
