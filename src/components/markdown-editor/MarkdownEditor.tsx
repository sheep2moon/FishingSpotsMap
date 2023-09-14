import React, { ChangeEvent, useState } from "react";
import MarkdownDialogWrapper from "./MarkdownDialogWrapper";
import ReactMarkdown from "react-markdown";
import Button from "../common/Button";
import { IconEye } from "@tabler/icons-react";

// type MarkdownEditorProps = {
//   initialText: string;
// };

const MarkdownEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
  };
  const close = () => setIsOpen(false);

  const handleCancel = () => {
    close();
  };

  const handleSave = () => {
    close();
  };
  return (
    <div>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
      <Button onClick={() => setIsOpen(true)}>Edytuj opis</Button>
      <MarkdownDialogWrapper isOpen={isOpen} close={close}>
        <div className="flex h-full flex-col p-2">
          <div className="grid h-full w-full grid-cols-2 gap-2 ">
            <textarea
              className="rounded-sm bg-primary-950 p-2"
              value={markdownText}
              onChange={handleInputChange}
            ></textarea>
            <div className="rounded-sm bg-primary-950 p-2">
              <div className="flex items-center justify-center gap-2 text-center text-lg dark:bg-primary-dark">
                <IconEye />
                Podgląd
              </div>
              <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-2">
            <Button onClick={handleCancel}>Anuluj</Button>
            <Button onClick={handleSave}>Zapisz</Button>
          </div>
        </div>
      </MarkdownDialogWrapper>
    </div>
  );
};

export default MarkdownEditor;
