import { useEffect, useState } from 'react'
import { fetchPortfolio } from './api'
import snapshot from './data/snapshot.json'
import type { Portfolio } from './types'

/**
 * Renders the bundled snapshot immediately, then swaps in live data from the Spring Boot API.
 * Visitors never wait for the backend; if it is unreachable, the snapshot simply stays.
 */
export function usePortfolio(): Portfolio {
  const [portfolio, setPortfolio] = useState<Portfolio>(snapshot as Portfolio)

  useEffect(() => {
    const controller = new AbortController()
    fetchPortfolio(controller.signal)
      .then(setPortfolio)
      .catch(() => {
        // Keep showing the bundled content
      })
    return () => controller.abort()
  }, [])

  return portfolio
}
