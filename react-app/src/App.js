import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Dashboard from './pages/Dashboard/Dashboard';
import UserGuidePage from './pages/UserGuidePage/UserGuidePage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<UserGuidePage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;