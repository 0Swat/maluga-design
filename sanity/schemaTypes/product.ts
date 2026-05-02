import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const productSchema = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    orderRankField({ type: 'product' }),
    defineField({
      name: 'name',
      title: 'Nazwa produktu',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Cena (np. "285 PLN")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'material',
      title: 'Materiał',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (r) => r.min(1).error('Dodaj przynajmniej jedno zdjęcie'),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'images.0' },
  },
})
