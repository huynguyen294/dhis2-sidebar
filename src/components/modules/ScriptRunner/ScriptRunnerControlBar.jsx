import { faCircleInfo, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useDisclosure } from "@nextui-org/react";
import UtilModal from "./components/UtilModal";

const ScriptRunnerControlBar = () => {
  const { isOpen, onClose, onOpen: openUtilModal } = useDisclosure();
  return (
    <div className="flex gap-2">
      <UtilModal isOpen={isOpen} onClose={onClose} />
      <Button size="sm" color="primary" onClick={openUtilModal} startContent={<FontAwesomeIcon icon={faCircleInfo} />}>
        Utils
      </Button>
      <Button size="sm" startContent={<FontAwesomeIcon icon={faFolderOpen} />}>
        Saved scripts
      </Button>
    </div>
  );
};

export default ScriptRunnerControlBar;
