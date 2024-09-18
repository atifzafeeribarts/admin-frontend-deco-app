// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import { ReturnDetails, ReturnRequest } from "./Pages/ReturnRequest";
import Layout from "./Components/Layouts/Layout";
import Page404 from "./Pages/Page404";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/Slices/authSlice';
import ShippingLabel from "./Components/ShippingLabel/ShippingLabel";
import { checkAuthAPI } from "./Services/api";
import CreateReturn from "./Pages/CreateReturn";
import Notifications from "./Pages/Settings/Notifications";
import NotificationDetails from './Pages/Settings/NotificationDetails';
const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const user = useSelector((state) => state.auth.user);
  // const user = true;
  useEffect(() => {
    loading && checkAuthAPI().then((data) => {
      const { isAuthenticated } = data;
      if (isAuthenticated) {
        dispatch(setUser(true)); // Set user data if required
        setLoading(false);
      } else {
        dispatch(setUser(false));
        setLoading(false);
      }
    }).catch((error) => {
      setLoading(false);
    })

  }, [dispatch, user]);

  if (loading) {
    return (
      <>
        <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
          <span className='sr-only'>Loading...</span>
          <div className='h-8 w-8 bg-[var(--dark-light-brown)] rounded-full animate-bounce [animation-delay:-0.3s] border-2 border-[var(--dark-light-brown)]'></div>
          <div className='h-8 w-8 bg-[var(--light-cream-background)] rounded-full animate-bounce [animation-delay:-0.15s] border-2 border-[var(--dark-light-brown)]'></div>
          <div className='h-8 w-8 bg-[var(--dark-light-brown)] rounded-full animate-bounce border-2 border-[var(--dark-light-brown)]'></div>
        </div>
      </>
    );
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        {user ? (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* For Developer Store */}
            <Route path="/return-request/framemytvapp" element={<ReturnRequest storeName="framemytvapp" />} />
            <Route path="/return-request/framemytvapp/:id" element={<ReturnDetails storeName="framemytvapp" />} />
            {/* For Deco Frames - Sandbox */}
            <Route path="/return-request/decotvframes-sandbox" element={<ReturnRequest storeName="decotvframes-sandbox" />} />
            <Route path="/return-request/decotvframes-sandbox/:id" element={<ReturnDetails storeName="decotvframes-sandbox" />} />
            {/* For Deco Frames - Live */}
            <Route path="/return-request/decotvframes" element={<ReturnRequest storeName="decotvframes" />} />
            <Route path="/return-request/decotvframes/:id" element={<ReturnDetails storeName="decotvframes" />} />

            {/* <Route path="/return-request/deco-tv-frames/shipping-label/:id" element={<ShippingLabel />} />
            <Route path="/return-request/frame-my-tv/shipping-label/:id" element={<ShippingLabel />} /> */}
            <Route path="/create-return" element={<CreateReturn />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/notifications/:id" element={<NotificationDetails />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
