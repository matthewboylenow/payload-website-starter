import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { Archive } from '../blocks/ArchiveBlock/config'
import { CallToAction } from '../blocks/CallToAction/config'
import { Content } from '../blocks/Content/config'
import { FormBlock } from '../blocks/Form/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { Video } from '../blocks/Video/config'
import { Testimonials } from '../blocks/Testimonials/config'
import { TabsAccordion } from '../blocks/TabsAccordion/config'
import { Stats } from '../blocks/Stats/config'
import { Timeline } from '../blocks/Timeline/config'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'

export const Blocks: CollectionConfig = {
  slug: 'blocks',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'blockType', 'updatedAt'],
    useAsTitle: 'name',
    description: 'Create reusable blocks that can be referenced across multiple pages',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'A descriptive name to identify this block',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description of what this block is used for',
      },
    },
    {
      name: 'block',
      type: 'blocks',
      label: 'Block Content',
      minRows: 1,
      maxRows: 1,
      blocks: [
        CallToAction,
        Content,
        MediaBlock,
        Archive,
        FormBlock,
        Video,
        Testimonials,
        TabsAccordion,
        Stats,
        Timeline,
        Banner,
        Code,
      ],
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'CTA', value: 'cta' },
        { label: 'Content', value: 'content' },
        { label: 'Media', value: 'media' },
        { label: 'Interactive', value: 'interactive' },
        { label: 'Social Proof', value: 'social-proof' },
        { label: 'Forms', value: 'forms' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Categorize this block for easier filtering',
      },
    },
  ],
  timestamps: true,
}
