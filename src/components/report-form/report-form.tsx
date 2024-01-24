import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useReportFormStore } from "../../zustand/report-form-store";
import { api } from "../../lib/utils/api";
import { Input } from "../ui/input";
import InputWithLabel from "../ui/input-with-label";

const ReportForm = () => {
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const { isOpen, close, targetType, targetId } = useReportFormStore(
    (store) => store
  );
  const { mutateAsync: createReport, isLoading } =
    api.report.createReport.useMutation();

  const handleReport = async () => {
    await createReport({ content, targetType, targetId, contactEmail: email });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="mb-4">Utwórz zgłoszenie</DialogTitle>
          {targetId && (
            <DialogDescription>Zgłoszenie dotyczy {targetId}</DialogDescription>
          )}
        </DialogHeader>
        <Textarea
          placeholder="Treść zgłoszenia"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <InputWithLabel
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email kontaktowy (opcjonalnie)"
          placeholder="adres email"
          type="email"
          className="max-w-none"
        />
        <Button
          className="mt-4"
          disabled={isLoading}
          onClick={() => void handleReport()}
        >
          Wyślij
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;
