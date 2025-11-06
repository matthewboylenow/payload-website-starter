import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      label: 'Height',
      options: [
        {
          label: 'Small (40vh)',
          value: 'small',
        },
        {
          label: 'Medium (60vh)',
          value: 'medium',
        },
        {
          label: 'Large (80vh)',
          value: 'large',
        },
        {
          label: 'Full Screen (100vh)',
          value: 'full',
        },
        {
          label: 'Auto (Content Height)',
          value: 'auto',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            TextColorFeature({
              predefinedColors: [
                { label: 'Brand', value: '#C0367B' },
                { label: 'White', value: '#FFFFFF' },
                { label: 'Black', value: '#000000' },
                { label: 'Gray', value: '#6B7280' },
                { label: 'Primary', value: '#3B82F6' },
                { label: 'Secondary', value: '#8B5CF6' },
                { label: 'Accent', value: '#F59E0B' },
              ],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
