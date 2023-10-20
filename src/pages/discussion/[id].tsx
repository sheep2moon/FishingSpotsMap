import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RouterOutputs, api } from "../../lib/utils/api";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Avatar from "../../components/ui/avatar";
import { timePassedFromNow } from "../../lib/helpers/timePassedFromNow";
import Tag from "../../components/ui/tag";
import AttachmentPreview from "../../components/ui/attachment-preview";
import { IconArrowLeft, IconPaperclip } from "@tabler/icons-react";
import NewComment, {
  NewCommentProps,
} from "../../components/discussion/new-comment";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { InternalLink } from "../../components/ui/internal-link";
import Comment from "../../components/discussion/comment";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export type NewCommentTarget = {
  replyTo?: RouterOutputs["discussion"]["getDiscussionById"]["comments"][number]["replyTo"];
  parentId?: string;
};

const DiscussionPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const discussionQuery = api.discussion.getDiscussionById.useQuery({ id });
  const [commentsContainer] = useAutoAnimate();
  const [newCommentProps, setNewCommentProps] = useState<NewCommentTarget>({
    parentId: undefined,
    replyTo: undefined,
  });

  if (!discussionQuery.data) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Łowiska - dyskusja</title>
      </Head>
      <div className="mx-auto mt-16 w-full max-w-screen-xl">
        <InternalLink variant="link" href="/discussion">
          <IconArrowLeft />
          Powrót do wszystkich dyskusji
        </InternalLink>
        <Card className="bg-primary-100">
          <CardHeader>
            <CardTitle className="border-l-4 border-accent pl-2">
              {discussionQuery.data.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Avatar
                className="w-8"
                imageSrc={discussionQuery.data.author.image || ""}
              />
              <span>{discussionQuery.data.author.name}</span>
              <span>{timePassedFromNow(discussionQuery.data.createdAt)}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p>{discussionQuery.data.content}</p>
            <div className="mt-4 flex gap-1">
              {discussionQuery.data.tags.map((tagR) => (
                <Tag tagName={tagR.tag.name} key={tagR.tagId} />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <span className="flex items-center gap-2 font-bold">
                <IconPaperclip />
                Załączniki
              </span>
              {discussionQuery.data.attachments.map((attachment) => (
                <AttachmentPreview
                  key={attachment.id}
                  url={attachment.url}
                  type={attachment.type}
                  name={attachment.name}
                />
              ))}
            </div>
            <Separator className="my-8" />
            <NewComment {...newCommentProps} discussionId={id} />
            <div className="flex flex-col gap-2" ref={commentsContainer}>
              {discussionQuery.data.comments.map((comment) => (
                <Comment
                  setNewCommentProps={setNewCommentProps}
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// export const getStaticProps = async (context: GetStaticPropsContext<{id: string}>) => {
//     const id = context.params?.id as string
//     const helpers =
//     return {
//         props: {},
//         revalidate: 4
//     }
// }

export default DiscussionPage;