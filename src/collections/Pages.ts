import { CollectionConfig } from "payload/types";

export const Pages: CollectionConfig = {
  slug: "Pages",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "Title",
      type: "text",
      required: true,
    },
    {
      name: "Body",
      type: "richText",
      required: true,
    },
    {
      name: "Created at",
      type: "date",
      required: true,
    },
  ],
};
