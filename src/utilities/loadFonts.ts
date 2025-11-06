/**
 * Google Fonts Loader Utility
 * Dynamically loads Google Fonts based on settings
 */

export interface GoogleFont {
  name: string
  slug: string
  weights?: string
}

/**
 * Generate Google Fonts URL
 */
export const getGoogleFontsUrl = (fonts: GoogleFont[]): string => {
  if (!fonts || fonts.length === 0) return ''

  const fontFamilies = fonts
    .map((font) => {
      const weights = font.weights || '400,700'
      // Replace spaces with + for URL
      const familyName = font.name.replace(/ /g, '+')
      return `family=${familyName}:wght@${weights}`
    })
    .join('&')

  return `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`
}

/**
 * Built-in Google Fonts that can be selected
 */
export const GOOGLE_FONTS_MAP: Record<string, string> = {
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

/**
 * Get Google Fonts URL for built-in fonts
 */
export const getBuiltInGoogleFontsUrl = (fontSlugs: string[]): string => {
  const families = fontSlugs
    .filter((slug) => slug !== 'geist-sans' && slug !== 'geist-mono' && slug !== 'default')
    .map((slug) => GOOGLE_FONTS_MAP[slug])
    .filter(Boolean)

  if (families.length === 0) return ''

  const familyParams = families.map((f) => `family=${f}`).join('&')
  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`
}
