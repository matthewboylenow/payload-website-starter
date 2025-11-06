import React from 'react'

interface FontLoaderProps {
  defaultFont?: string
  headingFont?: string
  customFonts?: Array<{
    name: string
    slug: string
    weights?: string
  }>
}

/**
 * FontLoader Component
 * Loads Google Fonts dynamically based on settings
 *
 * Usage: Add this component to your root layout
 * <FontLoader defaultFont="inter" headingFont="playfair-display" />
 */
export const FontLoader: React.FC<FontLoaderProps> = ({
  defaultFont = 'geist-sans',
  headingFont = 'geist-sans',
  customFonts = [],
}) => {
  const fontsToLoad = new Set<string>()

  // Add default and heading fonts
  if (defaultFont && defaultFont !== 'geist-sans' && defaultFont !== 'geist-mono') {
    fontsToLoad.add(defaultFont)
  }
  if (headingFont && headingFont !== 'geist-sans' && headingFont !== 'geist-mono') {
    fontsToLoad.add(headingFont)
  }

  // Font configuration map
  const fontMap: Record<string, string> = {
    'inter': 'Inter:wght@300,400,500,600,700',
    'roboto': 'Roboto:wght@300,400,500,700',
    'open-sans': 'Open+Sans:wght@300,400,600,700',
    'lato': 'Lato:wght@300,400,700',
    'montserrat': 'Montserrat:wght@300,400,500,600,700',
    'playfair-display': 'Playfair+Display:wght@400,500,600,700',
    'merriweather': 'Merriweather:wght@300,400,700',
    'poppins': 'Poppins:wght@300,400,500,600,700',
    'raleway': 'Raleway:wght@300,400,500,600,700',
    'source-sans-pro': 'Source+Sans+Pro:wght@300,400,600,700',
  }

  // Build Google Fonts URL
  const families = Array.from(fontsToLoad)
    .map((slug) => fontMap[slug])
    .filter(Boolean)

  // Add custom fonts
  const customFontFamilies = customFonts.map((font) => {
    const weights = font.weights || '400,700'
    const familyName = font.name.replace(/ /g, '+')
    return `${familyName}:wght@${weights}`
  })

  const allFamilies = [...families, ...customFontFamilies]

  if (allFamilies.length === 0) {
    return null
  }

  const googleFontsUrl = `https://fonts.googleapis.com/css2?${allFamilies.map((f) => `family=${f}`).join('&')}&display=swap`

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={googleFontsUrl} rel="stylesheet" />
    </>
  )
}
