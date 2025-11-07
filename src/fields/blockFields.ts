import type { Field } from 'payload'

/**
 * Shared block configuration fields
 * These fields can be added to any block to provide common functionality
 */

export const blockAnchor: Field = {
  name: 'blockAnchor',
  type: 'text',
  label: 'Anchor ID',
  admin: {
    description: 'Optional anchor ID for deep linking (e.g., "about-us" becomes #about-us)',
    placeholder: 'section-name',
  },
}

export const blockBackgroundColor: Field = {
  name: 'backgroundColor',
  type: 'select',
  label: 'Background Color',
  defaultValue: 'none',
  options: [
    {
      label: 'None (Transparent)',
      value: 'none',
    },
    {
      label: 'Background',
      value: 'background',
    },
    {
      label: 'Card',
      value: 'card',
    },
    {
      label: 'Muted',
      value: 'muted',
    },
    {
      label: 'Accent',
      value: 'accent',
    },
    {
      label: 'Brand',
      value: 'brand',
    },
    {
      label: 'Primary',
      value: 'primary',
    },
    {
      label: 'Secondary',
      value: 'secondary',
    },
  ],
}

export const blockSpacing: Field = {
  name: 'spacing',
  type: 'group',
  label: 'Spacing',
  admin: {
    description: 'Control padding around this block',
  },
  fields: [
    {
      name: 'paddingTop',
      type: 'select',
      label: 'Top Padding',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'XLarge', value: 'xlarge' },
      ],
    },
    {
      name: 'paddingBottom',
      type: 'select',
      label: 'Bottom Padding',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'XLarge', value: 'xlarge' },
      ],
    },
  ],
}

export const blockVisibility: Field = {
  name: 'visibility',
  type: 'group',
  label: 'Visibility Settings',
  admin: {
    description: 'Control when this block is visible',
  },
  fields: [
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Hide this block',
      defaultValue: false,
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Block will be visible after this date/time',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: 'Expiry Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Block will be hidden after this date/time',
      },
    },
  ],
}

export const blockAnimation: Field = {
  name: 'animation',
  type: 'select',
  label: 'Animation',
  defaultValue: 'none',
  options: [
    { label: 'None', value: 'none' },
    { label: 'Fade In', value: 'fadeIn' },
    { label: 'Fade In Up', value: 'fadeInUp' },
    { label: 'Fade In Down', value: 'fadeInDown' },
    { label: 'Fade In Left', value: 'fadeInLeft' },
    { label: 'Fade In Right', value: 'fadeInRight' },
    { label: 'Zoom In', value: 'zoomIn' },
  ],
  admin: {
    description: 'Animation that plays when the block enters the viewport',
  },
}

export const blockTextAlignment: Field = {
  name: 'textAlignment',
  type: 'select',
  label: 'Text Alignment',
  defaultValue: 'left',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
    { label: 'Justified', value: 'justify' },
  ],
  admin: {
    description: 'Horizontal text alignment for content in this block',
  },
}

export const blockCustomCSS: Field = {
  name: 'customCSS',
  type: 'text',
  label: 'Custom CSS Classes',
  admin: {
    description: 'Add custom Tailwind classes for advanced styling',
    placeholder: 'shadow-lg rounded-xl',
  },
}

export const blockTypography: Field = {
  name: 'typography',
  type: 'group',
  label: 'Typography',
  admin: {
    description: 'Override global typography settings for this block',
  },
  fields: [
    {
      name: 'fontFamily',
      type: 'select',
      label: 'Font Family',
      options: [
        { label: 'Default (Global Setting)', value: 'default' },
        { label: 'Geist Sans', value: 'geist-sans' },
        { label: 'Geist Mono', value: 'geist-mono' },
        { label: 'Inter', value: 'inter' },
        { label: 'Roboto', value: 'roboto' },
        { label: 'Open Sans', value: 'open-sans' },
        { label: 'Lato', value: 'lato' },
        { label: 'Montserrat', value: 'montserrat' },
        { label: 'Playfair Display', value: 'playfair-display' },
        { label: 'Merriweather', value: 'merriweather' },
        { label: 'Poppins', value: 'poppins' },
        { label: 'Raleway', value: 'raleway' },
        { label: 'Source Sans Pro', value: 'source-sans-pro' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'headingFont',
      type: 'select',
      label: 'Heading Font',
      options: [
        { label: 'Default (Global Setting)', value: 'default' },
        { label: 'Geist Sans', value: 'geist-sans' },
        { label: 'Geist Mono', value: 'geist-mono' },
        { label: 'Inter', value: 'inter' },
        { label: 'Roboto', value: 'roboto' },
        { label: 'Open Sans', value: 'open-sans' },
        { label: 'Lato', value: 'lato' },
        { label: 'Montserrat', value: 'montserrat' },
        { label: 'Playfair Display', value: 'playfair-display' },
        { label: 'Merriweather', value: 'merriweather' },
        { label: 'Poppins', value: 'poppins' },
        { label: 'Raleway', value: 'raleway' },
        { label: 'Source Sans Pro', value: 'source-sans-pro' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Default (Global Setting)', value: 'default' },
        { label: 'Foreground', value: 'foreground' },
        { label: 'Muted Foreground', value: 'muted-foreground' },
        { label: 'Accent Foreground', value: 'accent-foreground' },
        { label: 'Brand Foreground', value: 'brand-foreground' },
        { label: 'Brand', value: 'brand' },
        { label: 'Primary', value: 'primary' },
        { label: 'Primary Foreground', value: 'primary-foreground' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Secondary Foreground', value: 'secondary-foreground' },
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'headingColor',
      type: 'select',
      label: 'Heading Color',
      options: [
        { label: 'Default (Global Setting)', value: 'default' },
        { label: 'Foreground', value: 'foreground' },
        { label: 'Brand', value: 'brand' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Muted Foreground', value: 'muted-foreground' },
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
      ],
      defaultValue: 'default',
    },
  ],
}

/**
 * Returns all standard block fields as an array
 * Use this to add all common fields at once to a block
 */
export const getAllBlockFields = (): Field[] => {
  return [
    blockAnchor,
    blockBackgroundColor,
    blockSpacing,
    blockTextAlignment,
    blockVisibility,
    blockAnimation,
    blockTypography,
    blockCustomCSS,
  ]
}
