import { type SchemaTypeDefinition } from 'sanity'

import {tweetType} from './tweetType'
import {commentType} from './commentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tweetType, commentType],
}
