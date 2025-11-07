import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import type { ColumnsBlock as ColumnsBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
  disableInnerContainer?: boolean
} & ColumnsBlockType

const layoutClasses: Record<string, string> = {
  '50-50': 'md:grid-cols-2',
  '33-67': 'md:grid-cols-[1fr_2fr]',
  '67-33': 'md:grid-cols-[2fr_1fr]',
  '40-60': 'md:grid-cols-[2fr_3fr]',
  '60-40': 'md:grid-cols-[3fr_2fr]',
  '30-70': 'md:grid-cols-[3fr_7fr]',
  '70-30': 'md:grid-cols-[7fr_3fr]',
  '25-75': 'md:grid-cols-[1fr_3fr]',
  '75-25': 'md:grid-cols-[3fr_1fr]',
  '33-33-33': 'md:grid-cols-3',
  '25-25-25-25': 'md:grid-cols-4',
}

const gapClasses: Record<string, string> = {
  none: 'gap-0',
  small: 'gap-4',
  medium: 'gap-8',
  large: 'gap-12',
  xlarge: 'gap-16',
}

const verticalAlignmentClasses: Record<string, string> = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
}

const textAlignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const paddingClasses: Record<string, string> = {
  none: 'p-0',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
}

export const ColumnsBlock: React.FC<Props> = (props) => {
  const { layout = '50-50', gap = 'medium', columns, reverseOnMobile } = props

  return (
    <div className="container">
      <div
        className={cn(
          'grid grid-cols-1',
          layout ? layoutClasses[layout] : 'md:grid-cols-2',
          gap ? gapClasses[gap] : 'gap-8',
          reverseOnMobile && 'flex flex-col-reverse md:grid'
        )}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((column, index) => {
            const {
              contentType,
              richText,
              media,
              caption,
              videoType,
              videoUrl,
              videoUpload,
              code,
              language,
              customHTML,
              ctaText,
              link,
              verticalAlignment = 'top',
              textAlign = 'left',
              padding = 'medium',
            } = column

            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col',
                  verticalAlignment ? verticalAlignmentClasses[verticalAlignment] : 'items-start',
                  textAlign ? textAlignClasses[textAlign] : 'text-left',
                  padding ? paddingClasses[padding] : 'p-6'
                )}
              >
                {/* Rich Text */}
                {contentType === 'richText' && richText && (
                  <RichText className="max-w-none" data={richText} enableGutter={false} />
                )}

                {/* Media/Image */}
                {contentType === 'media' && media && typeof media !== 'string' && (
                  <div className="w-full">
                    <Media resource={media} />
                    {caption && <p className="mt-2 text-sm text-muted-foreground">{caption}</p>}
                  </div>
                )}

                {/* Video */}
                {contentType === 'video' && (
                  <div className="w-full aspect-video">
                    {videoType === 'youtube' && videoUrl && (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {videoType === 'vimeo' && videoUrl && (
                      <iframe
                        src={`https://player.vimeo.com/video/${getVimeoVideoId(videoUrl)}`}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {videoType === 'upload' &&
                      videoUpload &&
                      typeof videoUpload !== 'string' &&
                      typeof videoUpload !== 'number' && (
                        <video className="w-full h-full" controls>
                          <source src={videoUpload.url || ''} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                  </div>
                )}

                {/* Code */}
                {contentType === 'code' && code && (
                  <pre className="w-full overflow-x-auto p-4 bg-muted rounded-lg">
                    <code className={`language-${language || 'typescript'}`}>{code}</code>
                  </pre>
                )}

                {/* Custom HTML */}
                {contentType === 'customHTML' && customHTML && (
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: customHTML }}
                  />
                )}

                {/* CTA Button */}
                {contentType === 'cta' && ctaText && link && (
                  <CMSLink
                    {...link}
                    appearance="default"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    {ctaText}
                  </CMSLink>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

// Helper functions to extract video IDs from URLs
function getYouTubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : url
}

function getVimeoVideoId(url: string): string {
  const regExp = /vimeo.*\/(\d+)/i
  const match = url.match(regExp)
  return match ? match[1] : url
}
