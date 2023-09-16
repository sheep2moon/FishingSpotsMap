import React, { type ChangeEvent, useState } from "react";
import MarkdownDialogWrapper from "./MarkdownDialogWrapper";
import ReactMarkdown from "react-markdown";
import { IconEye } from "@tabler/icons-react";
import { Button } from "../ui/button";

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

  // const handleCancel = () => {
  //   close();
  // };

  const handleSave = () => {
    close();
  };
  return (
    <div className="flex flex-col gap-2">
      <h3>Opis</h3>
      {markdownText.length > 0 ? (
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-md border border-primary-200 p-2 transition-all hover:bg-primary-100 dark:border-primary-dark hover:dark:bg-primary-800"
        >
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)}>
          <Button variant="outline">Edytuj opis</Button>
        </div>
      )}
      <MarkdownDialogWrapper isOpen={isOpen} close={close}>
        <div className="flex h-full flex-col p-2">
          <div className="grid h-full w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 sm:grid-rows-1 ">
            <textarea
              className="rounded-sm bg-primary p-2 dark:bg-primary-dark"
              value={markdownText}
              onChange={handleInputChange}
            ></textarea>
            <div className="rounded-sm bg-primary p-2 dark:bg-primary-dark">
              <div className="flex items-center justify-center gap-2 text-center text-lg">
                <IconEye />
                Podgląd
              </div>
              <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-2">
            <Button onClick={handleSave}>Zamknij</Button>
          </div>
        </div>
      </MarkdownDialogWrapper>
    </div>
  );
};

export default MarkdownEditor;
