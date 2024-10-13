import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { toast } from "react-toastify";

interface Types {
  children: React.ReactNode;
  action: () => void;
  cancelTransaction: () => void;
}

export const VerifyTransaction = forwardRef((props: Types, ref) => {
  // Hooks
  const { data: session } = useSession();

  // State
  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");

  const setOpenConfirm = () => {
    setIsOpen(!isOpen);
  };

  const CancelBuy = () => {
    setIsOpen(false);
    props.cancelTransaction();
  };

  useImperativeHandle(ref, () => ({
    setOpenConfirm,
  }));

  const VerifyPin = async () => {
    setIsLoading(true);
    try {
      // API call to buy airtime
      const response = await fetch("/api/verify-pin", {
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
        props.action();
      } else {
        toast.error(data.error || "Something went wrong! Try again", {
          toastId: "csscsa",
        });
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
              Confirm Transaction
            </ModalHeader>
            <ModalBody>
              {props.children}
              <Input
                type="number"
                maxLength={4}
                minLength={4}
                autoFocus
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
              <Button color="danger" variant="bordered" onPress={CancelBuy}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="primary"
                className="text-white"
                onPress={VerifyPin}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
