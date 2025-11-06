import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { VideoBlock } from '@/blocks/Video/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TabsAccordionBlock } from '@/blocks/TabsAccordion/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { Code as CodeBlock } from '@/blocks/Code/Component.client'
import { BlockWrapper } from '@/components/BlockWrapper'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  video: VideoBlock,
  testimonials: TestimonialsBlock,
  tabsAccordion: TabsAccordionBlock,
  stats: StatsBlock,
  timeline: TimelineBlock,
  banner: BannerBlock,
  code: CodeBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <BlockWrapper
                  key={index}
                  // @ts-expect-error block types may not have all these fields
                  blockAnchor={block.blockAnchor}
                  // @ts-expect-error block types may not have all these fields
                  backgroundColor={block.backgroundColor}
                  // @ts-expect-error block types may not have all these fields
                  spacing={block.spacing}
                  // @ts-expect-error block types may not have all these fields
                  visibility={block.visibility}
                  // @ts-expect-error block types may not have all these fields
                  animation={block.animation}
                  // @ts-expect-error block types may not have all these fields
                  typography={block.typography}
                  // @ts-expect-error block types may not have all these fields
                  customCSS={block.customCSS}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </BlockWrapper>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
