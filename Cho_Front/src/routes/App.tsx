import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { RoleGuard } from '../components/RoleGuard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Schedule from '../pages/Schedule'
import Profile from '../pages/Profile'
import AdminSessions from '../pages/AdminSessions'
import AdminUsers from '../pages/AdminUsers'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RoleGuard roles={[]}><Dashboard /></RoleGuard>} />
        <Route path="/schedule" element={<RoleGuard roles={[]}><Schedule /></RoleGuard>} />
        <Route path="/profile" element={<RoleGuard roles={[]}><Profile /></RoleGuard>} />
        <Route path="/admin/sessions" element={<RoleGuard roles={['ADMIN']}><AdminSessions /></RoleGuard>} />
        <Route path="/admin/users" element={<RoleGuard roles={['ADMIN']}><AdminUsers /></RoleGuard>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}
