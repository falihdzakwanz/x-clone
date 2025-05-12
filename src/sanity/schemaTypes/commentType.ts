import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "comment",
      title: "Comment",
      type: "string",
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "profileImg",
      title: "Profile Image",
      type: "string",
    }),
        defineField({
          name: "tweet",
          title: "Tweet",
          description: "Reference the Tweet the Comment is associated to:",
          type: "reference",
          to: {
            type: "tweet"
          }
        }),
  ],
});
