import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export const RoleGuard = ({ roles, children }: { roles: string[]; children: JSX.Element }) => {
  const { auth } = useAuth()
  if (!auth.token) return <Navigate to="/login" replace />
  if (roles.length && (!auth.role || !roles.includes(auth.role))) return <Navigate to="/dashboard" replace />
  return children
}
