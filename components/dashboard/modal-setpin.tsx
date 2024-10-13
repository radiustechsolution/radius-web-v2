import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Checkbox,
  ModalFooter,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IoLockClosed } from "react-icons/io5";

interface Types {
  openModal: () => void;
}

export const SetPin = forwardRef((props, ref) => {
  const { onOpen, onOpenChange } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Setup your 4 digit transaction PIN
            </ModalHeader>
            <ModalBody>
              <Input
                type="number"
                maxLength={4}
                minLength={4}
                autoFocus
                endContent={
                  <IoLockClosed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                // label="Pin"
                placeholder="4 Digit Pin"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={setOpen}>
                Close
              </Button>
              <Button color="primary" className="text-white" onPress={onClose}>
                Set Pin
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
