'use client'

import { ThemeProvider } from 'next-themes'
import * as React from 'react'

// This file now only exports a single component, which is perfect for Fast Refresh!
export function ColorModeProvider(props) {
  return (
    <ThemeProvider 
      attribute='class' 
      disableTransitionOnChange 
      {...props} 
    />
  )
}