import { faCode } from "@fortawesome/free-solid-svg-icons";
import ScriptRunner from "./ScriptRunner/ScriptRunner";
import ScriptRunnerControlBar from "./ScriptRunner/ScriptRunnerControlBar";

const modules = [
  {
    key: "scriptRunner",
    label: "Script Runner",
    icon: faCode,
    component: <ScriptRunner />,
    control: <ScriptRunnerControlBar />,
  },
];

export default modules;
