import { useShallow } from "zustand/react/shallow";
import { useRef } from "react";
import useLayoutStore from "@/states/layout";
import modules from "./modules";

const Content = () => {
  const iframeRef = useRef();
  const currentModule = useLayoutStore(useShallow((state) => state.module));

  return (
    <div className="h-full p-2">
      {modules.map((module) => {
        return (
          <div ref={iframeRef} className="w-full h-full" key={module.key} style={{ display: module === currentModule ? "inherit" : "none" }}>
            {currentModule.component}
          </div>
        );
      })}
    </div>
  );
};
export default Content;
