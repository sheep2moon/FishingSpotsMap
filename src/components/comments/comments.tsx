import React, { useState } from "react";
import { type RouterInputs, api } from "../../lib/utils/api";
import Indicator from "../ui/indicator";
import SortingMenu, { type SortingOption } from "../sorting-menu";
import CommentSection from "./comment-section";

type CommentsProps = {
  targetId: string;
  targetType: RouterInputs["comment"]["createComment"]["targetType"];
};

type CommentSortingOption = SortingOption & {
  key: RouterInputs["comment"]["getComments"]["orderBy"];
};

const sortingOptions: CommentSortingOption[] = [
  {
    key: "oldest",
    name: "Od najstarszych",
  },
  {
    key: "latest",
    name: "Od najnowszych",
  },
  {
    key: "active",
    name: "Ostatnio aktywne",
  },
];

const Comments = (props: CommentsProps) => {
  const [sortingOption, setSortingOption] = useState<CommentSortingOption>(
    sortingOptions.find(
      (option) => option.key === "oldest"
    ) as CommentSortingOption
  );
  const commentsCountQuery = api.comment.getCommentsCount.useQuery({
    discussionId:
      props.targetType === "DISCUSSION" ? props.targetId : undefined,
    catchId: props.targetType === "CATCH" ? props.targetId : undefined,
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="flex items-center gap-2">
          Komentarze <Indicator>{commentsCountQuery.data?.length}</Indicator>
        </h2>

        <SortingMenu
          options={sortingOptions}
          activeOption={sortingOption}
          setActiveOption={setSortingOption}
        />
      </div>
      {commentsCountQuery.data && (
        <CommentSection
          count={commentsCountQuery.data?.length}
          sortingKey={sortingOption.key}
          {...props}
        />
      )}
    </div>
  );
};

export default Comments;
