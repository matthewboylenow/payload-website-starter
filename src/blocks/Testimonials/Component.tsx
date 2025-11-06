'use client'

import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`h-5 w-5 ${star <= rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
    ))}
  </div>
)

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
    {testimonial.rating && <StarRating rating={testimonial.rating} />}

    <blockquote className="text-lg italic text-foreground">
      "{testimonial.quote}"
    </blockquote>

    <div className="mt-auto flex items-center gap-4">
      {testimonial.avatar && typeof testimonial.avatar === 'object' && (
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Media
            resource={testimonial.avatar}
            imgClassName="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col">
        <cite className="not-italic font-semibold text-foreground">
          {testimonial.author}
        </cite>
        {(testimonial.role || testimonial.company) && (
          <span className="text-sm text-muted-foreground">
            {testimonial.role}
            {testimonial.role && testimonial.company && ' at '}
            {testimonial.company}
          </span>
        )}
      </div>
    </div>
  </div>
)

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  heading,
  introContent,
  testimonials,
  layout = 'grid',
}) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <div className="container">
      {(heading || introContent) && (
        <div className="mb-12 text-center">
          {heading && <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>}
          {introContent && <RichText data={introContent} enableGutter={false} />}
        </div>
      )}

      {layout === 'grid' && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      )}

      {layout === 'carousel' && (
        <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-[300px] flex-shrink-0 snap-center md:min-w-[400px]">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}

      {layout === 'featured' && testimonials[0] && (
        <div className="mx-auto max-w-4xl">
          <TestimonialCard testimonial={testimonials[0]} />
        </div>
      )}
    </div>
  )
}
