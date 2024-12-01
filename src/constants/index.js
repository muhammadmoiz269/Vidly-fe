import { notification } from "antd";

export const triggerNotification = (type, message, description) => {
  notification[type]({
    message: message || "Notification",
    description: description || "This is the default notification description.",
  });
};

export const productCategories = [
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Technology",
    value: "technology",
  },
  {
    label: "Decor",
    value: "decor",
  },
];

export const formatDateTime = (date) => {
  const readableDate = new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: true, // For AM/PM format
  });

  return readableDate;
};
