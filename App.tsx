import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import { PageRoutes } from './types';

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path={PageRoutes.HOME} element={<Home />} />
          <Route path={PageRoutes.SERVICES} element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path={PageRoutes.CONTACT} element={<Contact />} />
          <Route path="*" element={<Navigate to={PageRoutes.HOME} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
