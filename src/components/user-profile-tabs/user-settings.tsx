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

type UserSettingsProps = {
  userData: User;
};

const UserSettings = ({ userData }: UserSettingsProps) => {
  const [currentName, setCurrentName] = useState<string | null>(userData.name);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(
    userData.image
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputFile = e.currentTarget.files?.[0];
    if (inputFile) setCurrentAvatar(URL.createObjectURL(inputFile));
  };

  const handleCancel = () => {
    setCurrentAvatar(userData.image);
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
              imageSrc={currentAvatar || ""}
            />
          </label>
        </div>
        <Input
          className="w-fit"
          value={currentName || ""}
          onChange={(e) => setCurrentName(e.target.value)}
        />
        <div className="flex h-8 gap-4">
          {(currentName !== userData.name ||
            currentAvatar !== userData.image) && (
            <>
              <Button onClick={handleCancel} variant="secondary">
                Odrzuć zmiany
              </Button>
              <Button disabled>Zapisz</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
