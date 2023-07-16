import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterBoard from "./components/FilterBoard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

axios.defaults.baseURL = "http://localhost:8080";

const routes: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "transferencia/:id",
    element: <FilterBoard />,
  },
  {
    path: "*",
    element: <Home />,
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navbar />
    <main className="mt-4 vh-100">
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);
