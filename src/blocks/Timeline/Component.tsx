import React from 'react'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

const icons: Record<string, JSX.Element> = {
  check: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  star: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  ),
  flag: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
    </svg>
  ),
  lightbulb: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </svg>
  ),
  rocket: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2c-4 8.5-4 14.5-4 17h8c0-2.5 0-8.5-4-17zM9.5 19.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S11 21.83 11 21s-.67-1.5-1.5-1.5zm5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
    </svg>
  ),
  calendar: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({
  heading,
  introContent,
  items,
  layout = 'vertical',
}) => {
  if (!items || items.length === 0) return null

  if (layout === 'horizontal') {
    return (
      <div className="container">
        {(heading || introContent) && (
          <div className="mb-12 text-center">
            {heading && <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>}
            {introContent && <RichText data={introContent} enableGutter={false} />}
          </div>
        )}

        <div className="flex gap-8 overflow-x-auto pb-4">
          {items.map((item, index) => (
            <div key={index} className="min-w-[280px] flex-shrink-0">
              <div className="mb-4 flex items-center gap-3">
                {item.icon && item.icon !== 'none' && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                    {icons[item.icon]}
                  </div>
                )}
                <span className="text-sm font-semibold text-brand">{item.date}</span>
              </div>

              {item.image && typeof item.image === 'object' && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Media resource={item.image} imgClassName="w-full h-48 object-cover" />
                </div>
              )}

              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              {item.description && <RichText data={item.description} enableGutter={false} />}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const isCenter = layout === 'vertical-center'

  return (
    <div className="container">
      {(heading || introContent) && (
        <div className="mb-12 text-center">
          {heading && <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>}
          {introContent && <RichText data={introContent} enableGutter={false} />}
        </div>
      )}

      <div className={cn('relative', isCenter && 'max-w-4xl mx-auto')}>
        {/* Timeline line */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-0.5 bg-border',
            isCenter ? 'left-1/2 -translate-x-1/2' : 'left-5'
          )}
        />

        <div className="space-y-12">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'relative',
                isCenter && index % 2 === 0 ? 'pr-1/2 pr-8 text-right' : '',
                isCenter && index % 2 === 1 ? 'pl-1/2 pl-8' : '',
                !isCenter && 'pl-16'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'absolute flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white',
                  isCenter ? 'left-1/2 -translate-x-1/2' : 'left-0'
                )}
              >
                {item.icon && item.icon !== 'none' ? icons[item.icon] : icons.check}
              </div>

              <div>
                <span className="mb-2 inline-block text-sm font-semibold text-brand">
                  {item.date}
                </span>

                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>

                {item.image && typeof item.image === 'object' && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Media resource={item.image} imgClassName="w-full h-64 object-cover" />
                  </div>
                )}

                {item.description && <RichText data={item.description} enableGutter={false} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
