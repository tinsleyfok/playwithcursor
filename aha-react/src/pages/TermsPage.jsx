import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <main className="container" style={{ padding: '48px 20px', maxWidth: '720px' }}>
      <h1>Terms of Service</h1>
      <p>Replace with your terms. Use at your own risk.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </main>
  )
}


