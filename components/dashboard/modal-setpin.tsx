import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface Types {
  openModal: () => void;
}

const SetPin = forwardRef((props, ref) => {
  // Hooks
  const { data: session } = useSession();

  // State
  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [eye, setEye] = useState(false);

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
              <div className="flex border border-gray-300 mt-2 rounded-md items-center">
                <input
                  type={!eye ? "password" : "text"}
                  className="bg-transparent  text-black px-5 outline-none h-[47px] placeholder-gray-500  basis-[89%] w-[100%]"
                  placeholder="4 Digit Pin"
                  onChange={(e) => setPin(e.target.value)}
                  required
                  maxLength={4}
                  minLength={4}
                  disabled={isLoading}
                />
                {!eye ? (
                  <IoEyeOffOutline
                    role="presentation"
                    onClick={() => setEye(!eye)}
                    className="basis-[10%] cursor-pointer"
                    size={22}
                  />
                ) : (
                  <IoEyeOutline
                    role="presentation"
                    onClick={() => setEye(!eye)}
                    className="basis-[10%] cursor-pointer"
                    size={22}
                  />
                )}
              </div>
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

SetPin.displayName = "SetPin";
export default SetPin;
