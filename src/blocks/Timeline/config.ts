import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { getAllBlockFields } from '@/fields/blockFields'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'date',
          type: 'text',
          label: 'Date/Period',
          required: true,
          admin: {
            description: 'e.g., "2024", "Q1 2024", "January 2024"',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Check Circle', value: 'check' },
            { label: 'Star', value: 'star' },
            { label: 'Flag', value: 'flag' },
            { label: 'Lightbulb', value: 'lightbulb' },
            { label: 'Rocket', value: 'rocket' },
            { label: 'Calendar', value: 'calendar' },
          ],
          defaultValue: 'check',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical (Left aligned)', value: 'vertical' },
        { label: 'Vertical (Centered)', value: 'vertical-center' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    ...getAllBlockFields(),
  ],
  labels: {
    singular: 'Timeline Block',
    plural: 'Timeline Blocks',
  },
}
