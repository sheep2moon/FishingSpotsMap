type Notifications = {
  "new-review": { spotName: string };
};

export const get_notification_message = <K extends keyof Notifications>(
  type: K,
  values: Notifications[K]
) => {
  switch (type) {
    case "new-review":
      return `Dodano nową opinię do łowiska ${values.spotName}.`;
    default:
      return "";
  }
};
