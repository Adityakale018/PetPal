import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetList from './pages/PetList';
import AdoptionRequests from './pages/AdoptionRequests';
import DaycareBooking from './pages/DaycareBooking';
import AddPet from './pages/AddPet';
import DaycareRegister from './pages/DaycareRegister';
import DaycareBookingsList from './pages/DaycareBookingsList';
import Dashboard from './pages/Dashboard';
import PetMedical from './pages/PetMedical';
import Payment from './pages/Payment';
import PetDetails from './pages/PetDetails';
import Feedback from './pages/Feedback';
import './index.css';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Toast from './components/Toast';

function App() {
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });
  const location = useLocation();
  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/register" element={<Register showToast={showToast} />} />
            <Route path="/pets" element={<PetList showToast={showToast} />} />
            <Route path="/pets/add" element={<AddPet showToast={showToast} />} />
            <Route path="/pets/:id" element={<PetDetails showToast={showToast} />} />
            <Route path="/adoptions" element={<AdoptionRequests showToast={showToast} />} />
            <Route path="/daycare" element={<DaycareBooking showToast={showToast} />} />
            <Route path="/daycare/register" element={<DaycareRegister showToast={showToast} />} />
            <Route path="/daycare/bookings" element={<DaycareBookingsList showToast={showToast} />} />
            <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
            <Route path="/medical/:petId" element={<PetMedical showToast={showToast} />} />
            <Route path="/payment" element={<Payment showToast={showToast} />} />
            {/* Bug fix: Feedback was missing from routes */}
            <Route path="/feedback" element={<Feedback showToast={showToast} />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

export default App;
