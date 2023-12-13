import { fisheryRouter } from "~/server/api/routers/fishery";
import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "./routers/users";
import { moderatorRouter } from "./routers/moderator";
import { notificationsRouter } from "./routers/notifications";
import { achievementsRouter } from "./routers/achievements";
import { tagsRouter } from "./routers/tags";
import { filesRouter } from "./routers/files";
import { discussionRouter } from "./routers/discussion";
import { catchRouter } from "./routers/catch";
import { commentRouter } from "./routers/comment";
import { reportRouter } from "./routers/report";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  fishery: fisheryRouter,
  files: filesRouter,
  users: usersRouter,
  moderator: moderatorRouter,
  notifications: notificationsRouter,
  achievements: achievementsRouter,
  discussion: discussionRouter,
  tags: tagsRouter,
  catch: catchRouter,
  comment: commentRouter,
  report: reportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
