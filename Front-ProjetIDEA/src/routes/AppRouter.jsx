


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/idea/Dashboard';
import Landing from "../pages/home/Landing";

// Fonction utilitaire pour vérifier l'authentification
const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

// Composant de route protégée
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Composant de route publique (redirige vers dashboard si déjà connecté)
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées */}
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
   

      {/* Route par défaut */}
      <Route 
        path="/" 
        element={
          <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
        } 
      />

      {/* Route 404 */}
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
}