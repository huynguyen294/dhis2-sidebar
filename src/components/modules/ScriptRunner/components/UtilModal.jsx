/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const UtilModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Utils</ModalHeader>
            <ModalBody className="text-base max-h-[70dvh] overflow-y-auto">
              <p className="-mb-2 font-bold underline italic">Functions:</p>
              <div>
                <p className="font-semibold">pull(endPoint)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">push(endPoint, payload, method)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">openFile(type)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                  <li>type: string (json | xlsx)</li>
                  <li>return: data object</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">exportFile(type, data)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                  <li>type: string (json only)</li>
                  <li>data: object</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">importLibraries(cdnList)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                  <li>cdnList: array (library cdn urls)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">importScript(scriptName)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>async function</li>
                  <li>scriptName: string</li>
                  <li>imported script can return functions, objects...</li>
                </ul>
              </div>
              <p className="-mb-2 font-bold underline italic">Libraries:</p>
              <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                <li>lodash as _</li>
                <li>xlsx as XLSX</li>
                <li>turf as turf</li>
                <li>date-fns as dateFns</li>
              </ul>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UtilModal;
