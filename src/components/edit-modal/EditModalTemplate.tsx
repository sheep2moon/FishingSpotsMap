import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { api } from "../../utils/api";
import { type FishingSpot } from "@prisma/client";
import EditName from "./EditName";

type EditModalProps = {
  isOpen: boolean;
  close: () => void;
  editingField:
    | "images"
    | "prices"
    | "address"
    | "position"
    | "name"
    | "description"
    | "area"
    | "contact"
    | "features";
  fieldKey: string;
  spot: FishingSpot;
  children: React.ReactNode;
};

export interface EditFieldProps {
  spot: FishingSpot;
}

const EditModalTemplate = ({
  isOpen,
  close,
  editingField,
  spot,
}: EditModalProps) => {
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
                {`Edytujesz pole ${editingField}`}
              </Dialog.Description>
              <div className="flex flex-col">
                {editingField === "name" && <EditName spot={spot} />}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditModalTemplate;
