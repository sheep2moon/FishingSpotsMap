import React, { useState } from "react";
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
import { IconFilePencil } from "@tabler/icons-react";

type FormValues = {
  discussionName: string;
  discussionTags: string;
  discussionContent: string;
  discussionAttachments: FileList;
};

const NewDiscussion = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const onAttachmentAdd = (attachment: File) => {
    setAttachments((prev) => [...prev, attachment]);
  };
  const handleSubmit = () => {
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
            <div className="flex flex-col gap-2">
              <Label>Tytuł dyskusji</Label>
              <Input className="text-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Treść</Label>
              <Textarea className="text-xl" id="discussionContent" rows={6} />
            </div>
            <AttachmentInput onAttachmentAdd={onAttachmentAdd} />
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
