import type { Block } from 'payload'

import { getAllBlockFields } from '@/fields/blockFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ...getAllBlockFields(),
  ],
}
