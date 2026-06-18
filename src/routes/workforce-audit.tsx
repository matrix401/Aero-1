import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workforce-audit')({
  component: WorkforceAuditComponent,
})

function WorkforceAuditComponent() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020408',
        color: '#cfe7f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Mono', monospace",
      }}
    >
      <h1>Workforce Audit Page Loading...</h1>
    </div>
  )
}
