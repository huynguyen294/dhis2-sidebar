/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { materialDark } from "@uiw/codemirror-theme-material";
import { Button, Input, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlay, faSave, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";
import IFrame from "./iframe/IFrame";
import js_beautify from "js-beautify";

const exportFile = () => {};

const ScriptRunner = () => {
  const [script, setScript] = useState("//Write your code below:");
  const [file, setFile] = useState(null);
  const [scriptName, setScriptName] = useState("Script 1");
  const iframeRef = useRef();
  const inputRef = useRef();

  const openFile = () => {
    inputRef.current.click();
  };

  const run = () => {
    iframeRef.current.contentWindow.postMessage({ action: "runScript", script }, "*");
  };

  const clearLog = () => {
    iframeRef.current.contentWindow.postMessage({ action: "clearLog" }, "*");
  };

  return (
    <div className="container mx-auto h-full flex flex-col rounded-lg overflow-auto bg-[#2e3235]">
      <input
        hidden
        type="file"
        ref={inputRef}
        onChange={(e) => {
          setFile(e.target.files);
          inputRef.current.value = "";
        }}
      ></input>
      <div className="p-2 space-x-2 w-full flex justify-between">
        <Input
          variant="bordered"
          className="w-auto"
          classNames={{ inputWrapper: "border-0 shadow-none", input: "text-white/70 font-semibold" }}
          value={scriptName}
          onChange={(e) => setScriptName(e.target.value)}
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
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) => {
                switch (key) {
                  case "beautify": {
                    const beautified = js_beautify(script);
                    setScript(beautified);
                    break;
                  }
                }
              }}
            >
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
              setScript(value);
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
