import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { getAllBlockFields } from '@/fields/blockFields'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
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
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
          admin: {
            description: 'The number or value (e.g., "100", "99%", "$5M")',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'What this statistic represents',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional additional context',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Users', value: 'users' },
            { label: 'Star', value: 'star' },
            { label: 'Chart', value: 'chart' },
            { label: 'Trophy', value: 'trophy' },
            { label: 'Lightning', value: 'lightning' },
            { label: 'Globe', value: 'globe' },
            { label: 'Heart', value: 'heart' },
            { label: 'Rocket', value: 'rocket' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'animate',
          type: 'checkbox',
          label: 'Animate Number',
          defaultValue: true,
          admin: {
            description: 'Animate counting up to the value',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (2 columns)', value: 'grid-2' },
        { label: 'Grid (3 columns)', value: 'grid-3' },
        { label: 'Grid (4 columns)', value: 'grid-4' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    ...getAllBlockFields(),
  ],
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
}
