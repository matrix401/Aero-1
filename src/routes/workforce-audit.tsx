import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workforce-audit')({
  component: WorkforceAuditRedirect,
})

function WorkforceAuditRedirect() {
  if (typeof window !== 'undefined') {
    window.location.replace('/workforce-audit.html')
  }

  return null
}
