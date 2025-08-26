import { Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
      </div>
      <CookieBanner />
    </div>
  );
}

export default App;
