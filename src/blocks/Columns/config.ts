import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { getAllBlockFields } from '@/fields/blockFields'
import { link } from '@/fields/link'

const columnContentFields: Field[] = [
  {
    name: 'contentType',
    type: 'select',
    label: 'Content Type',
    defaultValue: 'richText',
    required: true,
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Image / Media',
        value: 'media',
      },
      {
        label: 'Video',
        value: 'video',
      },
      {
        label: 'Code',
        value: 'code',
      },
      {
        label: 'Custom HTML / Embed',
        value: 'customHTML',
      },
      {
        label: 'CTA Button',
        value: 'cta',
      },
    ],
  },
  // Rich Text Content
  {
    name: 'richText',
    type: 'richText',
    label: 'Rich Text Content',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'richText',
    },
  },
  // Media Content
  {
    name: 'media',
    type: 'upload',
    label: 'Image / Media',
    relationTo: 'media',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'media',
    },
  },
  {
    name: 'caption',
    type: 'text',
    label: 'Caption',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'media',
    },
  },
  // Video Content
  {
    name: 'videoType',
    type: 'select',
    label: 'Video Type',
    defaultValue: 'youtube',
    options: [
      {
        label: 'YouTube',
        value: 'youtube',
      },
      {
        label: 'Vimeo',
        value: 'vimeo',
      },
      {
        label: 'Upload',
        value: 'upload',
      },
    ],
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'video',
    },
  },
  {
    name: 'videoUrl',
    type: 'text',
    label: 'Video URL',
    admin: {
      condition: (_data, siblingData) =>
        siblingData?.contentType === 'video' &&
        (siblingData?.videoType === 'youtube' || siblingData?.videoType === 'vimeo'),
    },
  },
  {
    name: 'videoUpload',
    type: 'upload',
    label: 'Upload Video',
    relationTo: 'media',
    admin: {
      condition: (_data, siblingData) =>
        siblingData?.contentType === 'video' && siblingData?.videoType === 'upload',
    },
  },
  // Code Content
  {
    name: 'code',
    type: 'code',
    label: 'Code',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'code',
      language: 'typescript',
    },
  },
  {
    name: 'language',
    type: 'select',
    label: 'Language',
    defaultValue: 'typescript',
    options: [
      { label: 'TypeScript', value: 'typescript' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'CSS', value: 'css' },
      { label: 'HTML', value: 'html' },
      { label: 'JSON', value: 'json' },
      { label: 'Bash', value: 'bash' },
      { label: 'Python', value: 'python' },
    ],
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'code',
    },
  },
  // Custom HTML Content
  {
    name: 'customHTML',
    type: 'textarea',
    label: 'Custom HTML / Embed Code',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'customHTML',
      description: 'Paste your custom HTML or embed code (iFrames, widgets, etc.)',
    },
  },
  // CTA Button
  {
    name: 'ctaText',
    type: 'text',
    label: 'Button Text',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'cta',
    },
  },
  link({
    overrides: {
      label: 'Button Link',
      admin: {
        condition: (_data, siblingData) => siblingData?.contentType === 'cta',
      },
    },
  }),
  // Column-level styling
  {
    name: 'verticalAlignment',
    type: 'select',
    label: 'Vertical Alignment',
    defaultValue: 'top',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Center', value: 'center' },
      { label: 'Bottom', value: 'bottom' },
    ],
  },
  {
    name: 'textAlign',
    type: 'select',
    label: 'Text Alignment',
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  {
    name: 'padding',
    type: 'select',
    label: 'Padding',
    defaultValue: 'medium',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
  },
]

export const Columns: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    singular: 'Columns Block',
    plural: 'Columns Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'Column Layout',
      defaultValue: '50-50',
      required: true,
      options: [
        { label: '50% / 50%', value: '50-50' },
        { label: '33% / 67%', value: '33-67' },
        { label: '67% / 33%', value: '67-33' },
        { label: '40% / 60%', value: '40-60' },
        { label: '60% / 40%', value: '60-40' },
        { label: '30% / 70%', value: '30-70' },
        { label: '70% / 30%', value: '70-30' },
        { label: '25% / 75%', value: '25-75' },
        { label: '75% / 25%', value: '75-25' },
        { label: '33% / 33% / 33%', value: '33-33-33' },
        { label: '25% / 25% / 25% / 25%', value: '25-25-25-25' },
      ],
    },
    {
      name: 'reverseOnMobile',
      type: 'checkbox',
      label: 'Reverse Column Order on Mobile',
      defaultValue: false,
      admin: {
        description: 'When columns stack on mobile, show them in reverse order',
      },
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Gap Between Columns',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'XLarge', value: 'xlarge' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 2,
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description: 'Add content to each column. The number of columns should match your layout choice.',
      },
      fields: columnContentFields,
    },
    ...getAllBlockFields(),
  ],
}
