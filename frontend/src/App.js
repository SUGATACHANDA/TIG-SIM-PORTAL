import LoginForm from './components/LoginForm';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Navbar from './components/DashboardComponets/Navbar';
import UserProfile from './pages/Profile';
import Footer from './components/DashboardComponets/Footer';
import { UserProvider } from './context/UserAuthContext';
import maintainanceConfig from './config/maintainance';
import Maintenance from './components/MaintainanceComponent/Maintainance';



function App() {

    if (maintainanceConfig.maintenanceMode) {
        return <Maintenance />
    }

    return (
        <>

            <Router>
                <UserProvider>
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
                </UserProvider>
            </Router>
        </>
    );
}

function LocationBasedNavbar() {
    const location = useLocation();
    return location.pathname !== '/' ? <Navbar /> : null;
}
function LocationBasedFooter() {
    const location = useLocation();
    return location.pathname !== '/' ? <Footer /> : null;
}

export default App;
