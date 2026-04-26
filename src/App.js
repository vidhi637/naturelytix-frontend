import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import PageWrapper from './components/layout/PageWrapper';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Unsubscribe from './pages/Unsubscribe';

import AdminDashboard from './pages/admin/AdminDashboard';
import LeadsList from './pages/admin/LeadsList';
import LeadDetail from './pages/admin/LeadDetail';
import ContactsList from './pages/admin/ContactsList';
import DemoRequestsList from './pages/admin/DemoRequestsList';
import NewsletterSubscribers from './pages/admin/NewsletterSubscribers';
import CreateAdmin from './pages/admin/CreateAdmin';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <PageWrapper>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />

              {/* User protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin protected */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/leads" element={<AdminRoute><LeadsList /></AdminRoute>} />
              <Route path="/admin/leads/:id" element={<AdminRoute><LeadDetail /></AdminRoute>} />
              <Route path="/admin/contacts" element={<AdminRoute><ContactsList /></AdminRoute>} />
              <Route path="/admin/demo-requests" element={<AdminRoute><DemoRequestsList /></AdminRoute>} />
              <Route path="/admin/newsletter" element={<AdminRoute><NewsletterSubscribers /></AdminRoute>} />
              <Route path="/admin/create-admin" element={<AdminRoute><CreateAdmin /></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageWrapper>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
