import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'maluga-design',
  title: 'Maluga Design — CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Zawartość')
          .items([
            orderableDocumentListDeskItem({
              type: 'product',
              title: 'Produkty',
              S,
              context,
            }),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
