'use client'

import React, { useState } from 'react'
import type { TabsAccordionBlock as TabsAccordionBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

export const TabsAccordionBlock: React.FC<TabsAccordionBlockProps> = ({
  heading,
  displayMode = 'tabs',
  items,
  defaultOpen = 0,
  allowMultiple,
}) => {
  const [activeTab, setActiveTab] = useState(defaultOpen)
  const [openAccordions, setOpenAccordions] = useState<number[]>(
    defaultOpen !== null ? [defaultOpen] : []
  )

  if (!items || items.length === 0) return null

  const toggleAccordion = (index: number) => {
    if (allowMultiple) {
      setOpenAccordions((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenAccordions((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  const renderTabs = () => (
    <div className="w-full">
      <div className="border-b border-border">
        <div className="flex gap-1 overflow-x-auto">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors',
                activeTab === index
                  ? 'border-brand text-brand'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        {activeTab !== null && items[activeTab]?.content && (
          <RichText data={items[activeTab].content} enableGutter={false} />
        )}
      </div>
    </div>
  )

  const renderAccordion = () => (
    <div className="w-full space-y-2">
      {items.map((item, index) => {
        const isOpen = openAccordions.includes(index)

        return (
          <div key={index} className="rounded-lg border border-border bg-card">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
            >
              <span>{item.label}</span>
              <svg
                className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="border-t border-border p-4">
                {item.content && <RichText data={item.content} enableGutter={false} />}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="container">
      {heading && <h2 className="mb-8 text-3xl font-bold md:text-4xl">{heading}</h2>}

      {displayMode === 'tabs' && renderTabs()}
      {displayMode === 'accordion' && renderAccordion()}
      {displayMode === 'responsive' && (
        <>
          <div className="hidden md:block">{renderTabs()}</div>
          <div className="md:hidden">{renderAccordion()}</div>
        </>
      )}
    </div>
  )
}
