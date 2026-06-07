import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact-success')({
  component: SuccessPage,
})

function SuccessPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020408',
        color: '#22D3EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Mono, monospace',
        textAlign: 'center',
      }}
    >
      <div>
        <h1>✓ Transmission Successful</h1>
        <p>Your message has been transmitted to AeroMind.</p>
        <a href="/" style={{ color: '#22D3EE' }}>
          Return to Mission Control
        </a>
      </div>
    </div>
  )
}
