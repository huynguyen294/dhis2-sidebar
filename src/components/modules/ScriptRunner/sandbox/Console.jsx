import { Hook, Unhook, Console as ConsoleFeed } from "console-feed";
import { useEffect, useState } from "react";
import { loadScript, sendMessage } from "./utils";
import { Progress } from "@nextui-org/react";
import * as turf from "@turf/turf";
import * as XLSX from "xlsx";
import * as dateFns from "date-fns";
import _ from "lodash";

const Console = () => {
  const [logs, setLogs] = useState([]);
  const [scripting, setScripting] = useState(false);

  //handle communication
  useEffect(() => {
    const handler = async (event) => {
      const { action } = event.data;
      switch (action) {
        case "runScript": {
          const { script } = event.data;
          const libraryScriptElements = [];

          const pull = (endPoint) => sendMessage(event, "pull", "pullResult", { endPoint });
          const push = (endPoint, payload, method) => sendMessage(event, "push", "pushResult", { endPoint, payload, method });
          const openFile = (type) => sendMessage(event, "openFile", "openFileResult", { type });
          const exportFile = (type, data) => sendMessage(event, "exportFile", null, { type, data });
          const importLibraries = (listCdn) => Promise.all(listCdn.map(async (cdn) => libraryScriptElements.push(await loadScript(cdn))));

          const AsyncFunction = async function () {}.constructor;
          const func = new AsyncFunction(
            "pull",
            "push",
            "XLSX",
            "exportFile",
            "openFile",
            "_",
            "turf",
            "dateFns",
            "importLibraries",
            `try {
                ${script}
                return null;
            }
            catch(err){
              console.log(err)
              return err;
            }`
          );

          setScripting(true);
          await func(pull, push, XLSX, exportFile, openFile, _, turf, dateFns, importLibraries);
          libraryScriptElements.forEach((scriptElement) => scriptElement.remove());
          setScripting(false);
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
    <div className="[&>div:last-child>div:first-child]:border-t-0 [&>div:last-child>div>div:last-child]:ml-[4px] [&>div:last-child>div>div:first-child]:pl-[4px]">
      <Progress size="sm" isIndeterminate aria-label="Loading..." className={`w-full ${scripting ? "visible" : "invisible"}`} />
      <ConsoleFeed logs={logs} variant="dark" styles={{ BASE_FONT_SIZE: 13 }} />
    </div>
  );
};

export default Console;
