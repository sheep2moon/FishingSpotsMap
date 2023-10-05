import React, { FormEvent, useState } from "react";
import { ViewHeader, ViewTitle } from "../../components/ui/view-header";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputWithLabel from "../../components/ui/input-with-label";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import ImageInput from "../../components/ui/image-input";
import AttachmentInput from "../../components/ui/attachment-input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  IconFile,
  IconFilePencil,
  IconFileTypePdf,
  IconHash,
  IconPdf,
  IconPointFilled,
  IconX,
} from "@tabler/icons-react";
import { api } from "../../lib/utils/api";
import { Toggle } from "../../components/ui/toggle";
import { Tag } from "@prisma/client";
import { cn } from "../../lib/utils/cn";
import Image from "next/image";
import { useDebugLog } from "../../hooks/useDebugLog";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconFileTypeTxt } from "@tabler/icons-react";

type FormValues = {
  discussionName: string;
  discussionTags: string;
  discussionContent: string;
  discussionAttachments: FileList;
};

const NewDiscussion = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const tagsQuery = api.tags.getTags.useQuery();
  const [attachmentsContainer] = useAutoAnimate();

  const handleAddAttachment = (attachments: File[]) => {
    setAttachments((prev) => [...prev, ...attachments]);
  };
  const handleDeleteAttachment = (attachment: File) => {
    setAttachments((prev) => prev.filter((file) => file !== attachment));
  };

  const handleToggleTag = (tag: Tag, pressed: boolean) => {
    if (!pressed)
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
    if (pressed) setSelectedTags((prev) => [...prev, tag]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      <Card>
        <CardHeader>
          <CardTitle>
            <IconFilePencil size="1.8rem" />
            Stwórz nową dyskusje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label>Tytuł dyskusji</Label>
            <Input className="text-xl" />
            <Label>Treść</Label>
            <Textarea className="text-xl" id="discussionContent" rows={6} />

            <Label>Tagi</Label>
            <div className="flex gap-2">
              {tagsQuery.data &&
                tagsQuery.data.map((tag) => (
                  <Toggle
                    pressed={selectedTags.includes(tag)}
                    onPressedChange={(pressed) => handleToggleTag(tag, pressed)}
                    variant="outline"
                    key={tag.id}
                  >
                    <IconHash
                      className={cn(
                        selectedTags.includes(tag) && "text-accent"
                      )}
                    />
                    {tag.name}
                  </Toggle>
                ))}
            </div>
            <FormSectionTitle
              title="Pliki"
              description="możesz załączyć zdjęcia, pliki txt/pdf/csv i inne"
              icon={<IconFile />}
            />

            <div className="flex flex-col gap-4">
              <AttachmentInput onAttachmentAdd={handleAddAttachment} />
              <div className="flex flex-col gap-2" ref={attachmentsContainer}>
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 transition-all hover:bg-primary-dark/40"
                  >
                    <div className="relative flex aspect-square w-12 items-center justify-center rounded-md dark:bg-primary-dark">
                      {attachment.type.startsWith("image/") && (
                        <Image
                          className="object-cover"
                          src={URL.createObjectURL(attachment)}
                          alt={attachment.name}
                          fill
                        />
                      )}
                      {attachment.type.startsWith("application/pdf") && (
                        <IconFileTypePdf size="2.2rem" />
                      )}
                      {attachment.type.startsWith("text") && (
                        <IconFileTypeTxt size="2.2rem" />
                      )}
                    </div>

                    <div className="text-sm font-bold">{attachment.name}</div>
                    <Button
                      onClick={() => handleDeleteAttachment(attachment)}
                      className="ml-auto"
                      variant="ghost"
                    >
                      <IconX />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-fit px-8 text-xl" type="submit">
              Stwórz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDiscussion;

const FormSectionTitle = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xl">{title}</span>
      <p className="text-sm dark:text-primary/60">{description}</p>
    </div>
  );
};
