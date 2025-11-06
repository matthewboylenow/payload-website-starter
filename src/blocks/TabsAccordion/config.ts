import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { getAllBlockFields } from '@/fields/blockFields'

export const TabsAccordion: Block = {
  slug: 'tabsAccordion',
  interfaceName: 'TabsAccordionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'tabs',
      options: [
        { label: 'Tabs', value: 'tabs' },
        { label: 'Accordion', value: 'accordion' },
        { label: 'Tabs on Desktop, Accordion on Mobile', value: 'responsive' },
      ],
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Tab/Accordion Label',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'defaultOpen',
      type: 'number',
      label: 'Default Open Item (index)',
      admin: {
        description: 'Which item should be open by default? (0 = first item, 1 = second, etc.)',
      },
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow Multiple Items Open (Accordion Only)',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode === 'accordion',
      },
    },
    ...getAllBlockFields(),
  ],
  labels: {
    singular: 'Tabs/Accordion Block',
    plural: 'Tabs/Accordion Blocks',
  },
}
