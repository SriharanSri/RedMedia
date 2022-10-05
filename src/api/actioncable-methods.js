import cable from "./actioncable-utils";

export const accountDetail = (slug, value) => {
  cable.subscriptions.create(
    { channel: "UserChannel", room: `account_${slug}` },
    {
      connected: () => {},
      received: (data) => {
        value(data);
      },
    }
  );
};
