import { useEffect, useRef } from 'react'

/**
 * Decorative 3D background for the hero. Three.js is loaded after first paint, so the
 * text never waits for it, and nothing renders on devices without WebGL.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window.WebGLRenderingContext === 'undefined') return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    let stopScene: (() => void) | undefined
    let unmounted = false

    // Loaded on demand so Three.js never delays the first paint
    import('./heroScene3d')
      .then(({ startScene }) => {
        if (!unmounted) stopScene = startScene(canvas, reducedMotion)
      })
      .catch(() => {
        // WebGL unavailable or the chunk failed to load: the hero simply stays flat
      })

    return () => {
      unmounted = true
      stopScene?.()
    }
  }, [])

  // Dimmed on small screens, where the planets sit behind the text
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-60 md:opacity-100" />
}
