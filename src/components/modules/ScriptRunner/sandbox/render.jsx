import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import SandboxApp from "./SandboxApp.jsx";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <SandboxApp />
  </NextUIProvider>
);
