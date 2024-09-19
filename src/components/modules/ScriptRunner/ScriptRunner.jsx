/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { materialDark } from "@uiw/codemirror-theme-material";
import { Button, Input, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";
import js_beautify from "js-beautify";

import { useScriptRunnerModuleStore } from "@/states/module";
import { useShallow } from "zustand/react/shallow";
import LocalDB from "@/lib/db/indexedDB";
import IFrame from "./iframe/IFrame";
import { toast } from "react-toastify";

const exportFile = () => {};

const initialState = { script: "//Write your code below:", name: "new script" };

const ScriptRunner = () => {
  const { currentScript, scripts, actions } = useScriptRunnerModuleStore(
    useShallow((state) => ({ currentScript: state.currentScript, actions: state.actions, scripts: state.scripts }))
  );
  const { setScripts, setCurrentScript } = actions;

  const [data, setData] = useState(initialState);
  const iframeRef = useRef();

  const { script, name } = data;

  const changeData = (property, value) => {
    setData((prev) => ({ ...prev, [property]: value }));
  };

  const run = () => {
    iframeRef.current.contentWindow.postMessage({ action: "runScript", script }, "*");
  };

  const clearLog = () => {
    iframeRef.current.contentWindow.postMessage({ action: "clearLog" }, "*");
  };

  const handleMenuAction = async (key) => {
    switch (key) {
      case "beautify": {
        const beautified = js_beautify(script);
        changeData("script", beautified);
        break;
      }
      case "new-file": {
        setData(initialState);
        setCurrentScript(null);
        break;
      }
      case "save": {
        try {
          if (!data.id) {
            const createdId = await LocalDB.scripts.add(data);
            const newScript = { ...data, id: createdId };
            setScripts(scripts.concat(newScript));
            setCurrentScript(newScript);
            toast.success("saved");
            break;
          } else {
            //already currentScript
            await LocalDB.scripts.update(data.id, data);
            const newScripts = scripts.map((s) => (s.id === data.id ? data : s));
            setScripts(newScripts);
            toast.success("saved");
            break;
          }
        } catch (error) {
          toast.success("cannot save");
          console.log(error);
          break;
        }
      }
      case "save-as": {
        try {
          const { id, ...updatedData } = data;
          const createdId = await LocalDB.scripts.add(updatedData);
          const newScript = { id: createdId, ...updatedData };
          setScripts(scripts.concat(newScript));
          setCurrentScript(newScript);
          toast.success("saved");
          break;
        } catch (error) {
          toast.success("cannot save");
          console.log(error);
          break;
        }
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (currentScript) setData(currentScript);
  }, [currentScript]);

  useEffect(() => {
    (async () => {
      try {
        const scripts = await LocalDB.scripts.toArray();
        setScripts(scripts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto h-full flex flex-col rounded-lg overflow-auto bg-[#2e3235]">
      <div className="pt-2 px-2 pb-1 space-x-2 w-full flex justify-between">
        <Input
          variant="bordered"
          className="w-auto"
          classNames={{ inputWrapper: "border-0 shadow-none", input: "text-white/70 font-semibold" }}
          value={name}
          onChange={(e) => changeData("name", e.target.value)}
        />
        <div className="space-x-2">
          <Button size="sm" startContent={<FontAwesomeIcon icon={faPlay} />} color="success" onClick={run}>
            Run
          </Button>
          <Dropdown placement="bottom-end" size="sm">
            <DropdownTrigger>
              <Button size="sm" startContent={<FontAwesomeIcon icon={faBars} />}>
                File
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleMenuAction}>
              <DropdownItem key="beautify">Beautify</DropdownItem>
              <DropdownItem key="new-file">New script</DropdownItem>
              <DropdownItem key="save">Save script</DropdownItem>
              <DropdownItem key="save-as">Save as new script</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <ResizablePanelGroup direction="vertical" className="flex-1 grow-1">
        <ResizablePanel defaultSize={75}>
          <CodeMirror
            value={script}
            theme={materialDark}
            height="100%"
            className="text-[13px]"
            extensions={[javascript()]}
            onChange={(value) => {
              changeData("script", value);
            }}
          />
        </ResizablePanel>
        <ResizableHandle />
        <div className="w-full flex justify-center mb-1">
          <div className="h-[3px] w-[50px] bg-white/50 rounded-lg"></div>
        </div>
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-col h-full bg-black/50 rounded-[10px_10px_0_0] text-white/90 p-2 script-error">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm italic underline ml-1">Console:</p>
              <Tooltip content="Clear log">
                <Button isIconOnly size="sm" variant="link" onClick={clearLog}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Tooltip>
            </div>
            <div className="overflow-y-auto flex-1">
              <IFrame ref={iframeRef} className="w-full h-full" />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ScriptRunner;
