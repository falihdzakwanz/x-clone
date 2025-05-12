import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const tweetType = defineType({
  name: "tweet",
  title: "Tweet",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text in Tweet",
      type: "string",
    }),
    defineField({
      name: "blockTweet",
      title: "Block Tweet",
      description: "ADMIN Controls: Toggle if Tweet is deemed inappropriate",
      type: "boolean",
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
      name: "image",
      title: "Tweet Image",
      type: "string",
    }),
  ],
});
