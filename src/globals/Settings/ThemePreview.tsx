'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export const ThemePreview: React.FC = () => {
  const primaryBrandColor = useFormFields(([fields]) => fields.primaryBrandColor)
  const secondaryBrandColor = useFormFields(([fields]) => fields.secondaryBrandColor)
  const accentColor = useFormFields(([fields]) => fields.accentColor)
  const backgroundColor = useFormFields(([fields]) => fields.backgroundColor)
  const extractedPalette = useFormFields(([fields]) => fields.extractedPalette)

  const colors = [
    { label: 'Primary', value: primaryBrandColor?.value as string },
    { label: 'Secondary', value: secondaryBrandColor?.value as string },
    { label: 'Accent', value: accentColor?.value as string },
    { label: 'Background', value: backgroundColor?.value as string },
  ].filter((c) => c.value)

  const palette = extractedPalette?.value as
    | Array<{ colorName?: string; hex: string; usage?: string }>
    | undefined

  const hasColors = colors.length > 0 || (palette && palette.length > 0)

  if (!hasColors) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          Upload a logo and extract colors, or manually set brand colors to see a preview here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {colors.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Brand Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.map((color, index) => (
              <div key={index} className="space-y-1">
                <div
                  className="h-20 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.value }}
                />
                <div className="text-xs">
                  <div className="font-medium">{color.label}</div>
                  <div className="text-gray-500 font-mono">{color.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {palette && palette.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Color Palette</h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {palette.map((color, index) => (
              <div key={index} className="space-y-1">
                <div
                  className="h-16 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-xs">
                  {color.colorName && <div className="font-medium truncate">{color.colorName}</div>}
                  <div className="text-gray-500 font-mono text-[10px]">{color.hex}</div>
                  {color.usage && (
                    <div className="text-gray-400 capitalize text-[10px]">{color.usage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Tip:</strong> These colors can be applied to your site theme by updating your
          Tailwind config or CSS variables. Future updates will include automatic theme
          application.
        </p>
      </div>
    </div>
  )
}
