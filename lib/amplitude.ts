import * as amplitude from '@amplitude/analytics-browser'
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser'

export const initAmplitude = () => {
  if (typeof window === 'undefined') return // SSR guard

  const isEnabled = process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === 'true'
  if (!isEnabled) return

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string
  amplitude.init(apiKey, {
    autocapture: { elementInteractions: true },
  })
  amplitude.add(autocapturePlugin())
}
