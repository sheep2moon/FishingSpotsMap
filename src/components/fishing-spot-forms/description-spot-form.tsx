import React, { useRef, type ChangeEvent } from "react";
import {
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
import MarkdownContent from "../markdown-editor/MarkdownContent";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Close } from "@radix-ui/react-dialog";
import { type FSpotData } from "../../../schemas/fishing-spot.schema";

type DescriptionSpotFormProps = Pick<FSpotData, "description"> & {
  setDescription: (d: string) => void;
};

const DescriptionSpotForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & DescriptionSpotFormProps
>(({ description, setDescription, ...props }, ref) => {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDescription(input);
  };
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnOpen = (open: boolean) => {
    if (open && descriptionTextAreaRef.current) {
      descriptionTextAreaRef.current.focus();
    }
    if (open === false && description.trim().length === 0) {
      setDescription("");
    }
  };

  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle>
          <IconMarkdown />
          Opis
        </CardTitle>
        <CardDescription>
          Opisz najważniejsze informacje o łowisku, minimum 50 znaków.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog onOpenChange={handleOnOpen}>
          {description.length > 0 ? (
            <DialogTrigger asChild className="w-full text-start">
              <div className="cursor-pointer rounded-md border border-primary-200 p-2 transition-all hover:bg-primary-100 dark:border-primary-dark hover:dark:bg-primary-800">
                <MarkdownContent text={description} />
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
              <div className="ml-auto mr-8">
                <a
                  href="https://typografia.info/artykuly/markdown"
                  target="_blank"
                  className="mt-2 flex w-fit rounded-md px-2 py-1 text-base font-semibold text-info-50 underline-offset-4 hover:underline"
                >
                  <IconInfoSquareRounded className="mr-1 text-info dark:text-info-400" />
                  Poradnik Markdown
                </a>
                {/* <HoverCard defaultOpen={false} open={isHoverCardOpen}>
                  <HoverCardTrigger asChild>
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
                </HoverCard> */}
              </div>
            </DialogHeader>
            <div className="grid h-full min-h-0 grid-cols-1 gap-2 overflow-y-auto p-1 sm:grid-cols-2">
              <div className="flex h-[300px] flex-col rounded-sm bg-primary-200 p-1 dark:bg-primary-dark sm:h-auto sm:min-h-0">
                <h4 className="flex items-center gap-2 p-2">
                  <IconMarkdown size="1.5rem" />
                  Tekst źródłowy
                </h4>
                <Textarea
                  className="grow resize-none overflow-y-auto scrollbar-thin scrollbar-track-primary-dark hover:scrollbar-thumb-primary-600 dark:scrollbar-thumb-primary-700"
                  ref={descriptionTextAreaRef}
                  value={description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex h-[300px] min-h-0 flex-col rounded-sm bg-primary-200 p-1 dark:bg-primary-dark sm:h-auto">
                <h4 className="flex items-center gap-2 p-2">
                  <IconReportSearch size="1.5rem" />
                  Podgląd
                </h4>
                <MarkdownContent
                  className="h-full overflow-y-auto rounded-md bg-white p-2 scrollbar-thin scrollbar-track-primary-dark hover:scrollbar-thumb-primary-600 dark:bg-primary-950 dark:scrollbar-thumb-primary-700"
                  text={description}
                />
              </div>
            </div>
            <DialogFooter className="h-fit">
              <Close asChild>
                <Button>Zamknij</Button>
              </Close>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
});

DescriptionSpotForm.displayName = "DescriptionSpotForm";

export { DescriptionSpotForm };
