/* eslint-disable react/prop-types */
import { useScriptRunnerModuleStore } from "@/states/module";
import { faDownload, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Listbox, ListboxItem, Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import LocalDB from "@/lib/db/indexedDB";

const SavedScriptsModal = ({ isOpen, onClose }) => {
  const { isOpen: isDeleteModalOpen, onClose: onDeleteModalClose, onOpen: onDeleteModalOpen } = useDisclosure();
  const { scripts, actions } = useScriptRunnerModuleStore(useShallow((state) => ({ scripts: state.scripts, actions: state.actions })));
  const { setCurrentScript, setScripts } = actions;

  const [query, setQuery] = useState("");
  const [filteredScripts, setFilteredScripts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    await LocalDB.scripts.where("id").equals(deleteId).delete();
    setScripts(scripts.filter((s) => s.id !== deleteId));
    onDeleteModalClose();
  };

  useEffect(() => {
    setFilteredScripts(query ? scripts.filter((s) => s.name.includes(query)) : scripts);
  }, [query, scripts]);

  return (
    <>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} onDelete={handleDelete} />
      <Modal size="md" isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Saved Scripts</ModalHeader>
              <ModalBody className="text-base">
                <Input placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <Listbox
                  aria-label="Dynamic Actions"
                  onAction={(id) => {
                    setCurrentScript(scripts.find((s) => s.id == id));
                    onClose();
                  }}
                  className="max-h-[60dvh] overflow-y-auto"
                >
                  {filteredScripts.map((script) => (
                    <ListboxItem
                      key={script.id}
                      endContent={
                        <Button
                          isIconOnly
                          size="sm"
                          variant="link"
                          onClick={(e) => {
                            e.isPropagationStopped();
                            onDeleteModalOpen();
                            setDeleteId(script.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      }
                    >
                      {script.name}
                    </ListboxItem>
                  ))}
                </Listbox>
              </ModalBody>
              <ModalFooter>
                <Button startContent={<FontAwesomeIcon icon={faUpload} />}>Import</Button>
                <Button startContent={<FontAwesomeIcon icon={faDownload} />}>Export</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SavedScriptsModal;
