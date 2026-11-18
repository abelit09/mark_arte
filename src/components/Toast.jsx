import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined

    const timeout = window.setTimeout(onClose, 3200)
    return () => window.clearTimeout(timeout)
  }, [toast, onClose])

  if (!toast) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      {toast.message}
    </div>
  )
}
