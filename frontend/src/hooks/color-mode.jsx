'use client'

import { useTheme } from 'next-themes'

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()

  // The current mode is the one set by the user or forced by the system
  const colorMode = forcedTheme || resolvedTheme

  const toggleColorMode = () => {
    // Toggle between 'dark' and 'light'
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue(light, dark) {
  // This hook now uses our custom hook above
  const { colorMode } = useColorMode() 
  return colorMode === 'dark' ? dark : light
}