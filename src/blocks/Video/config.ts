import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { getAllBlockFields } from '@/fields/blockFields'

export const Video: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  fields: [
    {
      name: 'videoType',
      type: 'select',
      label: 'Video Type',
      defaultValue: 'embed',
      options: [
        { label: 'Embed (YouTube, Vimeo)', value: 'embed' },
        { label: 'Upload', value: 'upload' },
      ],
      required: true,
    },
    {
      name: 'embedURL',
      type: 'text',
      label: 'Video Embed URL',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'embed',
        description: 'YouTube or Vimeo URL (e.g., https://www.youtube.com/watch?v=...)',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      label: 'Video File',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'upload',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: '16/9',
      options: [
        { label: '16:9 (Widescreen)', value: '16/9' },
        { label: '4:3 (Standard)', value: '4/3' },
        { label: '1:1 (Square)', value: '1/1' },
        { label: '21:9 (Ultra-wide)', value: '21/9' },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      defaultValue: false,
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
      defaultValue: false,
    },
    {
      name: 'muted',
      type: 'checkbox',
      label: 'Muted',
      defaultValue: false,
      admin: {
        description: 'Required for autoplay to work in most browsers',
      },
    },
    ...getAllBlockFields(),
  ],
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
}
