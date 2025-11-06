'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

const icons: Record<string, JSX.Element> = {
  users: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  star: (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  ),
  chart: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  trophy: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  lightning: (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  ),
  globe: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  heart: (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  rocket: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

const AnimatedNumber: React.FC<{ value: string; animate: boolean }> = ({ value, animate }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!animate || hasAnimated) {
      setDisplayValue(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
          if (isNaN(numericValue)) {
            setDisplayValue(value)
            setHasAnimated(true)
            return
          }

          const duration = 2000
          const steps = 60
          const increment = numericValue / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= numericValue) {
              setDisplayValue(value)
              clearInterval(timer)
              setHasAnimated(true)
            } else {
              const suffix = value.replace(/[0-9.]/g, '')
              setDisplayValue(Math.floor(current) + suffix)
            }
          }, duration / steps)

          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, animate, hasAnimated])

  return <span ref={ref}>{displayValue}</span>
}

export const StatsBlock: React.FC<StatsBlockProps> = ({
  heading,
  introContent,
  stats,
  layout = 'grid-3',
}) => {
  if (!stats || stats.length === 0) return null

  const layoutClasses: Record<string, string> = {
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    horizontal: 'flex flex-wrap',
  }

  return (
    <div className="container">
      {(heading || introContent) && (
        <div className="mb-12 text-center">
          {heading && <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>}
          {introContent && <RichText data={introContent} enableGutter={false} />}
        </div>
      )}

      <div className={cn('gap-8', layoutClasses[layout])}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center text-center p-6 rounded-lg',
              layout === 'horizontal' && 'flex-1 min-w-[200px]'
            )}
          >
            {stat.icon && stat.icon !== 'none' && (
              <div className="mb-4 text-brand">{icons[stat.icon]}</div>
            )}

            <div className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
              <AnimatedNumber value={stat.value || '0'} animate={stat.animate !== false} />
            </div>

            <div className="mb-2 text-lg font-semibold text-foreground">{stat.label}</div>

            {stat.description && (
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
