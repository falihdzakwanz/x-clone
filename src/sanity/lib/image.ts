import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
};
// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder(config)

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
