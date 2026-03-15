import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import { CompareProvider } from './context/CompareContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import CarDetail from './pages/CarDetail';
import SellCar from './pages/SellCar';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CarProvider>
          <CompareProvider>
            <div className="min-h-screen bg-luxury-black font-body">
              <ScrollToTop />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/listings" element={<Listings />} />
                  <Route path="/car/:id" element={<CarDetail />} />
                  <Route path="/sell" element={<SellCar />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
              <CompareBar />
            </div>
          </CompareProvider>
        </CarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
