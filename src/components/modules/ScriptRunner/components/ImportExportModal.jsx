/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";
import LocalDB from "@/lib/db/indexedDB";
import { exportFile } from "@/utils/utils";
import { useScriptRunnerModuleStore } from "@/states/module";
import { useShallow } from "zustand/react/shallow";

const columns = [
  { key: "name", label: "Name" },
  { key: "script", label: "Script" },
];

const ImportExportModal = ({ isExport, isOpen, onClose }) => {
  const Title = isExport ? "Export" : "Import";

  const { scripts, actions } = useScriptRunnerModuleStore(useShallow((state) => ({ scripts: state.scripts, actions: state.actions })));
  const { setScripts } = actions;

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [loadedScripts, setLoadedScripts] = useState(null);

  const handleSubmit = () => {
    const result = selectedKeys === "all" ? scripts : scripts.filter(({ id }) => selectedKeys.has(id + ""));
    if (isExport) {
      exportFile("json", result);
      return;
    }

    // eslint-disable-next-line no-unused-vars
    result.forEach(async ({ id, ...item }) => {
      const createdId = await LocalDB.scripts.add(item);
      const newScript = { ...item, id: createdId };
      setScripts(scripts.concat(newScript));
    });
  };

  useEffect(() => {
    (async () => {
      //reset
      if (!isOpen) {
        setSelectedKeys(new Set([]));
        setLoadedScripts(null);
        return;
      }
    })();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{Title}</ModalHeader>
            <ModalBody className="pb-6">
              {scripts && isExport && (
                <Table
                  aria-label="Controlled table example with dynamic content"
                  selectionMode="multiple"
                  classNames={{ wrapper: "shadow-none p-0 max-h-[70dvh]" }}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  isHeaderSticky
                >
                  <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
                  <TableBody items={scripts}>
                    {(script) => <TableRow key={script.id}>{(columnKey) => <TableCell>{script[columnKey].slice(0, 100)}...</TableCell>}</TableRow>}
                  </TableBody>
                </Table>
              )}

              {!isExport && (
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = function (e) {
                        try {
                          const jsonData = JSON.parse(e.target.result);
                          setLoadedScripts(jsonData);
                        } catch (error) {
                          console.error("Invalid JSON", error);
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              )}

              {!isExport && loadedScripts && (
                <Table
                  aria-label="Controlled table example with dynamic content"
                  selectionMode="multiple"
                  classNames={{ wrapper: "shadow-none p-0 max-h-[70dvh]" }}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
                  <TableBody items={loadedScripts}>
                    {(script) => <TableRow key={script.id}>{(columnKey) => <TableCell>{script[columnKey].slice(0, 100)}...</TableCell>}</TableRow>}
                  </TableBody>
                </Table>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="link" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSubmit} disabled={selectedKeys.size === 0}>
                {Title}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImportExportModal;
