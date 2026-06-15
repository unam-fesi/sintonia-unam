import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CrisisFAB from './components/CrisisFAB.jsx';
import WebinarToast from './components/WebinarToast.jsx';
import WellnessBackground from './components/WellnessBackground.jsx';
import BuddyAvailableToast from './components/BuddyAvailableToast.jsx';
import PageTransition from './components/PageTransition.jsx';
import FloatingParticles from './components/FloatingParticles.jsx';
import CursorFollower from './components/CursorFollower.jsx';

// Páginas core eager (camino crítico: home + flujo del test)
import Home       from './pages/Home.jsx';
import Consent    from './pages/Consent.jsx';
import Assessment from './pages/Assessment.jsx';
import Results    from './pages/Results.jsx';

// Páginas no críticas: lazy load
const Resources     = lazy(() => import('./pages/Resources.jsx'));
const Privacy       = lazy(() => import('./pages/Privacy.jsx'));
const MyHistory     = lazy(() => import('./pages/MyHistory.jsx'));
const CheckIn       = lazy(() => import('./pages/CheckIn.jsx'));
const Journal       = lazy(() => import('./pages/Journal.jsx'));
const Support       = lazy(() => import('./pages/Support.jsx'));
const WellnessRoute = lazy(() => import('./pages/WellnessRoute.jsx'));
const Companion     = lazy(() => import('./pages/Companion.jsx'));
const Library       = lazy(() => import('./pages/Library.jsx'));
const Emotions      = lazy(() => import('./pages/Emotions.jsx'));
const MapPage       = lazy(() => import('./pages/MapPage.jsx'));
const Trees         = lazy(() => import('./pages/Trees.jsx'));
const Buddy         = lazy(() => import('./pages/Buddy.jsx'));
const Adventure     = lazy(() => import('./pages/Adventure.jsx'));
const Calendar      = lazy(() => import('./pages/Calendar.jsx'));

// Admin completo en su propio chunk
const Admin      = lazy(() => import('./pages/Admin.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));

function PageFallback() {
  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'40vh'}}>
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Background animado solo en rutas públicas y no durante el test
  // (durante el test el usuario necesita concentración)
  const showBg = !isAdminRoute && location.pathname !== '/evaluacion';

  return (
    <>
      {showBg && <WellnessBackground />}
      {showBg && <FloatingParticles density={26} />}
      {!isAdminRoute && <CursorFollower />}
      {!isAdminRoute && <Header />}
      <main>
        <Suspense fallback={<PageFallback />}>
          <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consentimiento" element={<Consent />} />
            <Route path="/evaluacion" element={<Assessment />} />
            <Route path="/resultado" element={<Results />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/mi-historia" element={<MyHistory />} />
            <Route path="/check-in"    element={<CheckIn />} />
            <Route path="/diario"      element={<Journal />} />
            <Route path="/apoyo"       element={<Support />} />
            <Route path="/ruta"        element={<WellnessRoute />} />
            <Route path="/companion"   element={<Companion />} />
            <Route path="/biblioteca"  element={<Library />} />
            <Route path="/emociones"   element={<Emotions />} />
            <Route path="/mapa"        element={<MapPage />} />
            <Route path="/arboles"     element={<Trees />} />
            <Route path="/buddy"       element={<Buddy />} />
            <Route path="/aventura"    element={<Adventure />} />
            <Route path="/calendario"  element={<Calendar />} />
            {/* Docentes ahora vive dentro de /admin/docentes (requiere login) */}
            <Route path="/docentes"    element={<Navigate to="/admin/login" replace />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*"     element={<Admin />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </PageTransition>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CrisisFAB />}
      {!isAdminRoute && <WebinarToast />}
      {!isAdminRoute && <BuddyAvailableToast />}
    </>
  );
}
