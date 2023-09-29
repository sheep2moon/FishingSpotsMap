import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  IconBell,
  IconCrown,
  IconInfoSquareRounded,
  IconMail,
  IconMailOpened,
  IconMapPinStar,
  IconX,
} from "@tabler/icons-react";
import { api } from "../../lib/utils/api";
import { Separator } from "../ui/separator";
import { type NotificationType } from "@prisma/client";
import Link from "next/link";
import { cn } from "../../lib/utils/cn";

export const notification_icons: Record<NotificationType, React.ReactNode> = {
  SPOT: <IconMapPinStar className="text-emerald-300" />,
  INFORMATION: <IconInfoSquareRounded className="text-sky-600" />,
  MODERATE: <IconCrown className="text-accent" />,
};

const NotificationsPopover = () => {
  const notificationQuery = api.notifications.getNotifications.useQuery();
  const readMutation = api.notifications.readNotification.useMutation();
  const deleteMutation = api.notifications.deleteNotification.useMutation();

  const handleReadNotification = async (notificationId: string) => {
    await readMutation.mutateAsync({ notificationId });
    await notificationQuery.refetch();
  };

  const handleDeleteNotification = async (notificationId: string) => {
    await deleteMutation.mutateAsync({ notificationId });
    await notificationQuery.refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            onClick={() => void notificationQuery.refetch()}
            variant="ghost"
            className="p-2"
          >
            <IconBell />
          </Button>
          {notificationQuery.data?.some(
            (notification) => !notification.read
          ) && (
            <span className="absolute bottom-1 left-1 block aspect-square w-2 rounded-full bg-emerald-300"></span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-[1001] w-full max-w-md">
        <div className="p-2">
          {notificationQuery.data?.length === 0
            ? "Brak powiadomień"
            : "Powiadomienia"}
        </div>
        <Separator />
        <div className="flex w-full flex-col gap-2 py-2">
          {notificationQuery.data?.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex gap-2 rounded-md",
                !notification.read && "bg-primary/10"
              )}
            >
              <Link
                href="/"
                className="flex gap-4 rounded-md p-2 dark:hover:bg-primary-dark"
              >
                <span>{notification_icons[notification.type]}</span>
                {notification.comment}
              </Link>
              <div className="flex flex-col">
                <Button
                  onClick={() => void handleReadNotification(notification.id)}
                  variant="ghost"
                  className="p-2"
                  disabled={readMutation.isLoading || notification.read}
                >
                  {notification.read ? <IconMailOpened /> : <IconMail />}
                </Button>
                <Button
                  onClick={() => void handleDeleteNotification(notification.id)}
                  variant="ghost"
                  className="p-2"
                >
                  <IconX />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
