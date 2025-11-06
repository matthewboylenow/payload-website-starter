import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Typography',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'defaultFont',
                  type: 'select',
                  label: 'Default Body Font',
                  defaultValue: 'geist-sans',
                  options: [
                    { label: 'Geist Sans (Default)', value: 'geist-sans' },
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
                  admin: {
                    description: 'Default font for body text across the site',
                  },
                },
                {
                  name: 'headingFont',
                  type: 'select',
                  label: 'Default Heading Font',
                  defaultValue: 'geist-sans',
                  options: [
                    { label: 'Geist Sans (Default)', value: 'geist-sans' },
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
                  admin: {
                    description: 'Default font for headings across the site',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'defaultTextColor',
                  type: 'select',
                  label: 'Default Text Color',
                  defaultValue: 'foreground',
                  options: [
                    { label: 'Foreground (Default)', value: 'foreground' },
                    { label: 'Muted Foreground', value: 'muted-foreground' },
                    { label: 'Accent Foreground', value: 'accent-foreground' },
                    { label: 'Brand Foreground', value: 'brand-foreground' },
                    { label: 'Primary Foreground', value: 'primary-foreground' },
                    { label: 'Secondary Foreground', value: 'secondary-foreground' },
                    { label: 'White', value: 'white' },
                    { label: 'Black', value: 'black' },
                  ],
                  admin: {
                    description: 'Default color for body text',
                  },
                },
                {
                  name: 'defaultHeadingColor',
                  type: 'select',
                  label: 'Default Heading Color',
                  defaultValue: 'foreground',
                  options: [
                    { label: 'Foreground (Default)', value: 'foreground' },
                    { label: 'Brand', value: 'brand' },
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Accent', value: 'accent' },
                    { label: 'Muted Foreground', value: 'muted-foreground' },
                    { label: 'White', value: 'white' },
                    { label: 'Black', value: 'black' },
                  ],
                  admin: {
                    description: 'Default color for headings',
                  },
                },
              ],
            },
            {
              name: 'customGoogleFonts',
              type: 'array',
              label: 'Custom Google Fonts',
              admin: {
                description: 'Add custom Google Fonts to use throughout the site',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Font Name',
                  required: true,
                  admin: {
                    description: 'e.g., "Roboto Slab", "Dancing Script"',
                  },
                },
                {
                  name: 'slug',
                  type: 'text',
                  label: 'Slug',
                  required: true,
                  admin: {
                    description: 'URL-friendly name (e.g., "roboto-slab", "dancing-script")',
                  },
                },
                {
                  name: 'weights',
                  type: 'text',
                  label: 'Font Weights',
                  defaultValue: '400,700',
                  admin: {
                    description: 'Comma-separated weights (e.g., "300,400,700")',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Colors',
          fields: [
            {
              name: 'customColors',
              type: 'array',
              label: 'Custom Colors',
              admin: {
                description: 'Define custom colors for use in blocks',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Color Name',
                  required: true,
                },
                {
                  name: 'slug',
                  type: 'text',
                  label: 'Slug',
                  required: true,
                  admin: {
                    description: 'CSS-friendly name (e.g., "custom-blue")',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Color Value',
                  required: true,
                  admin: {
                    description: 'Hex code (e.g., "#FF5733") or HSL (e.g., "210 40% 50%")',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
