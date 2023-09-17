import React, { type ChangeEvent, useState } from "react";
import MarkdownDialogWrapper from "./MarkdownDialogWrapper";
import {
  IconEye,
  IconFilePencil,
  IconInfoSquareRounded,
  IconMarkdown,
  IconReportSearch,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MarkdownContent from "./MarkdownContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Close } from "@radix-ui/react-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

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
    <Card>
      <CardHeader>
        <CardTitle>
          <IconMarkdown size="2rem" />
          Opis
        </CardTitle>
        <CardDescription>
          Opisz najważniejsze informacje o łowisku, minimum 50 znaków.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          {markdownText.length > 0 ? (
            <DialogTrigger asChild className="w-full text-start">
              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer rounded-md border border-primary-200 p-2 transition-all hover:bg-primary-100 dark:border-primary-dark hover:dark:bg-primary-800"
              >
                <MarkdownContent text={markdownText} />
              </div>
            </DialogTrigger>
          ) : (
            <DialogTrigger asChild>
              <Button variant="outline">Edytuj opis</Button>
            </DialogTrigger>
          )}
          <DialogContent className="z-[1000] h-screen max-w-none">
            <DialogHeader className="h-fit">
              <DialogTitle className="text-3xl">
                <IconFilePencil size="2rem" />
                Opis
              </DialogTitle>
              <DialogDescription className="ml-auto mr-8">
                <HoverCard>
                  <HoverCardTrigger>
                    <Button className="m-0 h-fit p-0" variant="link">
                      <IconInfoSquareRounded className="mr-1 text-info dark:text-info-dark" />
                      Pomoc
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent align="end">
                    <h4 className="text-xl">Czym jest Markdown?</h4>
                    <p className="mt-2">
                      Markdown to język znaczników do prostego tworzenia
                      sformatowanego tekstu
                    </p>
                    <a
                      href="https://typografia.info/artykuly/markdown"
                      target="_blank"
                      className="mt-2 block w-fit bg-primary px-2 py-1 font-dosis text-base font-bold text-primary-dark"
                    >
                      Poradnik
                    </a>
                    <p className="mt-4 underline">
                      Możesz również napisać opis standardowo.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </DialogDescription>
            </DialogHeader>
            <div className="grid h-full min-h-0 grid-cols-1 gap-2 overflow-y-auto p-1 sm:grid-cols-2">
              <div className="flex h-[300px] flex-col rounded-sm bg-primary-200 p-1 dark:bg-primary-dark sm:h-auto sm:min-h-0">
                <h4 className="flex items-center gap-2 p-2">
                  <IconMarkdown size="1.5rem" />
                  Tekst źródłowy
                </h4>
                <Textarea
                  className="grow resize-none overflow-y-auto scrollbar-thin scrollbar-track-primary-dark hover:scrollbar-thumb-primary-600 dark:scrollbar-thumb-primary-700"
                  value={markdownText}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex h-[300px] min-h-0 flex-col rounded-sm bg-primary-200 p-1 dark:bg-primary-dark sm:h-auto">
                <h4 className="flex items-center gap-2 p-2">
                  <IconReportSearch size="1.5rem" />
                  Rezultat
                </h4>
                <MarkdownContent
                  className="h-full overflow-y-auto rounded-md bg-white p-2 scrollbar-thin scrollbar-track-primary-dark hover:scrollbar-thumb-primary-600 dark:bg-primary-950 dark:scrollbar-thumb-primary-700"
                  text={markdownText}
                />
              </div>
            </div>
            <DialogFooter className="h-fit">
              <Close>
                <Button>Zamknij</Button>
              </Close>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <MarkdownDialogWrapper isOpen={isOpen} close={close}>
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
                <MarkdownContent text={markdownText} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-2">
              <Button onClick={handleSave}>Zamknij</Button>
            </div>
          </div>
        </MarkdownDialogWrapper> */}
      </CardContent>
    </Card>
  );
};

export default MarkdownEditor;
