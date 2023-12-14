import Head from "next/head";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { api } from "../../lib/utils/api";
import Avatar from "../../components/ui/avatar";
import { timePassedFromNow } from "../../lib/helpers/timePassedFromNow";
import Tag from "../../components/ui/tag";
import AttachmentPreview from "../../components/ui/attachment-preview";
import { IconArrowLeft, IconPaperclip } from "@tabler/icons-react";
import { Separator } from "../../components/ui/separator";
import { InternalLink } from "../../components/ui/internal-link";
import Comments from "../../components/comments/comments";
import LoadingView from "../../components/ui/loading-view";

const DiscussionPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const discussionQuery = api.discussion.getDiscussionById.useQuery(
    { id },
    { enabled: !!id }
  );

  if (!discussionQuery.data) return <LoadingView />;

  return (
    <>
      <Head>
        <title>Łowiska - dyskusja</title>
      </Head>
      <div className="mx-auto mb-80 mt-16 w-full max-w-screen-xl">
        <InternalLink variant="link" href="/discussion">
          <IconArrowLeft />
          Powrót do wszystkich dyskusji
        </InternalLink>
        <Card className="bg-primary-100">
          <CardHeader className="pb-4">
            <div className="flex justify-between">
              <CardTitle className="border-l-4 border-accent pl-2">
                {discussionQuery.data.title}
              </CardTitle>
              <span className="text-sm">
                {timePassedFromNow(discussionQuery.data.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar
                className="w-6"
                imageSrc={discussionQuery.data.author.image || ""}
              />
              <span className="text-info-300">
                {discussionQuery.data.author.name}
              </span>
            </div>
          </CardHeader>
          <CardContent className="">
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
            <Comments targetId={id} targetType="DISCUSSION" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DiscussionPage;
