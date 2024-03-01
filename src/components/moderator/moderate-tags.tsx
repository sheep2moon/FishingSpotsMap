import React, { useState } from "react";
import InputWithLabel from "../ui/input-with-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { api } from "../../lib/utils/api";
import { IconHash } from "@tabler/icons-react";
import { Label } from "../ui/label";

const ModerateTags = () => {
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
  });
  const addTagMutation = api.tags.addTag.useMutation();
  const tagsQuery = api.tags.getTags.useQuery();

  const handleAddTag = async () => {
    setNewTag({ name: "", description: "" });
    await addTagMutation.mutateAsync(newTag);
    await tagsQuery.refetch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tagi</CardTitle>
        <CardDescription>Twórz, edytuj lub usuwaj tagi.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="ml-2 whitespace-nowrap text-lg">Dodaj nowy tag</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr_0.5fr]">
            <Input
              placeholder="nazwa tagu"
              className=""
              value={newTag.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTag((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              placeholder="opis tagu"
              className="w-full"
              value={newTag.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTag((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <Button
              disabled={addTagMutation.isLoading}
              onClick={() => void handleAddTag()}
            >
              Dodaj
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col space-y-2 rounded-sm ">
          {tagsQuery.data &&
            tagsQuery.data.map((tag) => (
              <div
                className="divide grid grid-cols-1 divide-y-2 divide-primary-400/30 rounded-md p-3 dark:divide-primary-600/30 dark:bg-primary-dark sm:grid-cols-[120px_1fr] sm:divide-x-2 sm:divide-y-0"
                key={tag.id}
              >
                <span className="mb-1 flex items-center sm:mb-0">
                  <IconHash />
                  {tag.name}
                </span>
                <span className="pt-2 sm:pl-2 sm:pt-0">{tag.description}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModerateTags;
