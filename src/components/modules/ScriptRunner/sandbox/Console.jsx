import { Hook, Unhook, Console as ConsoleFeed } from "console-feed";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "./utils";
import * as turf from "@turf/turf";
import * as XLSX from "xlsx";
import _ from "lodash";

const exportFile = () => {};

const Console = () => {
  const [logs, setLogs] = useState([]);
  const inputRef = useRef();

  //handle communication
  useEffect(() => {
    const handler = async (event) => {
      const { action } = event.data;
      switch (action) {
        case "runScript": {
          const { script } = event.data;

          const pull = (endPoint) => sendMessage(event, "pull", "pullResult", { endPoint });
          const push = (endPoint, payload, method) => sendMessage(event, "push", "pushResult", { endPoint, payload, method });
          const openFile = () => {
            console.log("alo");
            console.log(inputRef.current);
            inputRef.current.click();
          };

          try {
            const AsyncFunction = async function () {}.constructor;
            const func = new AsyncFunction(
              "pull",
              "push",
              "XLSX",
              "exportFile",
              "openFile",
              "_",
              "turf",
              `try {
                ${script}
                return null;
            }
            catch(err){
              return err;
            }`
            );

            await func(pull, push, XLSX, exportFile, openFile, _, turf);
          } catch (err) {
            console.log(err);
          }
          break;
        }

        case "clearLog": {
          setLogs([]);
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  // init console
  useEffect(() => {
    const hookedConsole = Hook(window.console, (log) => setLogs((currLogs) => [...currLogs, log]), false);
    return () => Unhook(hookedConsole);
  }, []);

  return (
    <div>
      <input hidden ref={inputRef} />
      <ConsoleFeed logs={logs} variant="dark" styles={{ BASE_FONT_SIZE: 13 }} />
    </div>
  );
};

export default Console;
