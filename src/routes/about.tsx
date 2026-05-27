import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
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
          fontSize: '2.5rem',
          marginBottom: '1.5rem'
        }}>
          About AeroMind
        </h1>
        
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
          <strong>AeroMind</strong> is the first operational intelligence platform built specifically for the aviation industry — reading 134 signals across workforce, operations, safety, and finance into a single, continuous, predictive picture of an airline's health.
        </p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1.5rem',
          marginBottom: '0.5rem'
        }}>
          Mission
        </h3>
        <p style={{ marginBottom: '1rem' }}>To detect operational distress before it becomes catastrophe.</p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          Founded
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>2025</p>
        
        <h3 style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          color: '#0EA5E9', 
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          Contact
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