import { useEffect, useState } from 'react'
import { fetchHealth } from '@/lib/api'
import { cn } from '@/lib/utils'

type Status = 'checking' | 'online' | 'offline'

const labels: Record<Status, string> = {
  checking: 'Checking API',
  online: 'API online',
  offline: 'API offline',
}

const dotColors: Record<Status, string> = {
  checking: 'bg-muted-foreground',
  online: 'bg-green-500',
  offline: 'bg-red-500',
}

export function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    const controller = new AbortController()
    fetchHealth(controller.signal).then(
      () => {
        if (!controller.signal.aborted) setStatus('online')
      },
      () => {
        if (!controller.signal.aborted) setStatus('offline')
      },
    )
    return () => controller.abort()
  }, [])

  return (
    <span role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
      <span aria-hidden="true" className={cn('size-2 rounded-full', dotColors[status])} />
      <span className="sr-only md:not-sr-only">{labels[status]}</span>
    </span>
  )
}
