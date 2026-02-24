import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import DocPage from './pages/DocPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/features', element: <FeaturesPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/doc', element: <DocPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
], { basename: import.meta.env.BASE_URL })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
