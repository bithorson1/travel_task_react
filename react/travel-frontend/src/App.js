import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';


import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './routes/PrivateRoute';
import UserDashboard from './components/UserDashboard';
import TravelForm from './components/TravelForm';
import AdminDashboard from './components/AdminDashboard';
import AdminRequestDetail from "./components/AdminRequestDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/request"
          element={
            <PrivateRoute role="user">
              <TravelForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
          <Route
              path="/admin/requests/:id"
                element={
                    <PrivateRoute>
                        <AdminRequestDetail />
                    </PrivateRoute>
                }
            />
      </Routes>
    </Router>
  );
}

export default App;
