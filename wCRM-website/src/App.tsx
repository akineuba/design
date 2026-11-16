import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CheckoutProvider } from './checkout/CheckoutContext';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { ConfigurePage } from './pages/checkout/ConfigurePage';
import { AccountPage } from './pages/checkout/AccountPage';
import { VerifyPage } from './pages/checkout/VerifyPage';
import { CompanyPage } from './pages/checkout/CompanyPage';
import { ReviewPage } from './pages/checkout/ReviewPage';
import { PaymentPage } from './pages/checkout/PaymentPage';

/** Scrolls to the top on page changes, or to the `#section` in the URL. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <CheckoutProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Navigate to="/checkout/configure" replace />} />
        <Route path="/checkout/configure" element={<ConfigurePage />} />
        <Route path="/checkout/account" element={<AccountPage />} />
        <Route path="/checkout/verify" element={<VerifyPage />} />
        <Route path="/checkout/company" element={<CompanyPage />} />
        <Route path="/checkout/review" element={<ReviewPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BackToTop />
    </CheckoutProvider>
  );
}
