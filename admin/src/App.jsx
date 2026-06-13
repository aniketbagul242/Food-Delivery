import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Siderbar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'




const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <ToastContainer />

      {!isLoginPage && (
        <>
          <Navbar />
          <hr />

          <div className="flex">
            <Sidebar />

            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Add />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <List />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </>
      )}

      {isLoginPage && (
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      )}
    </div>
  );
};

export default App;