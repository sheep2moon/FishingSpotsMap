import React, { useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import AttachmentInput from "../../components/ui/attachment-input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  IconAlignRight,
  IconCategory,
  IconFile,
  IconFileTypePdf,
  IconHash,
  IconWriting,
  IconX,
} from "@tabler/icons-react";
import { api } from "../../lib/utils/api";
import { Toggle } from "../../components/ui/toggle";
import { cn } from "../../lib/utils/cn";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconFileTypeTxt } from "@tabler/icons-react";

import { z } from "zod";
import ErrorMessages from "../../components/ui/error-messages";
import { tagSchema } from "../../../schemas/tag.schema";
import { type Attachment } from "@prisma/client";
import { getAttachmentSrc } from "../../lib/utils/getImageSrc";
import { uploadFile } from "../../server/uploadFile";

const discussionSchema = z.object({
  title: z.string().min(20, "Tytuł powinien mieć minimum 20 znaków"),
  content: z
    .string()
    .min(50, "Treść dyskusji powinna zawierać minimum 50 znaków"),
  tags: tagSchema.array().min(1, "Dodaj przynajmniej jeden tag/kategorie"),
  attachments: z
    .array(z.custom<File>((file) => file instanceof File))
    .max(4, "Maksymalna ilość załączników to 4"),
});
type DiscussionSchemaData = z.infer<typeof discussionSchema>;

const NewDiscussion = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newDiscussionData, setNewDiscussionData] =
    useState<DiscussionSchemaData>({
      attachments: [],
      content: "",
      tags: [],
      title: "",
    });
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const tagsQuery = api.tags.getTags.useQuery();
  const { mutateAsync: createPresignedAttachmentUrl } =
    api.files.createPresignedAttachmentUrl.useMutation();
  const { mutateAsync: createDiscussion } =
    api.discussion.createDiscussion.useMutation();
  const [attachmentsContainer] = useAutoAnimate();
  const [errorsContainer] = useAutoAnimate();

  const handleAddAttachment = (attachments: File[]) => {
    setNewDiscussionData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...attachments],
    }));
  };
  const handleDeleteAttachment = (attachment: File) => {
    setNewDiscussionData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((file) => file !== attachment),
    }));
  };

  const handleToggleTag = (
    tag: DiscussionSchemaData["tags"][number],
    pressed: boolean
  ) => {
    if (!pressed)
      setNewDiscussionData((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }));
    if (pressed)
      setNewDiscussionData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const parsingResults = discussionSchema.safeParse(newDiscussionData);
    console.log(parsingResults);
    if (!parsingResults.success) {
      setErrorMessages(
        parsingResults.error.issues.map((issue) => issue.message)
      );
      setIsSubmitting(false);
      return;
    }
    setErrorMessages([]);
    const dbAttachments: Pick<Attachment, "id" | "name" | "type" | "url">[] =
      [];
    // upload attachment to s3 bucket
    for (let i = 0; i < newDiscussionData.attachments.length; i++) {
      const currentAttachment = newDiscussionData.attachments[i];
      if (currentAttachment) {
        const { id, url, fields } = await createPresignedAttachmentUrl({
          fileType: currentAttachment.type,
        });
        await uploadFile({ url, fields, file: currentAttachment });
        const attachmentUrl = getAttachmentSrc(id);
        dbAttachments.push({
          id,
          name: currentAttachment.name,
          type: currentAttachment.type,
          url: attachmentUrl,
        });
      }
    }
    await createDiscussion({
      attachments: dbAttachments,
      content: newDiscussionData.content,
      tags: newDiscussionData.tags,
      title: newDiscussionData.title,
    });
    setIsSubmitting(false);
    console.log(newDiscussionData);

    console.log("submit");
  };
  return (
    <div className="mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-6 p-2 pb-16 text-xl">
      <Card>
        <CardHeader>
          <CardTitle>Stwórz nową dyskusje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <FormSectionTitle
              title="Tytuł"
              description=""
              icon={<IconWriting />}
            />
            <Input
              className="text-xl"
              value={newDiscussionData.title}
              onChange={(e) =>
                setNewDiscussionData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <FormSectionTitle
              title="Treść"
              description=""
              icon={<IconAlignRight />}
            />
            <Textarea
              value={newDiscussionData.content}
              onChange={(e) =>
                setNewDiscussionData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className="text-xl"
              id="discussionContent"
              rows={6}
            />

            <FormSectionTitle
              title="Tagi"
              description="zaznacz jakich tematów dotyczy dyskusja"
              icon={<IconCategory />}
            />
            <div className="flex gap-2">
              {tagsQuery.data &&
                tagsQuery.data.map((tag) => (
                  <Toggle
                    pressed={newDiscussionData.tags.includes(tag)}
                    onPressedChange={(pressed) => handleToggleTag(tag, pressed)}
                    variant="outline"
                    key={tag.id}
                  >
                    <IconHash
                      className={cn(
                        newDiscussionData.tags.includes(tag) && "text-accent"
                      )}
                    />
                    {tag.name}
                  </Toggle>
                ))}
            </div>
            <FormSectionTitle
              title="Pliki"
              description="możesz załączyć zdjęcia, pliki txt, pdf, csv i inne"
              icon={<IconFile />}
            />

            <div className="flex flex-col gap-4">
              <AttachmentInput onAttachmentAdd={handleAddAttachment} />
              <div className="flex flex-col gap-2" ref={attachmentsContainer}>
                {newDiscussionData.attachments.map((attachment, index) => (
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
            <div ref={errorsContainer}>
              <ErrorMessages errorMessages={errorMessages} />
            </div>
            <Button
              onClick={() => void handleSubmit()}
              className="w-fit px-8 text-xl"
              type="submit"
              disabled={isSubmitting}
            >
              Stwórz
            </Button>
          </div>
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
    <div className="mt-6 flex items-center gap-2">
      {icon}
      <span className="text-xl">{title}</span>
      <p className="text-sm dark:text-primary/60">{description}</p>
    </div>
  );
};
