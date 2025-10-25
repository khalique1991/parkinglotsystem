import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">Parking Admin</div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.name} ({user.role})</span>
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </>
        ) : null}
      </div>
    </header>
  )
}
