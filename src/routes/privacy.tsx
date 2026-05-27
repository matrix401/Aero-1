import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyComponent,
})

function PrivacyComponent() {
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
        maxWidth: '800px', 
        border: '1px solid rgba(34,211,238,0.2)',
        padding: '3rem',
        background: 'rgba(8,16,28,0.3)'
      }}>
        <h1 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#22D3EE', 
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          Privacy Policy
        </h1>
        
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Last updated:</strong> May 27, 2026
        </p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1.5rem',
          marginBottom: '0.5rem'
        }}>
          Information Collection
        </h3>
        <p style={{ marginBottom: '1rem' }}>AeroMind does not collect personal data from website visitors. No cookies, tracking, or analytics are used on this site.</p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          Contact Forms
        </h3>
        <p style={{ marginBottom: '1rem' }}>If you email us at <a href="mailto:zee@aero-1.com" style={{ color: '#22D3EE' }}>zee@aero-1.com</a>, we will only use your information to respond to your inquiry.</p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          Third-Party Services
        </h3>
        <p style={{ marginBottom: '1rem' }}>This website does not contain third-party links or embedded content that collects data.</p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          Contact Us
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          📧 <a href="mailto:zee@aero-1.com" style={{ color: '#22D3EE' }}>zee@aero-1.com</a>
        </p>
        
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(34,211,238,0.2)' }}>
          <a href="/" style={{ color: '#22D3EE' }}>← Back to Home</a>
        </div>
      </div>
    </div>
  )
}