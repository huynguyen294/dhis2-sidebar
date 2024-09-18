/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const UtilModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Utils</ModalHeader>
            <ModalBody className="text-base">
              <p className="-mb-2 font-bold underline italic">Functions:</p>
              <div>
                <p className="font-semibold">pull(endPoint)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>return: Promise</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">push(endPoint, payload, method)</p>
                <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                  <li>return: Promise</li>
                </ul>
              </div>
              <p className="-mb-2 font-bold underline italic">Libraries:</p>
              <ul className="list-disc ml-2" style={{ listStyle: "inside" }}>
                <li>lodash as _</li>
                <li>xlsx as XLSX</li>
                <li>turf as turf</li>
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
