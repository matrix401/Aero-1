import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
})

function ContactComponent() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#020408', 
      color: '#cfe7f5', 
      fontFamily: "'DM Mono', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        textAlign: 'center',
        border: '1px solid rgba(34,211,238,0.3)',
        padding: '3rem',
        background: 'rgba(8,16,28,0.5)'
      }}>
        <h1 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#22D3EE', 
          fontSize: '2.5rem',
          marginBottom: '2rem'
        }}>
          Contact AeroMind
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          📧 <a href="mailto:zee@aero-1.com" style={{ color: '#22D3EE', textDecoration: 'none' }}>zee@aero-1.com</a>
        </p>
        <p style={{ marginBottom: '1rem' }}>📍 Location: United States</p>
        <p>For institutional access inquiries, please email us.</p>
        <form
  action="https://formspree.io/f/mqeopdej"
  method="POST"
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem'
  }}
>
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    style={{ padding: '12px' }}
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    style={{ padding: '12px' }}
  />

  <textarea
    name="message"
    placeholder="Your Message"
    rows={5}
    required
    style={{ padding: '12px' }}
  />

  <button
    type="submit"
    style={{
      padding: '12px',
      background: '#22D3EE',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Send Message
  </button>
</form>
        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: '#22D3EE' }}>← Back to Home</a>
        </div>
      </div>
    </div>
  )
}
