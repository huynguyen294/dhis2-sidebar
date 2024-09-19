import { faCircleInfo, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useDisclosure } from "@nextui-org/react";
import UtilModal from "./components/UtilModal";
import SavedScriptsModal from "./components/SavedScriptsModal";

const ScriptRunnerControlBar = () => {
  const { isOpen, onClose, onOpen: openUtilModal } = useDisclosure();
  const { isOpen: savedScriptsModalOpen, onClose: savedScriptsModalOnClose, onOpen: openSavedScriptsModal } = useDisclosure();

  return (
    <div className="flex gap-2">
      <UtilModal isOpen={isOpen} onClose={onClose} />
      <SavedScriptsModal isOpen={savedScriptsModalOpen} onClose={savedScriptsModalOnClose} />
      <Button size="sm" color="primary" onClick={openUtilModal} startContent={<FontAwesomeIcon icon={faCircleInfo} />}>
        Utils
      </Button>
      <Button size="sm" onClick={openSavedScriptsModal} startContent={<FontAwesomeIcon icon={faFolderOpen} />}>
        Saved scripts
      </Button>
    </div>
  );
};

export default ScriptRunnerControlBar;
