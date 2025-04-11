import LoginForm from './components/LoginForm';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AutoLogout from './components/AutoLogout';
import Navbar from './components/DashboardComponets/Navbar';
import UserProfile from './pages/Profile';
import Footer from './components/DashboardComponets/Footer';

function App() {
  return (
    <>
      <Router>
        <AutoLogout />
        <LocationBasedNavbar />
        <div className="App">
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} />

          <Routes>
            <Route path="/" element={<LoginForm />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <LocationBasedFooter />
      </Router>
    </>
  );
}

function LocationBasedNavbar() {
  const location = useLocation(); // useLocation is now inside the Router context
  return location.pathname !== '/' ? <Navbar /> : null; // Render Navbar for all routes except '/'
}
function LocationBasedFooter() {
  const location = useLocation(); // useLocation is now inside the Router context
  return location.pathname !== '/' ? <Footer /> : null; // Render Navbar for all routes except '/'
}

export default App;
