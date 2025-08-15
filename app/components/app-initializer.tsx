'use client'

import { useEffect } from 'react'
import { initAmplitude } from '@/lib/amplitude'

export const AppInitializer = () => {
  useEffect(() => {
    initAmplitude()
  }, [])

  return null
}
