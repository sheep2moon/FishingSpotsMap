import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "../common/Button";
import { IconVocabulary } from "@tabler/icons-react";

type MarkdownDialogWrapperProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
};

const MarkdownDialogWrapper = ({
  isOpen,
  close,
  children,
}: MarkdownDialogWrapperProps) => {
  return (
    <>
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
            <Dialog.Panel className="fixed inset-0 z-[9999] overflow-y-auto bg-primary dark:bg-primary-dark">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-4 pt-4">
                  <Dialog.Title className="flex items-center gap-2 text-center text-lg">
                    <IconVocabulary />
                    Opis łowiska
                  </Dialog.Title>
                </div>
                <div className="relative flex-grow">{children}</div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MarkdownDialogWrapper;
