import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { api } from "../../utils/api";
import { type FishingSpot } from "@prisma/client";

type EditModalProps = {
  isOpen: boolean;
  close: () => void;
  fieldName: string;
  fieldKey: string;
  spot: FishingSpot;
  children: React.ReactNode;
};

export type HandleSubmitArgs =
  | {
      key:
        | "imagesId"
        | "prices"
        | "name"
        | "description"
        | "province"
        | "city"
        | "fish_types"
        | "area"
        | "contact";
      value: string;
    }
  | {
      key: "night_fishing" | "tent" | "accommodation";
      value: boolean;
    }
  | {
      key: "position";
      value: Position;
    };

export interface EditFieldProps {
  handleSubmit: (args: HandleSubmitArgs) => void;
}

const EditModal = ({
  isOpen,
  close,
  fieldKey,
  fieldName,
  spot,
  children,
}: EditModalProps) => {
  const { mutateAsync: updateFieldValue } =
    api.moderator.editStringField.useMutation();

  const handleConfirm = async (args: HandleSubmitArgs) => {
    if (typeof args.value === "string") {
      await updateFieldValue({
        fieldKey: args.key,
        fieldValue: args.value,
        spotId: spot.id,
      });
    }
    if (typeof args.value === "boolean") {
      console.log("boolean");
    }
    if (args.key === "position") {
      console.log("pos");
    }
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" open={isOpen} onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              <Dialog.Title>Edycja</Dialog.Title>
              <Dialog.Description>
                {`Edytujesz pole ${fieldName} - ${spot.name}`}
              </Dialog.Description>
              <div className="flex flex-col">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditModal;
