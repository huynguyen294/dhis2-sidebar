import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <ToastContainer pauseOnFocusLoss={false} theme="colored" position="bottom-right" />
    <App />
  </NextUIProvider>
);
