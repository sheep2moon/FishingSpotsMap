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
        <span className="mx-auto whitespace-nowrap">Nowy tag</span>
        <div className="flex gap-2">
          <Input
            placeholder="nazwa tagu"
            className="w-fit"
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
      </CardHeader>
      <CardContent>
        <div className="mt-8 flex flex-col space-y-2 rounded-sm ">
          {tagsQuery.data &&
            tagsQuery.data.map((tag) => (
              <div
                className="grid grid-cols-[120px_1fr] rounded-md p-3 dark:bg-primary-dark"
                key={tag.id}
              >
                <span className="flex items-start border-r-2 border-primary/20">
                  <IconHash />
                  {tag.name}
                </span>
                <span className="ml-4">{tag.description}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModerateTags;
