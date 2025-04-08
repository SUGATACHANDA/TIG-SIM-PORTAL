import LoginForm from './components/LoginForm';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AutoLogout from './components/AutoLogout';

function App() {
  return (
    <>
      <Router>
        <AutoLogout />
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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
