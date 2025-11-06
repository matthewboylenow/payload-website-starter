import React from 'react'
import type { VideoBlock as VideoBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

const getEmbedURL = (url: string): string | null => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // If it's already an embed URL, return as is
  if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com')) {
    return url
  }

  return null
}

export const VideoBlock: React.FC<VideoBlockProps> = ({
  videoType,
  embedURL,
  videoFile,
  caption,
  aspectRatio = '16/9',
  autoplay,
  loop,
  muted,
}) => {
  const aspectRatioClasses: Record<string, string> = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
  }

  const aspectClass = aspectRatioClasses[aspectRatio || '16/9'] || 'aspect-video'

  return (
    <div className="container">
      <div className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-black`}>
        {videoType === 'embed' && embedURL && (
          <iframe
            src={`${getEmbedURL(embedURL)}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video embed"
          />
        )}

        {videoType === 'upload' && videoFile && typeof videoFile === 'object' && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            autoPlay={autoplay || undefined}
            loop={loop || undefined}
            muted={muted || undefined}
          >
            <source src={videoFile.url!} type={videoFile.mimeType || 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {caption && (
        <div className="mt-4">
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
