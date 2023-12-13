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

const ReportForm = () => {
  const [content, setContent] = useState("");
  const { isOpen, close, targetType, targetId } = useReportFormStore(
    (store) => store
  );
  const { mutateAsync: createReport, isLoading } =
    api.report.createReport.useMutation();

  const handleReport = async () => {
    await createReport({ content, targetType, targetId });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle>Nowe zgłoszenie</DialogTitle>
          {targetId && (
            <DialogDescription>Zgłoszenie dotyczy {targetId}</DialogDescription>
          )}
        </DialogHeader>
        <Textarea
          placeholder="Treść zgłoszenia"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button disabled={isLoading} onClick={() => void handleReport()}>
          Wyślij
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;
