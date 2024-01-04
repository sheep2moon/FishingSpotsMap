import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type ConfirmationModalProps = {
  title: string;
  description: string;
  onCancel?: () => void;
  onConfirm: () => void;
  children: (open: () => void) => React.ReactNode;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const cancel = () => {
    props.onCancel?.();
    close();
  };
  const confirm = () => {
    props.onConfirm();
    close();
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger>{props.children(open)}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{props.title}</DialogHeader>
        <DialogDescription>{props.description}</DialogDescription>
        <DialogFooter className="flex items-center gap-2">
          <Button onClick={cancel}>Anuluj</Button>
          <Button onClick={confirm}>Potwierdź</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
