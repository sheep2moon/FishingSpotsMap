import type { User } from "@prisma/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Avatar from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "../../lib/utils/api";
import { uploadFile } from "../../server/uploadFile";
import { getAvatarImageSrc } from "../../lib/utils/getImageSrc";

type UserSettingsProps = {
  userData: User;
};

const UserSettings = ({ userData }: UserSettingsProps) => {
  const [currentName, setCurrentName] = useState<string | null>(userData.name);
  const [currentAvatar, setCurrentAvatar] = useState<{
    url: string | null;
    file: File | null;
  }>({ url: userData.image, file: null });
  const presignedImageUrlMutation =
    api.files.createPresignedImageUrl.useMutation();
  const { mutateAsync: updateUserData } =
    api.users.updateUserData.useMutation();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageFile = e.currentTarget.files?.[0];
    console.log(e.currentTarget.files);

    if (imageFile)
      setCurrentAvatar({
        url: URL.createObjectURL(imageFile),
        file: imageFile,
      });
  };

  const handleSubmit = async () => {
    if (currentName && currentName !== userData.name) {
      await updateUserData({ name: currentName });
    }
    if (currentAvatar.file) {
      const { url, fields } = await presignedImageUrlMutation.mutateAsync({
        folderName: "avatars",
        id: `avatar-${userData.id}`,
      });
      await uploadFile({ url, fields, file: currentAvatar.file });
      const newImageUrl = getAvatarImageSrc(userData.id);
      await updateUserData({ image: newImageUrl });
    }
  };
  const handleCancel = () => {
    setCurrentAvatar({ url: userData.image, file: null });
    setCurrentName(userData.name);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mx-auto">Tożsamość</CardTitle>
        <CardDescription className="mx-auto">
          Możesz zmienić nazwę oraz avatar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative">
          <label htmlFor="avatar-input">
            <input
              id="avatar-input"
              type="file"
              onChange={handleAvatarChange}
              className="peer absolute w-0 opacity-0"
            />
            <Avatar
              className="w-20 ring-primary-50 peer-focus:ring-2"
              imageSrc={currentAvatar.url || ""}
            />
          </label>
        </div>
        <Input
          className="mx-auto w-fit"
          value={currentName || ""}
          onChange={(e) => setCurrentName(e.target.value)}
        />
        <div className="flex h-8 gap-4">
          {(currentName !== userData.name || currentAvatar.file) && (
            <>
              <Button
                onClick={handleCancel}
                className="whitespace-nowrap"
                variant="secondary"
              >
                Odrzuć zmiany
              </Button>
              <Button onClick={() => void handleSubmit()}>Zapisz</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
