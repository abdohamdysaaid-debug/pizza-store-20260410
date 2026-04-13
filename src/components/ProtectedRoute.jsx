import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ component: Component }) {
  const { isAdmin } = useAuth()

  if (!isAdmin()) {
    return <Navigate to="/admin-login" replace />
  }

  return <Component />
}
