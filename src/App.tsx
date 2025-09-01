import { Routes, Route } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage'
import { HowItWorksPage } from '@/pages/HowItWorksPage'
import { FeaturesPage } from '@/pages/FeaturesPage'
import { BenefitsPage } from '@/pages/BenefitsPage'
import { FAQPage } from '@/pages/FAQPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from '@/pages/TermsOfServicePage'
import { inject } from '@vercel/analytics'
import { CookieBanner } from '@/components/CookieBanner'

function App() {
  inject()

  return (
    <div className='App min-h-screen flex flex-col'>
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/room/:roomId' element={<HomePage />} />
          <Route path='/how-it-works' element={<HowItWorksPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path='/benefits' element={<BenefitsPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/terms-of-service' element={<TermsOfServicePage />} />
          <Route path='/start' element={<HomePage start />} />
        </Routes>
      </div>
      <CookieBanner />
    </div>
  )
}

export default App
