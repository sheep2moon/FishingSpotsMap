import { fisheryRouter } from "~/server/api/routers/fishery";
import { createTRPCRouter } from "~/server/api/trpc";
import { imagesRouter } from "./routers/images";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  fishery: fisheryRouter,
  images: imagesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
