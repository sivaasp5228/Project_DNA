import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { EvaluationProvider } from './context/EvaluationContext';

// Layouts
import { LandingLayout } from './layouts/LandingLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewEvaluationPage } from './pages/NewEvaluationPage';
import { LoadingPage } from './pages/LoadingPage';
import { ReportPage } from './pages/ReportPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EvaluationProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#09090b',
                color: '#fafafa',
                border: '1px solid #27272a',
                fontSize: '12px',
                borderRadius: '8px'
              },
            }}
          />
          <Routes>
            {/* Public Layout */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard Workspace Layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="new" element={<NewEvaluationPage />} />
              <Route path="loading" element={<LoadingPage />} />
              <Route path="report/:id" element={<ReportPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EvaluationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
