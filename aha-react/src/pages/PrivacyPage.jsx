import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: '48px 20px', maxWidth: '720px' }}>
      <h1>Privacy Policy</h1>
      <p>Replace with your policy. If you collect emails, describe how you store and use them.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </main>
  )
}


