import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('tweet').title('Tweet'),
      S.documentTypeListItem('comment').title('Comment'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['tweet', 'comment'].includes(item.getId()!),
      ),
    ])
