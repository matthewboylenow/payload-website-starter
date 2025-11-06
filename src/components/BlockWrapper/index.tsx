'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'

interface BlockWrapperProps {
  blockAnchor?: string
  backgroundColor?: string
  spacing?: {
    paddingTop?: string
    paddingBottom?: string
  }
  visibility?: {
    hidden?: boolean
    publishDate?: string
    expiryDate?: string
  }
  animation?: string
  typography?: {
    fontFamily?: string
    headingFont?: string
    textColor?: string
    headingColor?: string
  }
  customCSS?: string
  children: React.ReactNode
}

const backgroundColorClasses: Record<string, string> = {
  none: '',
  background: 'bg-background',
  card: 'bg-card',
  muted: 'bg-muted',
  accent: 'bg-accent',
  brand: 'bg-brand',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
}

const paddingClasses: Record<string, string> = {
  none: 'pt-0',
  small: 'pt-8',
  medium: 'pt-16',
  large: 'pt-24',
  xlarge: 'pt-32',
}

const paddingBottomClasses: Record<string, string> = {
  none: 'pb-0',
  small: 'pb-8',
  medium: 'pb-16',
  large: 'pb-24',
  xlarge: 'pb-32',
}

const animationClasses: Record<string, string> = {
  none: '',
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  zoomIn: 'animate-zoom-in',
}

const fontFamilyClasses: Record<string, string> = {
  default: '',
  'geist-sans': 'font-sans',
  'geist-mono': 'font-mono',
  'inter': 'font-inter',
  'roboto': 'font-roboto',
  'open-sans': 'font-open-sans',
  'lato': 'font-lato',
  'montserrat': 'font-montserrat',
  'playfair-display': 'font-playfair',
  'merriweather': 'font-merriweather',
  'poppins': 'font-poppins',
  'raleway': 'font-raleway',
  'source-sans-pro': 'font-source-sans',
}

const textColorClasses: Record<string, string> = {
  default: '',
  foreground: 'text-foreground',
  'muted-foreground': 'text-muted-foreground',
  'accent-foreground': 'text-accent-foreground',
  'brand-foreground': 'text-brand-foreground',
  brand: 'text-brand',
  primary: 'text-primary',
  'primary-foreground': 'text-primary-foreground',
  secondary: 'text-secondary',
  'secondary-foreground': 'text-secondary-foreground',
  white: 'text-white',
  black: 'text-black',
}

const headingColorClasses: Record<string, string> = {
  default: '',
  foreground: '[&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground [&_h5]:text-foreground [&_h6]:text-foreground',
  brand: '[&_h1]:text-brand [&_h2]:text-brand [&_h3]:text-brand [&_h4]:text-brand [&_h5]:text-brand [&_h6]:text-brand',
  primary: '[&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_h4]:text-primary [&_h5]:text-primary [&_h6]:text-primary',
  secondary: '[&_h1]:text-secondary [&_h2]:text-secondary [&_h3]:text-secondary [&_h4]:text-secondary [&_h5]:text-secondary [&_h6]:text-secondary',
  accent: '[&_h1]:text-accent [&_h2]:text-accent [&_h3]:text-accent [&_h4]:text-accent [&_h5]:text-accent [&_h6]:text-accent',
  'muted-foreground': '[&_h1]:text-muted-foreground [&_h2]:text-muted-foreground [&_h3]:text-muted-foreground [&_h4]:text-muted-foreground [&_h5]:text-muted-foreground [&_h6]:text-muted-foreground',
  white: '[&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white',
  black: '[&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black [&_h5]:text-black [&_h6]:text-black',
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  blockAnchor,
  backgroundColor = 'none',
  spacing,
  visibility,
  animation = 'none',
  typography,
  customCSS,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const blockRef = useRef<HTMLDivElement>(null)

  // Check visibility based on dates and hidden flag
  useEffect(() => {
    if (visibility?.hidden) {
      setShouldRender(false)
      return
    }

    const now = new Date()

    if (visibility?.publishDate) {
      const publishDate = new Date(visibility.publishDate)
      if (now < publishDate) {
        setShouldRender(false)
        return
      }
    }

    if (visibility?.expiryDate) {
      const expiryDate = new Date(visibility.expiryDate)
      if (now > expiryDate) {
        setShouldRender(false)
        return
      }
    }

    setShouldRender(true)
  }, [visibility])

  // Intersection Observer for animations
  useEffect(() => {
    if (animation === 'none' || !blockRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    observer.observe(blockRef.current)

    return () => observer.disconnect()
  }, [animation])

  if (!shouldRender) {
    return null
  }

  const bgClass = backgroundColorClasses[backgroundColor] || ''
  const ptClass = paddingClasses[spacing?.paddingTop || 'medium'] || 'pt-16'
  const pbClass = paddingBottomClasses[spacing?.paddingBottom || 'medium'] || 'pb-16'
  const animClass = animation !== 'none' && isVisible ? animationClasses[animation] : 'opacity-0'

  const fontClass = typography?.fontFamily && typography.fontFamily !== 'default'
    ? fontFamilyClasses[typography.fontFamily]
    : ''
  const textColorClass = typography?.textColor && typography.textColor !== 'default'
    ? textColorClasses[typography.textColor]
    : ''
  const headingColorClass = typography?.headingColor && typography.headingColor !== 'default'
    ? headingColorClasses[typography.headingColor]
    : ''

  return (
    <div
      ref={blockRef}
      id={blockAnchor}
      className={cn(
        bgClass,
        ptClass,
        pbClass,
        animation !== 'none' ? animClass : '',
        fontClass,
        textColorClass,
        headingColorClass,
        customCSS
      )}
    >
      {children}
    </div>
  )
}
