import { useEffect } from "react";
import { pull, push } from "@/utils/fetch";
import { exportFile, openFile } from "@/utils/utils";

const useHandleMessage = () => {
  useEffect(() => {
    const handler = async (event) => {
      const { action } = event.data;
      switch (action) {
        case "pull": {
          const { endPoint } = event.data;
          const result = await pull(endPoint);
          event.source.postMessage({ action: "pullResult", result }, "*");
          break;
        }
        case "push": {
          const { endPoint, payload, method } = event.data;
          const result = await push(endPoint, payload, method);
          event.source.postMessage({ action: "pushResult", result }, "*");
          break;
        }
        case "openFile": {
          const { type } = event.data;
          const result = await openFile(type);
          event.source.postMessage({ action: "openFileResult", result }, "*");
          break;
        }
        case "exportFile": {
          const { type, data } = event.data;
          await exportFile(type, data);
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
};

export default useHandleMessage;
