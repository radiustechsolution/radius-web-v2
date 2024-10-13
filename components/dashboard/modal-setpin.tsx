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
import { signIn, useSession } from "next-auth/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { toast } from "react-toastify";

interface Types {
  openModal: () => void;
}

export const SetPin = forwardRef((props, ref) => {
  // Hooks
  const { data: session } = useSession();

  // State
  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  const SetPin = async () => {
    setIsLoading(true);
    try {
      // API call to buy airtime
      const response = await fetch("/api/setpin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session?.user.id,
          pin: pin,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Airtime purchase successful
        const res = await signIn("credentials", {
          redirect: false,
          email: session?.user?.email,
          xagonn: "sampleregex",
        });
        setIsOpen(false);
        toast.success("Pin Set Successfully", { toastId: "cscssetpina" });
      } else {
        toast.error(
          data.error || "Airtime purchase failed. Please try again.",
          { toastId: "csscsa" }
        );
      }
    } catch (error) {
      // Handle fetch errors
      toast.error("An unexpected error occurred. Please try again.", {
        toastId: "mlkk",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                onChange={(e) => setPin(e.target.value)}
                radius="sm"
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
              <Button
                isLoading={isLoading}
                color="primary"
                className="text-white"
                onPress={SetPin}
              >
                Set Pin
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
